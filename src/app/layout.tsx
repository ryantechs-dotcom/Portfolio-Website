import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/data/site";
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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.pitch,
  openGraph: {
    title: `${site.name} · ${site.title}`,
    description: site.pitch,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: themeScript may add the "dark" class before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[#fcfbff] font-sans text-ink dark:bg-[#0b0a12] dark:text-zinc-100">
        <Header />
        {children}
        <footer className="mt-12 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-zinc-500">
            © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind.
          </div>
        </footer>
      </body>
    </html>
  );
}
