import Link from "next/link";
import { site } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-[#fcfbff]/75 backdrop-blur-md dark:border-zinc-800/70 dark:bg-[#0b0a12]/75">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="bg-gradient-brand grid size-8 place-items-center rounded-lg text-sm font-bold text-white shadow-sm">
            RD
          </span>
          {site.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden rounded-md px-3 py-2 text-zinc-600 hover:text-accent sm:block dark:text-zinc-400 dark:hover:text-accent-soft"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume}
            className="rounded-md px-3 py-2 text-zinc-600 hover:text-accent dark:text-zinc-400 dark:hover:text-accent-soft"
          >
            Résumé
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
