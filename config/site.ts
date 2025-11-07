export const siteConfig = {
  name: "NICE-CV",
  description: "Créateur de CV Professionnel Premium",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/nicecv",
    github: "https://github.com/nicecv",
  },
  creator: "NICE-CV Team",
  keywords: [
    "CV",
    "Resume",
    "CV Builder",
    "Professional CV",
    "CV Template",
    "Career",
  ],
};

export const features = {
  freeCV: 3,
  premiumCV: 10,
  premiumPrice: 5, // en euros
  currency: "EUR",
};

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  create: "/dashboard/create",
  signin: "/auth/signin",
  signup: "/auth/signup",
  api: {
    auth: "/api/auth",
    cv: "/api/cv",
    payment: "/api/payment",
  },
};
