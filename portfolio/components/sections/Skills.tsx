'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import { useI18n } from '@/lib/i18n';
import { BarChart3, BrainCircuit, Code2, Database, Server, Wrench } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  database: Database,
  brain: BrainCircuit,
  'bar-chart': BarChart3,
  server: Server,
  wrench: Wrench,
};

export default function Skills() {
  const { messages } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <Section id="skills" className="bg-[linear-gradient(180deg,rgb(var(--color-page-soft)/0.82),rgb(var(--color-page)))] dark:bg-[linear-gradient(180deg,rgb(var(--color-page-soft)/0.72),rgb(var(--color-page)))]">
      <span className="heading-section">{messages.skills.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">
        {messages.skills.title}{' '}
        <span className="text-accent">{messages.skills.titleAccent}</span>
      </h2>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {messages.skills.intro}
      </p>

      <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {messages.skills.categories.map((cat, catIdx) => {
          const Icon = iconMap[cat.icon] ?? Code2;
          const isFeatured = Boolean('featured' in cat && cat.featured);
          return (
            <motion.div
              key={`${cat.icon}-${catIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: catIdx * 0.1 }}
              className={`card card-hover group relative overflow-hidden ${
                isFeatured ? 'border-accent/35 bg-[rgb(var(--color-card)/0.94)] shadow-accent/10' : ''
              }`}
            >
              {isFeatured && (
                <div className="pointer-events-none absolute right-4 top-4 flex h-12 w-16 items-end gap-1 opacity-20">
                  {[44, 28, 36, 52, 22].map((height, index) => (
                    <span
                      key={`${cat.name}-bar-${index}`}
                      className="w-2 rounded-t-sm bg-accent"
                      style={{ height }}
                    />
                  ))}
                </div>
              )}
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-accent/10 p-2.5 text-accent transition-all group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-white dark:group-hover:text-surface-950">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">
                  {cat.name}
                </h3>
              </div>
              {'desc' in cat && cat.desc && (
                <p className="mb-4 text-sm leading-relaxed text-surface-500 dark:text-slate-300">
                  {cat.desc}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <span key={`${cat.icon}-${skill}-${skillIdx}`} className="tech-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
