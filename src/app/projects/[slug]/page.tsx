import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { TechList } from "@/components/tech-list";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold tracking-tight">
        <span className="bg-gradient-brand h-6 w-1.5 rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 leading-relaxed text-zinc-700 marker:text-accent/60 dark:text-zinc-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[26rem] rounded-full bg-brand-violet/20 blur-3xl" />
        <div className="absolute -top-32 right-0 size-[22rem] rounded-full bg-brand-teal/20 blur-3xl dark:bg-brand-teal/10" />
      </div>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-12">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-accent dark:hover:text-accent-soft"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent dark:text-accent-soft">
          {project.context} · {project.year}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">{project.summary}</p>
        {project.metric && (
          <p className="mt-6 inline-flex items-baseline gap-2 rounded-2xl border border-accent/15 bg-white/70 px-5 py-3 backdrop-blur dark:border-accent-soft/20 dark:bg-zinc-900/50">
            <span className="text-gradient text-3xl font-bold">{project.metric.value}</span>{" "}
            <span className="text-sm text-zinc-500">{project.metric.label}</span>
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          {project.repo ? (
            <a href={project.repo} className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent dark:hover:text-accent-soft">
              <GithubIcon className="size-4" /> Code
            </a>
          ) : (
            <span className="text-sm text-zinc-500">Code not public yet</span>
          )}
          {project.demo && (
            <a href={project.demo} className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent dark:hover:text-accent-soft">
              <ExternalLink className="size-4" /> Live demo
            </a>
          )}
        </div>
        <div className="mt-5">
          <TechList items={project.tech} />
        </div>
      </header>

      <Block title="Problem">
        <div className="space-y-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
          {project.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Block>

      <Block title="Approach">
        <Bullets items={project.approach} />
      </Block>

      {project.architecture && (
        <Block title="Architecture">
          <pre className="overflow-x-auto rounded-xl border border-accent/15 bg-accent/[0.03] p-5 font-mono text-xs leading-relaxed text-zinc-700 dark:border-accent-soft/15 dark:bg-zinc-900/70 dark:text-zinc-300">
            {project.architecture}
          </pre>
        </Block>
      )}

      {project.image && (
        <figure className="mt-14">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="mx-auto max-h-[36rem] w-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800"
          />
          {project.image.caption && (
            <figcaption className="mt-2 text-center text-sm text-zinc-500">{project.image.caption}</figcaption>
          )}
        </figure>
      )}

      {project.results && (
        <Block title="Results">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-300 dark:border-zinc-700">
                  {project.results.columns.map((column) => (
                    <th key={column} className="py-2 pr-4 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {project.results.rows.map((row) => (
                  <tr key={row.join("|")} className="border-b border-zinc-200 dark:border-zinc-800">
                    {row.map((cell, i) => (
                      <td key={i} className="py-2 pr-4 text-zinc-700 tabular-nums dark:text-zinc-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {project.results.note && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">{project.results.note}</p>
          )}
        </Block>
      )}

      {project.next.length > 0 && (
        <Block title="What I'd do next">
          <Bullets items={project.next} />
        </Block>
      )}
      </div>
    </main>
  );
}
