'use client';

import Section from '@/components/ui/Section';
import { Clapperboard, Dumbbell, Sparkles, TentTree } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const interestIcons = [Sparkles, Dumbbell, Clapperboard, TentTree];

export default function About() {
  const { messages } = useI18n();

  return (
    <Section id="sobre-mi">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <span className="heading-section">{messages.about.eyebrow}</span>
          <h2 className="heading-lg mt-3 mb-6">
            {messages.about.title}{' '}
            <span className="text-accent">{messages.about.titleAccent}</span>
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-surface-600 dark:text-slate-200">
            {messages.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {messages.about.interests.map((item, index) => {
            const Icon = interestIcons[index] ?? Sparkles;
            return (
              <article key={item.title} className="card card-hover group p-5">
                <div className="mb-4 inline-flex rounded-2xl bg-accent/10 p-3 text-accent transition-all group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-white dark:group-hover:text-surface-950">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-surface-800 transition-colors group-hover:text-accent dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-surface-500 dark:text-slate-300">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
