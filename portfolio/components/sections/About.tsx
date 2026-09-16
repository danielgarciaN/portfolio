'use client';

import Section from '@/components/ui/Section';
import { BarChart3, BrainCircuit, Code2, Database } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const focusIcons = [BarChart3, Database, BrainCircuit, Code2];

export default function About() {
  const { messages } = useI18n();

  return (
    <Section id="sobre-mi" className="section-soft">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <span className="heading-section">{messages.about.eyebrow}</span>
          <h2 className="heading-lg mt-3 mb-6">
            {messages.about.title}{' '}
            <span className="text-accent-ink">{messages.about.titleAccent}</span>
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {messages.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {messages.about.cards.map((item, index) => {
            const Icon = focusIcons[index] ?? Code2;
            return (
              <article key={item.title} className="card card-hover group p-5">
                <div className="mb-4 inline-flex rounded-2xl bg-accent/10 p-3 text-accent-ink transition-all group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-surface-950">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-ink transition-colors group-hover:text-accent-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
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
