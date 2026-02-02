import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
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
          <header className="pt-6 pb-4 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
              aria-label="Ir al inicio"
            >
              <div className="relative flex -space-x-3">
                <Image
                  src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                  alt="Rick"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-cyan-400 relative z-10 group-hover:scale-110 transition-transform"
                />
                <Image
                  src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
                  alt="Morty"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-green-400 group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white group-hover:opacity-80 transition-opacity">
                  <span className="title-gradient">Rick and Morty</span>
                </h1>
                <p className="text-gray-400 text-sm sm:text-base hidden sm:block">
                  Explora el multiverso episodio por episodio
                </p>
              </div>
            </Link>
            <a
              href="https://github.com/AndreaEurrieta/rick-morty-challenge"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all hover:scale-110"
              aria-label="Ver código en GitHub"
            >
              <Icon name="github" className="w-6 h-6" />
            </a>
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