import { NextResponse } from "next/server";
import { geniusPayService } from "@/features/payment/services/geniusPayService";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
    try {
        // Validation Auth via Token (comme api/cv/list)
        const authHeader = req.headers.get("authorization");
        let user = null;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.substring(7);
            try {
                const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
                if (decoded.userId) {
                    user = await prisma.user.findUnique({
                        where: { id: decoded.userId },
                        select: { id: true, email: true, name: true }
                    });
                }
            } catch (err) {
                console.log("Token invalid:", err);
            }
        }

        if (!user) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Prix de l'abonnement Premium (en XOF)
        const PREMIUM_AMOUNT = 5000; // Exemple : 5000 FCFA

        const checkoutUrl = await geniusPayService.createCheckoutSession({
            amount: PREMIUM_AMOUNT,
            userId: user.id,
            userEmail: user.email!,
            userName: user.name || undefined,
        });

        return NextResponse.json({ url: checkoutUrl });
    } catch (error) {
        console.error("Erreur Checkout:", error);
        return NextResponse.json(
            { error: "Impossible d'initier le paiement" },
            { status: 500 }
        );
    }
}
