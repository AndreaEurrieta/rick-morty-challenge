import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Icon } from "@/components/ui";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  keywords: [
    "Rick and Morty",
    "Characters",
    "Episodes",
    "Next.js",
    "TypeScript",
    "API",
  ],
  authors: [{ name: SITE.author }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language} className="scroll-smooth">
      <body className="antialiased page-bg flex flex-col min-h-screen">
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <header className="pt-6 pb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              <span className="title-gradient">Rick and Morty</span>
            </h1>
            <p className="mt-1 text-gray-400 text-sm sm:text-base">
              Explora el multiverso episodio por episodio
            </p>
          </header>
          {children}
        </main>
        <footer className="w-full border-t border-white/10 pt-8 pb-8 text-gray-400 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-left w-full sm:w-auto">Built with Next.js 15, TypeScript, and Tailwind CSS</p>
            <a
              href={SITE.apiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors w-full sm:w-auto justify-start sm:justify-end"
            >
              <span>Rick and Morty API</span>
              <Icon name="external-link" />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}