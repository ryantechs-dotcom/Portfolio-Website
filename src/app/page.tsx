import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects, otherProjects } from "@/data/projects";
import { about, education, experience, site, skills } from "@/data/site";
import portrait from "@/assets/ryan.jpg";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-10 sm:py-12">
      <p className="text-sm font-semibold tracking-widest text-accent uppercase dark:text-accent-soft">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <span className="bg-gradient-brand mt-4 mb-8 block h-1 w-16 rounded-full" />
      {children}
    </section>
  );
}

const outlineButton =
  "inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-accent-soft dark:hover:text-accent-soft";

const card =
  "rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Soft brand glow behind the hero. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-brand-violet/25 blur-3xl dark:bg-brand-violet/20" />
          <div className="absolute top-10 right-[-6rem] size-[26rem] rounded-full bg-brand-teal/25 blur-3xl dark:bg-brand-teal/15" />
        </div>
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-10 sm:pt-28 sm:pb-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-3.5 py-1.5 text-sm text-zinc-600 backdrop-blur dark:border-accent-soft/20 dark:bg-zinc-900/50 dark:text-zinc-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-teal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
            </span>
            Open to DS & ML engineering roles
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <MapPin className="size-3.5" /> {site.location}
          </p>
          <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl">
            Hi, I&apos;m <span className="text-gradient">{site.name}</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-700 sm:text-2xl dark:text-zinc-300">
            {site.pitch}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{site.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.resume}
              className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
            >
              <FileText className="size-4" /> Résumé
            </a>
            <a href={site.github} className={outlineButton}>
              <GithubIcon className="size-4" /> GitHub
            </a>
            <a href={site.linkedin} className={outlineButton}>
              <LinkedinIcon className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Section id="projects" eyebrow="Selected work" title="Featured projects">
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <div className="mt-12">
              <h3 className="mb-5 text-xl font-semibold">More projects</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group flex flex-col rounded-xl border border-zinc-200 bg-white/70 p-5 transition-colors hover:border-accent/40 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-accent-soft/40"
                  >
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{project.context}</span>
                      <span className="tabular-nums">{project.year}</span>
                    </div>
                    <h4 className="mt-2 flex items-center gap-1 font-semibold group-hover:text-accent dark:group-hover:text-accent-soft">
                      {project.title}
                      <ArrowRight className="size-3.5 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </h4>
                    <p className="mt-1.5 mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.summary}
                    </p>
                    <p className="font-mono text-xs text-accent/80 dark:text-accent-soft/80">
                      {project.tech.slice(0, 3).join(" · ")}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Section>

        <Section id="about" eyebrow="About" title="A bit about me">
          <div className="grid items-center gap-10 sm:grid-cols-[1fr_240px]">
            <div className="space-y-5 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Image
              src={portrait}
              alt={`Portrait of ${site.name}`}
              className="mx-auto aspect-[4/5] w-56 rounded-2xl object-cover object-[88%_center] sm:w-full"
              placeholder="blur"
            />
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Where I've worked">
          <ol className="relative space-y-12 border-l-2 border-accent/20 pl-8 dark:border-accent-soft/20">
            {experience.map((role) => (
              <li key={`${role.company}-${role.title}`} className="relative">
                <span className="bg-gradient-brand absolute top-1.5 -left-[41px] size-4 rounded-full ring-4 ring-[#fcfbff] dark:ring-[#0b0a12]" />
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="text-xl font-semibold">
                    {role.title} <span className="font-normal text-accent dark:text-accent-soft">@ {role.company}</span>
                  </h3>
                  <span className="text-sm text-zinc-500 tabular-nums">
                    {role.period} · {role.location}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-zinc-700 dark:text-zinc-300">{role.summary}</p>
                <div className="mt-5 space-y-5">
                  {role.engagements.map((engagement, i) => (
                    <div
                      key={engagement.name ?? i}
                      className={
                        engagement.name
                          ? "rounded-xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
                          : undefined
                      }
                    >
                      {engagement.name && (
                        <h4 className="mb-2 flex flex-wrap items-baseline gap-x-2 font-semibold">
                          {engagement.name}
                          {engagement.context && (
                            <span className="text-xs font-medium tracking-wide text-accent uppercase dark:text-accent-soft">
                              {engagement.context}
                            </span>
                          )}
                        </h4>
                      )}
                      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600 marker:text-accent/60 dark:text-zinc-400">
                        {engagement.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-mono text-xs text-zinc-500">{role.tech.join(" · ")}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" eyebrow="Education" title="Where I've studied">
          <div className="grid gap-6 sm:grid-cols-2">
            {education.map((entry) => (
              <div key={entry.school} className={card}>
                <p className="text-sm text-zinc-500">{entry.period}</p>
                <h3 className="mt-2 text-lg font-semibold">{entry.degree}</h3>
                <p className="font-medium text-accent dark:text-accent-soft">{entry.school}</p>
                <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{entry.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Toolbox" title="Skills">
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map(({ group, items }) => (
              <div key={group} className={card}>
                <h3 className="font-semibold">{group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's talk">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand-violet/15 blur-3xl" />
            <div className="relative grid gap-10 sm:grid-cols-[1fr_1.4fr]">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Open to data science and ML engineering roles. The fastest way to reach me is email.
                </p>
                <ul className="space-y-3">
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-accent dark:hover:text-accent-soft">
                      <Mail className="size-5 text-accent dark:text-accent-soft" /> {site.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.linkedin} className="inline-flex items-center gap-3 hover:text-accent dark:hover:text-accent-soft">
                      <LinkedinIcon className="size-5 text-accent dark:text-accent-soft" /> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={site.github} className="inline-flex items-center gap-3 hover:text-accent dark:hover:text-accent-soft">
                      <GithubIcon className="size-5 text-accent dark:text-accent-soft" /> GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <ContactForm />
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
