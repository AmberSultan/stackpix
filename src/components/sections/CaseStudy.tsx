import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight } from '@/components/ui/Icons'
import { HairlineDivider } from '@/components/ui/Backdrop'
import { publishedResults, type Project } from '@/config/site'

/**
 * Full case-study body rendered inside the overlay: overview → stack →
 * problem → solution → results. The order matters — a business owner scanning
 * this wants the problem and the numbers, in that order.
 */
export function CaseStudy({ project }: { project: Project }) {
  const results = publishedResults(project)

  return (
    <article className="pb-24">
      {/* Cover */}
      <div className="relative h-[38svh] min-h-64 overflow-hidden md:h-[46svh]">
        <ProjectVisual project={project} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
      </div>

      <div className="container-page -mt-20 md:-mt-28">
        <header className="relative max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
            <span>{project.category}</span>
            <span aria-hidden className="size-1 rounded-full bg-muted" />
            <span>{project.year}</span>
          </div>

          <h2 className="text-h1 mt-5 font-semibold">{project.client}</h2>

          <p className="text-lead mt-6 max-w-2xl leading-relaxed text-subtle">
            {project.summary}
          </p>

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-fill-1 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-line-strong hover:bg-fill-2"
            >
              Visit the live store
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}
        </header>

        <div className="my-12">
          <HairlineDivider />
        </div>

        {/* Overview + stack */}
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <section>
            <SectionLabel>Overview</SectionLabel>
            <p className="mt-5 text-lg leading-relaxed text-subtle">
              {project.overview}
            </p>
          </section>

          <section>
            <SectionLabel>Tech stack</SectionLabel>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-fill-1 px-3.5 py-1.5 text-sm text-subtle"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Problem / solution */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="card-surface p-7 md:p-9">
            <SectionLabel>The problem</SectionLabel>
            <p className="mt-5 leading-relaxed text-muted">{project.problem}</p>
          </div>

          <div className="card-surface relative overflow-hidden p-7 md:p-9">
            {/* Faint wash marks this as the resolution half of the pair */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklab, var(--p-brand) 20%, transparent), transparent 65%)',
              }}
            />
            <SectionLabel>The solution</SectionLabel>
            <p className="relative mt-5 leading-relaxed text-subtle">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Gallery — only rendered for projects with extra screenshots */}
        {project.gallery?.length ? (
          <section className="mt-16">
            <SectionLabel>Screens</SectionLabel>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src, index) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-card"
                >
                  <img
                    src={src}
                    alt={`${project.client} — screen ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Results — hidden entirely until real figures are filled in */}
        {results.length > 0 ? (
        <section className="mt-16">
          <SectionLabel>Results</SectionLabel>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((result) => (
              <li
                key={result.label}
                className="card-surface flex flex-col gap-2 p-6"
              >
                <p className="text-gradient-brand text-3xl font-semibold tracking-[-0.03em]">
                  {result.value}
                </p>
                <p className="text-sm text-muted">{result.label}</p>
              </li>
            ))}
          </ul>
        </section>
        ) : null}

        {/* Closing CTA */}
        <div className="card-surface mt-16 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h3 className="text-h3 font-semibold">Want results like these?</h3>
            <p className="mt-2 text-muted">
              Tell us where your store is losing people. We will tell you what we
              would do about it.
            </p>
          </div>
          <Button
            href="#contact"
            size="lg"
            icon={<ArrowUpRight className="size-4" />}
            className="shrink-0"
          >
            Book Discovery Call
          </Button>
        </div>
      </div>
    </article>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase">
      {children}
    </h3>
  )
}
