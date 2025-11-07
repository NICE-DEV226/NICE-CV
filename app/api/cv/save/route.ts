import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    // Récupérer le token depuis les headers ou le body
    const authHeader = req.headers.get("authorization");
    const body = await req.json();
    
    let userId: string | null = null;

    // Essayer de récupérer l'userId depuis le token ou le body
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
      } catch (error) {
        console.error("Token invalide:", error);
      }
    }

    // Si pas de token, essayer de récupérer depuis le body
    if (!userId && body.userId) {
      userId = body.userId;
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const {
      title,
      personalDetails,
      experiences,
      educations,
      languages,
      skills,
      hobbies,
      theme,
      template,
      isDraft = false,
    } = body;

    // Validation
    if (!title || !personalDetails) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Check user's CV limit
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { cvCount: true, maxCvs: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    if (user.cvCount >= user.maxCvs && !isDraft) {
      return NextResponse.json(
        { error: "Limite de CV atteinte. Passez à Premium pour créer plus de CV." },
        { status: 403 }
      );
    }

    // Create CV (brouillon ou final)
    const cv = await prisma.cV.create({
      data: {
        title: isDraft ? `${title} (Brouillon)` : title,
        userId: userId,
        personalDetails: personalDetails || {},
        experiences: experiences || [],
        educations: educations || [],
        languages: languages || [],
        skills: skills || [],
        hobbies: hobbies || [],
        theme: theme || "light",
        template: template || "classic",
        isPublic: false,
      },
    });

    // Update user's CV count (toujours, même pour les brouillons)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        cvCount: {
          increment: 1,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        plan: true,
        cvCount: true,
        maxCvs: true,
      },
    });

    return NextResponse.json(
      {
        message: "CV créé avec succès",
        cv: {
          id: cv.id,
          title: cv.title,
          createdAt: cv.createdAt,
        },
        user: updatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du CV:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
