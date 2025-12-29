import crypto from "crypto";

const API_URL = "https://pay.genius.ci/api/v1/merchant/payments";
const API_KEY = process.env.GENIUS_API_KEY!;
const API_SECRET = process.env.GENIUS_API_SECRET!;
const WEBHOOK_SECRET = process.env.GENIUS_WEBHOOK_SECRET!;

interface CreatePaymentParams {
    amount: number;
    userId: string;
    userEmail: string;
    userName?: string;
}

interface GeniusPaymentResponse {
    success: boolean;
    data: {
        checkout_url: string;
        reference: string;
    };
}

export const geniusPayService = {
    /**
     * Créer une session de paiement Genius Pay (Mode Checkout)
     */
    async createCheckoutSession({ amount, userId, userEmail, userName }: CreatePaymentParams) {
        try {
            const payload = {
                amount,
                currency: "XOF",
                description: "Abonnement Premium NICE-CV",
                customer: {
                    name: userName || "Utilisateur NICE-CV",
                    email: userEmail,
                },
                metadata: {
                    userId, // Important : pour retrouver l'utilisateur au retour du webhook
                    plan: "PREMIUM",
                },
                // Pas de payment_method spécifié = Page de checkout Genius Pay
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY,
                    "X-API-Secret": API_SECRET,
                },
                body: JSON.stringify(payload),
            });

            const data = (await response.json()) as GeniusPaymentResponse;

            if (!response.ok || !data.success) {
                throw new Error("Erreur lors de la création du paiement Genius Pay");
            }

            return data.data.checkout_url;
        } catch (error) {
            console.error("Genius Pay Checkout Error:", error);
            throw error;
        }
    },

    /**
     * Vérifier la signature du Webhook
     */
    verifyWebhookSignature(payload: string, signature: string): boolean {
        if (!WEBHOOK_SECRET) return true; // En dev si pas de secret

        const expected = crypto
            .createHmac("sha256", WEBHOOK_SECRET)
            .update(payload)
            .digest("hex");

        // Comparaison temporelle constante pour éviter les attaques temporelles
        const expectedBuffer = Buffer.from(expected);
        const signatureBuffer = Buffer.from(signature);

        if (expectedBuffer.length !== signatureBuffer.length) {
            return false;
        }

        return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
    }
};
