import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  try {
    console.log("=== API /api/cv/update appelée ===");
    const authHeader = req.headers.get("authorization");
    const body = await req.json();
    console.log("CV ID à mettre à jour:", body.cvId);
    
    let userId: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
      } catch (error) {
        console.error("Token invalide:", error);
      }
    }

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
      cvId,
      title,
      personalDetails,
      experiences,
      educations,
      languages,
      skills,
      hobbies,
      theme,
      template,
    } = body;

    if (!cvId) {
      return NextResponse.json(
        { error: "ID du CV manquant" },
        { status: 400 }
      );
    }

    // Vérifier que le CV existe et appartient à l'utilisateur
    const existingCV = await prisma.cV.findUnique({
      where: { id: cvId },
      select: { userId: true },
    });

    if (!existingCV) {
      return NextResponse.json(
        { error: "CV non trouvé" },
        { status: 404 }
      );
    }

    if (existingCV.userId !== userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Mettre à jour le CV
    const updatedCV = await prisma.cV.update({
      where: { id: cvId },
      data: {
        title: title || "Mon CV",
        personalDetails: personalDetails || {},
        experiences: experiences || [],
        educations: educations || [],
        languages: languages || [],
        skills: skills || [],
        hobbies: hobbies || [],
        theme: theme || "light",
        template: template || "classic",
        updatedAt: new Date(), // Forcer la mise à jour de la date
      },
    });

    console.log("✅ CV mis à jour:", updatedCV.id, updatedCV.title);

    return NextResponse.json(
      {
        message: "CV mis à jour avec succès",
        cv: {
          id: updatedCV.id,
          title: updatedCV.title,
          updatedAt: updatedCV.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du CV:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
