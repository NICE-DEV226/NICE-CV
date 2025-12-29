import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { geniusPayService } from "@/features/payment/services/geniusPayService";

export async function POST(req: Request) {
    try {
        const signature = req.headers.get("X-GeniusPay-Signature");
        const bodyText = await req.text(); // Lire le corps brut pour la vérification

        if (!signature) {
            return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
        }

        // 1. Vérifier la signature
        const isValid = geniusPayService.verifyWebhookSignature(bodyText, signature);
        if (!isValid) {
            console.error("❌ Signature Webhook Invalide");
            return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
        }

        const payload = JSON.parse(bodyText);
        const { event, data } = payload;

        console.log(`🔔 Webhook GeniusPay reçu: ${event}`);

        // 2. Traiter uniquement le succès du paiement
        if (event === "payment.success") {
            const userId = data.transaction.metadata?.userId;

            if (userId) {
                console.log(`✅ Paiement validé pour user ${userId}. Passage en PREMIUM.`);

                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        plan: "PREMIUM",
                        // Optionnel : Enregistrer la date ou l'ID de transaction
                    },
                });
            } else {
                console.warn("⚠️ Pas de userId dans les métadonnées de transaction");
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Erreur Webhook:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}
