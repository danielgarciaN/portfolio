'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import { useI18n } from '@/lib/i18n';
import { BarChart3, Cloud, Code2, Globe, Languages, Server, Wrench } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  'bar-chart': BarChart3,
  globe: Globe,
  cloud: Cloud,
  server: Server,
  wrench: Wrench,
  languages: Languages,
};

export default function Skills() {
  const { messages } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <Section id="skills" className="bg-[rgb(var(--color-page-soft)/0.72)] dark:bg-surface-900/30">
      <span className="heading-section">{messages.skills.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">{messages.skills.title}</h2>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {messages.skills.intro}
      </p>

      <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {messages.skills.categories.map((cat, catIdx) => {
          const Icon = iconMap[cat.icon] ?? Code2;
          return (
            <motion.div
              key={`${cat.icon}-${catIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: catIdx * 0.1 }}
              className="card card-hover"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">
                  {cat.name}
                </h3>
              </div>
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
