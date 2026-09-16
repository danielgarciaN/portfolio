'use client';

import Section from '@/components/ui/Section';
import { timelineItems } from '@/lib/data';
import { useI18n, type Locale } from '@/lib/i18n';
import { Award, Briefcase, CalendarDays, GraduationCap, Check } from 'lucide-react';
import type { TimelineItem } from '@/types';

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(date + '-01T00:00:00Z'));
}

function Dates({ item }: { item: TimelineItem }) {
  const { locale, messages } = useI18n();
  return (
    <span className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-surface-600 dark:text-slate-300">
      <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
      <time dateTime={item.start_date}>{formatDate(item.start_date, locale)}</time>
      <span>–</span>
      {item.current ? messages.timeline.present : item.end_date && <time dateTime={item.end_date}>{formatDate(item.end_date, locale)}</time>}
    </span>
  );
}

export default function Timeline() {
  const { messages } = useI18n();
  const newestFirst = (a: TimelineItem, b: TimelineItem) => b.start_date.localeCompare(a.start_date);
  const educationItems = timelineItems.filter((item) => item.type !== 'work').sort(newestFirst);
  const workItems = timelineItems.filter((item) => item.type === 'work').sort(newestFirst);
  const translatedFor = (item: TimelineItem) => messages.timeline.items.find((entry) => entry.id === item.id);

  return (
    <>
      <Section id="formacion">
        <span className="heading-section">{messages.timeline.educationEyebrow}</span>
        <h2 className="heading-lg mb-4 mt-3">{messages.timeline.educationTitle} <span className="text-accent">{messages.timeline.educationTitleAccent}</span></h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-slate-300">{messages.timeline.educationIntro}</p>
        <ol className="relative space-y-6 before:absolute before:bottom-10 before:left-4 before:top-8 before:w-px before:bg-accent/30 sm:before:left-6">
          {educationItems.map((item) => {
            const content = translatedFor(item) ?? item;
            const Icon = item.type === 'certification' ? Award : GraduationCap;
            return (
              <li key={item.id} className="relative pl-12 sm:pl-20">
                <span className="absolute left-0 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-[rgb(var(--color-page))] text-accent sm:left-2">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <article className="card card-hover grid gap-4 sm:p-7 lg:grid-cols-[190px_1fr] lg:gap-8">
                  <div><Dates item={item} /></div>
                  <div>
                    <h3 className="text-lg font-bold">{content.title}</h3>
                    {content.organization && <p className="mt-1 text-sm font-semibold text-accent">{content.organization}</p>}
                    {content.description && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-surface-600 dark:text-slate-300">{content.description}</p>}
                    {!!item.highlights?.length && <div className="mt-4 flex flex-wrap gap-2">{(content.highlights ?? item.highlights).map((highlight) => <span key={highlight} className="tech-badge">{highlight}</span>)}</div>}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section id="experiencia" className="!bg-[linear-gradient(140deg,rgb(var(--color-page-soft)),rgb(var(--color-page)))]">
        <span className="heading-section">{messages.timeline.experienceEyebrow}</span>
        <h2 className="heading-lg mb-4 mt-3">{messages.timeline.experienceTitle} <span className="text-accent">{messages.timeline.experienceTitleAccent}</span></h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-slate-300">{messages.timeline.experienceIntro}</p>
        <div className="space-y-8">
          {workItems.map((item) => {
            const content = translatedFor(item) ?? item;
            const details = messages.timeline.workDetails[item.id as keyof typeof messages.timeline.workDetails];
            return (
              <article key={item.id} className="card card-hover overflow-hidden !p-0">
                <header className="flex flex-col gap-6 border-b border-accent/15 bg-accent/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="rounded-2xl bg-accent/10 p-3 text-accent"><Briefcase aria-hidden="true" className="h-6 w-6" /></span>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-accent">{content.organization}</p>
                      <h3 className="max-w-2xl text-xl font-bold sm:text-2xl">{content.title}</h3>
                    </div>
                  </div>
                  <div className="shrink-0"><Dates item={item} /></div>
                </header>
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
                  <div>
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">{messages.timeline.responsibilities}</h4>
                    {details ? <ul className="space-y-4">{details.responsibilities.map((responsibility) => <li key={responsibility} className="flex gap-3 text-sm leading-relaxed text-surface-600 dark:text-slate-300"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" /><span>{responsibility}</span></li>)}</ul> : <p className="text-sm leading-relaxed">{content.description}</p>}
                  </div>
                  <div className="rounded-2xl bg-[rgb(var(--color-page-soft)/0.65)] p-5 sm:p-6">
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">{messages.timeline.areas}</h4>
                    <div className="flex flex-wrap gap-2">{(content.highlights ?? item.highlights)?.map((highlight) => <span key={highlight} className="tech-badge">{highlight}</span>)}</div>
                    {details && <p className="mt-5 border-t border-accent/15 pt-5 text-sm leading-relaxed text-surface-600 dark:text-slate-300">{details.summary}</p>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
