import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Modal } from '@/components/ui/Modal'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight } from '@/components/ui/Icons'
import { CaseStudy } from './CaseStudy'
import { enquiry, projects, publishedResults, type Project } from '@/config/site'
import { cn } from '@/lib/cn'

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null)
  const isSolo = projects.length === 1

  return (
    <section id="work" className="section-y relative bg-surface/40">
      {/* Soft edges so the band reads as a change in light, not a hard block */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink to-transparent"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Our work"
          title={
            <>
              Real stores, written
              <br className="hidden sm:block" /> up in full.
            </>
          }
          description="We would rather show you a couple of builds properly than pad this page out with thumbnails. Open one to see the brand, the problem, and what we built."
        />

        {/* A single project centred reads as deliberate; the same card in a
            two-column grid reads as a gap where the others should be. */}
        <div
          className={cn(
            'mt-16',
            isSolo
              ? 'mx-auto max-w-3xl'
              : 'grid gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-20',
          )}
        >
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 2) * 110}
              // Offsets the second column so the grid reads as an editorial
              // spread rather than a spreadsheet.
              className={cn(!isSolo && index % 2 === 1 && 'md:mt-24')}
            >
              <ProjectCard project={project} onOpen={() => setSelected(project)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-4" variant="fade">
          <p className="max-w-md text-center text-sm text-muted">
            Want to see how we would approach yours? We will audit your store or
            your Instagram and send back a plan, free.
          </p>
          {/* Opens email with the subject pre-set, rather than scrolling to
              the CTA section — that section offers a call and a quote, so
              sending an audit request there delivered something the button
              did not promise. */}
          <Button
            href={enquiry.audit}
            variant="secondary"
            size="lg"
            magnetic
            icon={<ArrowUpRight className="size-4" />}
          >
            Get a free store audit
          </Button>
        </Reveal>
      </div>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        label={selected ? `${selected.client} case study` : 'Case study'}
      >
        {selected ? <CaseStudy project={selected} /> : null}
      </Modal>
    </section>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const metrics = publishedResults(project).slice(0, 2)

  return (
    // The whole card is clickable via a "stretched link" overlay rather than
    // by wrapping everything in a <button> — a button may only contain
    // phrasing content, and this card has headings, a paragraph and a list.
    <article className="group relative">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${project.client} case study`}
        className="absolute inset-0 z-10 cursor-pointer rounded-[var(--radius-panel)]"
      />

      <div className="text-left">
        <div
          className={cn(
            'relative aspect-4/3 overflow-hidden rounded-[var(--radius-panel)] border border-line',
            'transition-[border-color,box-shadow,transform] duration-700 ease-[var(--ease-out-quint)]',
            'group-hover:-translate-y-1.5 group-hover:border-line-strong',
            'group-hover:shadow-[var(--p-lift-shadow)]',
          )}
        >
          <ProjectVisual project={project} />

          {/* Hover affordance */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0">
              View case study
              <ArrowUpRight className="size-4" />
            </span>
          </div>

          <span className="absolute top-5 left-5 rounded-full bg-black/50 px-3 py-1 font-mono text-[0.625rem] tracking-[0.16em] text-white/80 uppercase backdrop-blur-md">
            {project.year}
          </span>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-h3 font-semibold transition-colors duration-500">
              {project.client}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{project.category}</p>
          </div>

          <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 ease-[var(--ease-out-quint)] group-hover:border-transparent group-hover:bg-brand group-hover:text-on-brand">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <p className="mt-4 max-w-md leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Headline metrics — the reason to click through. Omitted while a
            project's figures are still placeholders. */}
        {metrics.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
            {metrics.map((result) => (
              <li key={result.label} className="flex items-baseline gap-2">
                <span className="text-lg font-semibold tracking-[-0.02em]">
                  {result.value}
                </span>
                <span className="text-[0.8125rem] text-muted">{result.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
