// Limites utilisateur
export const MAX_CV_FREE = 3;
export const MAX_CV_PREMIUM = 10;

// Prix
export const PREMIUM_PRICE_EUR = 5;
export const PREMIUM_PRICE_CENTS = 500;

// Validation
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Dates
export const DATE_FORMAT = "dd MMM yyyy";
export const DATE_FORMAT_SHORT = "dd/MM/yyyy";

// Messages
export const MESSAGES = {
  SUCCESS: {
    CV_CREATED: "CV créé avec succès",
    CV_UPDATED: "CV mis à jour avec succès",
    CV_DELETED: "CV supprimé avec succès",
    PAYMENT_SUCCESS: "Paiement effectué avec succès",
  },
  ERROR: {
    CV_LIMIT_REACHED: "Limite de CV atteinte. Passez à Premium pour continuer.",
    INVALID_CREDENTIALS: "Email ou mot de passe incorrect",
    NETWORK_ERROR: "Erreur réseau. Veuillez réessayer.",
    GENERIC: "Une erreur est survenue. Veuillez réessayer.",
  },
};

// API
export const API_TIMEOUT = 30000; // 30 secondes
export const API_RETRY_COUNT = 3;
