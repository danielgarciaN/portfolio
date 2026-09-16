'use client';

import Section from '@/components/ui/Section';
import { Clapperboard, Dumbbell, Sparkles, TentTree } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const icons = [Sparkles, Dumbbell, Clapperboard, TentTree];

export default function PassionateAbout() {
  const { messages } = useI18n();
  return (
    <Section id="pasiones" className="border-t border-accent/10 !bg-[rgb(var(--color-page-soft))]">
      <span className="heading-section">{messages.passions.eyebrow}</span>
      <h2 className="heading-lg mb-10 mt-3">{messages.passions.title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {messages.about.interests.map((item, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <article key={item.title} className="card card-hover group">
              <Icon aria-hidden="true" className="mb-6 h-8 w-8 text-accent" strokeWidth={1.5} />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-surface-600 dark:text-slate-300">{item.desc}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
