import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server"; // SEO FIX
import { notFound } from "next/navigation";
import { PersonSchema, WebSiteSchema } from "@/components/json-ld";
import { TerminalToggleButton } from "@/components/terminal/TerminalToggleButton";
import "../globals.css";

const geistSans = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

const BASE_URL = "https://ztaz9906-github-io.vercel.app"; // SEO FIX

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pageDescription = locale === "es" ? "Software Engineer especializado en arquitecturas DDD, CQRS y Event-Driven con Next.js, TypeScript y Python." : "Software Engineer specialized in DDD, CQRS, and Event-Driven architectures with Next.js, TypeScript, and Python."; // SEO FIX
  const twitterDescription = locale === "es" ? "Software Engineer especializado en arquitecturas DDD, CQRS y Event-Driven." : "Software Engineer specialized in DDD, CQRS, and Event-Driven architectures."; // SEO FIX

  return {
    metadataBase: new URL(BASE_URL), // SEO FIX
    title: {
      default: "Enrique Ferreiro | Software Engineer",
      template: "%s | Enrique Ferreiro",
    },
    description: pageDescription, // SEO FIX
    alternates: {
      canonical: `${BASE_URL}/${locale}`, // SEO FIX
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
    openGraph: {
      title: "Enrique Ferreiro | Software Engineer", // SEO FIX - title separator
      description: pageDescription, // SEO FIX
      url: BASE_URL, // SEO FIX
      siteName: "Enrique Ferreiro", // SEO FIX
      images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Enrique Ferreiro · Software Engineer" }], // SEO FIX
      type: "website",
      locale: locale, // SEO FIX
    },
    twitter: { // SEO FIX
      card: "summary_large_image", // SEO FIX
      title: "Enrique Ferreiro | Software Engineer", // SEO FIX - title separator
      description: twitterDescription, // SEO FIX
      images: ["/og/home.png"], // SEO FIX
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const locales = ["en", "es"];

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <PersonSchema />
        <WebSiteSchema />
        <NextIntlClientProvider messages={messages}>
          {children}
          <TerminalToggleButton />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
