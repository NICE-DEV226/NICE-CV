import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Désactiver le cache Next.js pour cette route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    console.log("=== API /api/cv/list appelée ===");
    
    // Récupérer le token depuis les headers
    const authHeader = req.headers.get("authorization");
    console.log("Authorization header:", authHeader ? "Présent" : "Absent");
    
    let userId: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log("Token extrait, longueur:", token.length);
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
        console.log("Token décodé, userId:", userId);
      } catch (error) {
        console.error("❌ Token invalide:", error instanceof Error ? error.message : "Unknown error");
      }
    }

    if (!userId) {
      console.log("❌ Pas d'userId, retour 401");
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    console.log("✅ Recherche CVs pour userId:", userId);

    // VÉRIFICATION: Compter TOUS les CVs dans la base
    const totalCVsInDB = await prisma.cV.count();
    console.log("🔍 TOTAL CVs dans TOUTE la base:", totalCVsInDB);

    // Lister TOUS les CVs avec leur userId pour debug
    const allCVs = await prisma.cV.findMany({
      select: { id: true, title: true, userId: true },
      take: 10,
    });
    console.log("📋 Tous les CVs:", allCVs.map((cv: { title: string; userId: string }) => `${cv.title} (userId: ${cv.userId})`));

    // Récupérer TOUS les CVs de l'utilisateur (brouillons inclus)
    const cvs = await prisma.cV.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        template: true,
        theme: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("✅ CVs trouvés pour userId", userId, ":", cvs.length);
    console.log("🕐 Timestamp requête:", new Date().toISOString());
    
    if (cvs.length > 0) {
      console.log("Titres des CVs:", cvs.map((cv: { title: string }) => cv.title));
    }

    // Si aucun CV, vérifier tous les CVs
    if (cvs.length === 0) {
      console.log("⚠️ Aucun CV trouvé, vérification de tous les CVs...");
      const allCvs = await prisma.cV.findMany({
        select: {
          id: true,
          userId: true,
          title: true,
        },
        take: 10,
      });
      console.log("Tous les CVs dans la base:", allCvs.length);
      allCvs.forEach((cv: { id: string; userId: string; title: string }) => {
        console.log(`  - ${cv.title} (userId: ${cv.userId})`);
      });
    }

    // Récupérer aussi les infos de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        cvCount: true,
        maxCvs: true,
        plan: true,
      },
    });

    console.log("User info:", user);
    console.log("=== Retour:", cvs.length, "CVs ===\n");

    return NextResponse.json(
      {
        cvs,
        user,
        timestamp: new Date().toISOString(), // Pour vérifier que c'est bien une nouvelle requête
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des CVs:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
