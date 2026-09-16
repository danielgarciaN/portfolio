'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import { timelineItems } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import { Award, Briefcase, CalendarDays, GraduationCap } from 'lucide-react';
import type { TimelineItem, TimelineType } from '@/types';
import type { Locale } from '@/lib/i18n';

const typeIcon: Record<TimelineType, React.ElementType> = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

function formatDate(date: string, locale: Locale): string {
  const [year, month] = date.split('-');
  const months =
    locale === 'en'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function TimelineCard({
  item,
  index,
  inView,
  locale,
  present,
  translatedItem,
}: {
  item: TimelineItem;
  index: number;
  inView: boolean;
  locale: Locale;
  present: string;
  translatedItem?: { id: string; title: string; organization: string; description: string };
}) {
  const Icon = typeIcon[item.type] ?? Briefcase;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay: index * 0.1 }}
      className="card card-hover group relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-accent/75 opacity-70 transition-opacity group-hover:opacity-100" />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="rounded-2xl bg-accent/10 p-3 text-accent transition-all group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-white dark:group-hover:text-surface-950">
          <Icon className="h-5 w-5" />
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-surface-200 bg-[rgb(var(--color-card-muted)/0.72)] px-3 py-1 text-xs font-semibold text-surface-500 dark:border-white/15 dark:bg-white/5 dark:text-slate-300">
          <CalendarDays className="h-3.5 w-3.5 text-accent" />
          {formatDate(item.start_date, locale)}
          {' - '}
          {item.current ? present : item.end_date ? formatDate(item.end_date, locale) : ''}
        </span>
      </div>

      <h3 className="text-base font-bold text-surface-800 transition-colors group-hover:text-accent dark:text-white">
        {translatedItem?.title ?? item.title}
      </h3>
      <p className="mt-1 text-sm font-semibold text-accent">
        {translatedItem?.organization ?? item.organization}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-surface-500 dark:text-slate-300">
        {translatedItem?.description ?? item.description}
      </p>

      {item.highlights && item.highlights.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.highlights.map((highlight) => (
            <span key={highlight} className="tech-badge text-[11px]">
              {highlight}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function Timeline() {
  const { locale, messages } = useI18n();
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationInView = useInView(educationRef, { once: true, margin: '-50px' });
  const experienceInView = useInView(experienceRef, { once: true, margin: '-50px' });
  const educationItems = timelineItems.filter((item) => item.type === 'education' || item.type === 'certification');
  const workItems = timelineItems.filter((item) => item.type === 'work');

  const translatedFor = (item: TimelineItem) => messages.timeline.items.find((entry) => entry.id === item.id);

  return (
    <>
      <Section id="formacion" className="bg-[rgb(var(--color-page))]">
        <span className="heading-section">{messages.timeline.educationEyebrow}</span>
        <h2 className="heading-lg mt-3 mb-4">
          {messages.timeline.educationTitle}{' '}
          <span className="text-accent">{messages.timeline.educationTitleAccent}</span>
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-slate-300">
          {messages.timeline.educationIntro}
        </p>

        <div ref={educationRef} className="grid gap-5 md:grid-cols-2">
          {educationItems.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              inView={educationInView}
              locale={locale}
              present={messages.timeline.present}
              translatedItem={translatedFor(item)}
            />
          ))}
        </div>
      </Section>

      <Section id="experiencia" className="bg-[linear-gradient(180deg,rgb(var(--color-page-soft)/0.82),rgb(var(--color-page)))] dark:bg-[linear-gradient(180deg,rgb(var(--color-page-soft)/0.72),rgb(var(--color-page)))]">
        <span className="heading-section">{messages.timeline.experienceEyebrow}</span>
        <h2 className="heading-lg mt-3 mb-4">
          {messages.timeline.experienceTitle}{' '}
          <span className="text-accent">{messages.timeline.experienceTitleAccent}</span>
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-slate-300">
          {messages.timeline.experienceIntro}
        </p>

        <div ref={experienceRef} className="grid gap-5 lg:grid-cols-2">
          {workItems.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              inView={experienceInView}
              locale={locale}
              present={messages.timeline.present}
              translatedItem={translatedFor(item)}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
