'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import { timelineItems } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import type { TimelineType } from '@/types';

const typeIcon: Record<TimelineType, React.ElementType> = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

function formatDate(date: string): string {
  const [year, month] = date.split('-');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Timeline() {
  const { messages } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <Section id="experiencia" className="bg-surface-100/50 dark:bg-surface-900/30">
      <span className="heading-section">{messages.timeline.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">{messages.timeline.title}</h2>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {messages.timeline.intro}
      </p>

      <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-[19px] top-0 w-px bg-surface-200 dark:bg-surface-700 sm:left-1/2 sm:-translate-x-px" />

        <div className="space-y-10">
          {timelineItems.map((item, index) => {
            const Icon = typeIcon[item.type] ?? Briefcase;
            const isLeft = index % 2 === 0;
            const translatedItem = messages.timeline.items.find((entry) => entry.id === item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className={`relative flex flex-col sm:flex-row ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div className="absolute left-[11px] top-1 z-10 sm:left-1/2 sm:-translate-x-1/2">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-accent bg-white dark:bg-surface-950">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                </div>

                <div className={`ml-10 w-full sm:ml-0 sm:w-[calc(50%-32px)] ${isLeft ? 'sm:pr-0' : 'sm:pl-0'}`}>
                  <div className="card card-hover">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <div className="rounded-md bg-accent/10 p-1.5 text-accent">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium text-surface-400">
                        {formatDate(item.start_date)}
                        {' - '}
                        {item.current ? messages.timeline.present : item.end_date ? formatDate(item.end_date) : ''}
                      </span>
                    </div>

                    <h3 className="mb-1 text-sm font-bold text-surface-800 dark:text-surface-100">
                      {translatedItem?.title ?? item.title}
                    </h3>
                    <p className="mb-2 text-xs font-semibold text-accent">
                      {translatedItem?.organization ?? item.organization}
                    </p>
                    <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">
                      {translatedItem?.description ?? item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.highlights.map((highlight) => (
                          <span key={highlight} className="tech-badge text-[11px]">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
