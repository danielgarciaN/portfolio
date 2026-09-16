'use client';

import Section from '@/components/ui/Section';
import TimelineDates from '@/components/ui/TimelineDates';
import { timelineItems } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import { Award, GraduationCap } from 'lucide-react';

export default function Timeline() {
  const { messages } = useI18n();
  const items = timelineItems.filter((item) => item.type !== 'work').sort((a, b) => b.start_date.localeCompare(a.start_date));
  return (
    <Section id="formacion" className="section-warm">
      <span className="heading-section">{messages.timeline.educationEyebrow}</span>
      <h2 className="heading-lg mb-4 mt-4">{messages.timeline.educationTitle} <span className="text-accent-ink">{messages.timeline.educationTitleAccent}</span></h2>
      <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted">{messages.timeline.educationIntro}</p>
      <ol className="relative mx-auto max-w-[860px] space-y-8 before:absolute before:bottom-8 before:left-3 before:top-6 before:w-px before:bg-accent/25 sm:before:left-5">
        {items.map((item) => {
          const content = messages.timeline.items.find((entry) => entry.id === item.id) ?? item;
          const Icon = item.type === 'certification' ? Award : GraduationCap;
          return (
            <li key={item.id} className="relative pl-10 sm:pl-16">
              <span className="absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-[rgb(var(--color-page))] text-accent-ink sm:left-2"><Icon aria-hidden="true" className="h-3.5 w-3.5" /></span>
              <article className="rounded-r-xl border-y border-r border-line/20 border-l-2 border-l-accent bg-white p-5 shadow-[0_4px_18px_rgba(23,23,23,0.05)] sm:p-7">
                <TimelineDates item={item} />
                <h3 className="mt-3 text-base font-semibold sm:text-lg">{content.title}</h3>
                {content.organization && <p className="mt-1 text-sm text-accent-ink">{content.organization}</p>}
                {content.description && <p className="mt-3 text-sm leading-relaxed text-muted">{content.description}</p>}
                {item.id === 't5' && <div className="mt-4 flex flex-wrap gap-2">{content.highlights?.map((subject) => <span key={subject} className="tech-badge">{subject}</span>)}</div>}
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
