import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { TechList } from "./tech-list";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-accent-soft/40 dark:hover:shadow-accent/20"
    >
      {/* Gradient strip that grows in on hover. */}
      <span className="bg-gradient-brand absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      {project.metric && (
        <p className="mb-5">
          <span className="text-gradient block text-3xl font-bold tracking-tight">{project.metric.value}</span>
          <span className="text-xs text-zinc-500">{project.metric.label}</span>
        </p>
      )}
      <h3 className="flex items-center gap-1 text-lg font-semibold group-hover:text-accent dark:group-hover:text-accent-soft">
        {project.title}
        <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </h3>
      <p className="mt-2 mb-6 flex-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.summary}</p>
      <TechList items={project.tech.slice(0, 4)} />
    </Link>
  );
}
