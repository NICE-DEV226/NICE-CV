import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();

    // Décoder le JWT de Google
    const decoded: any = jwt.decode(credential);

    if (!decoded || !decoded.email) {
      return NextResponse.json(
        { error: "Token Google invalide" },
        { status: 400 }
      );
    }

    const { email, name, picture } = decoded;

    // Chercher ou créer l'utilisateur
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          image: picture,
          plan: "FREE",
          cvCount: 0,
          maxCvs: 3,
        },
      });
    }

    // Créer un token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        plan: user.plan,
        cvCount: user.cvCount,
        maxCvs: user.maxCvs,
      },
      token,
    });
  } catch (error) {
    console.error("Erreur Google Auth:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'authentification" },
      { status: 500 }
    );
  }
}
