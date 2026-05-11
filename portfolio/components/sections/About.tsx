'use client';

import Section from '@/components/ui/Section';
import { Brain, Cloud, Code2, Database, GitBranch, LineChart } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const interestIcons = [Code2, Database, Brain, Cloud];
const focusIcons = [LineChart, GitBranch, Brain];

export default function About() {
  const { messages } = useI18n();

  return (
    <Section id="sobre-mi">
      <span className="heading-section">{messages.about.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-6">{messages.about.title}</h2>

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="space-y-4 text-surface-600 dark:text-surface-400 lg:col-span-3">
          {messages.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            {messages.about.focusAreas.map((label, index) => {
              const Icon = focusIcons[index] ?? LineChart;
              return (
              <div
                key={label}
                className="flex items-start gap-2 rounded-lg border border-surface-200/70 bg-white/60 p-3 text-sm text-surface-600 dark:border-surface-800/70 dark:bg-surface-900/50 dark:text-surface-400"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{label}</span>
              </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          {messages.about.cards.map((item, index) => {
            const Icon = interestIcons[index] ?? Code2;
            return (
            <div
              key={item.title}
              className="card card-hover flex flex-col items-start gap-3 p-4"
            >
              <div className="rounded-lg bg-accent/10 p-2 text-accent">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-surface-500 dark:text-surface-400">
                  {item.desc}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
