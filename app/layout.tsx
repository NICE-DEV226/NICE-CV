import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NICE-CV - Créateur de CV Professionnel Premium",
  description:
    "Créez des CV professionnels exceptionnels avec NICE-CV. 3 CV gratuits, puis accès premium pour des designs exclusifs et personnalisations avancées.",
  keywords:
    "NICE-CV, CV premium, créateur de CV professionnel, CV personnalisé, template CV premium, CV design",
  authors: [{ name: "NICE-CV" }],
  creator: "NICE-CV",
  publisher: "NICE-CV",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png" },
    ],
    shortcut: ["/logo.png"],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nice-cv.vercel.app",
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "NICE-CV - Créateur de CV Professionnel Premium",
    description:
      "Créez des CV exceptionnels avec NICE-CV. Designs premium et personnalisations avancées.",
    siteName: "NICE-CV",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "NICE-CV Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NICE-CV - Créateur de CV Professionnel Premium",
    description: "Créez des CV exceptionnels avec des designs premium",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="nice-theme" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
