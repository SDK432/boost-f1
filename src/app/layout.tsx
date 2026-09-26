import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Boost F1 — Noticias y análisis de Fórmula 1",
    template: "%s | Boost F1",
  },
  description:
    "Medio editorial independiente sobre Fórmula 1. Noticias, análisis, resultados y opinión. Contenido de demostración en español.",
  keywords: [
    "Fórmula 1",
    "F1",
    "noticias F1",
    "análisis F1",
    "Boost F1",
    "motorsport",
  ],
  authors: [{ name: "Boost F1" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Boost F1",
    title: "Boost F1 — Noticias y análisis de Fórmula 1",
    description:
      "Medio editorial independiente sobre Fórmula 1. Contenido demo en español.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boost F1",
    description: "Noticias y análisis de Fórmula 1 en español.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="mx-auto w-full max-w-7xl px-4 pt-3 md:px-6">
          <AdSlot size="leaderboard" label="Espacio publicitario — cabecera" />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
