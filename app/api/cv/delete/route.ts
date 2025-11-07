import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const body = await req.json();
    const { cvId } = body;

    if (!cvId) {
      return NextResponse.json(
        { error: "ID du CV manquant" },
        { status: 400 }
      );
    }

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

    if (!userId) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Vérifier que le CV appartient à l'utilisateur
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
      select: { userId: true },
    });

    if (!cv) {
      return NextResponse.json(
        { error: "CV non trouvé" },
        { status: 404 }
      );
    }

    if (cv.userId !== userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Supprimer le CV
    await prisma.cV.delete({
      where: { id: cvId },
    });

    // Décrémenter le compteur de l'utilisateur
    await prisma.user.update({
      where: { id: userId },
      data: {
        cvCount: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "CV supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du CV:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
