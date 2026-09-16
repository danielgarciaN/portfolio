'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import { Briefcase, Check, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import TimelineDates from '@/components/ui/TimelineDates';
import { timelineItems } from '@/lib/data';
import { companyPresentation } from '@/lib/companies';
import { useI18n } from '@/lib/i18n';

function CompanyMark({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative flex h-16 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
      {src && !failed ? <Image src={src} alt={name} fill sizes="240px" className={src.includes('sdg-group') ? 'scale-[1.7] object-cover' : 'object-contain p-2'} onError={() => setFailed(true)} /> : <Briefcase aria-hidden="true" className="h-6 w-6 text-surface-950" strokeWidth={1.5} />}
    </div>
  );
}

export default function ProfessionalExperience() {
  const { messages } = useI18n();
  const items = timelineItems.filter((item) => item.type === 'work').sort((a, b) => b.start_date.localeCompare(a.start_date));
  return (
    <Section id="experiencia" className="section-white">
      <span className="heading-section">{messages.timeline.experienceEyebrow}</span>
      <h2 className="heading-lg mb-4 mt-4">{messages.timeline.experienceTitle} <span className="text-accent-ink">{messages.timeline.experienceTitleAccent}</span></h2>
      <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted">{messages.timeline.experienceIntro}</p>
      <div className="mx-auto max-w-[1080px] space-y-14 lg:w-[80%]">
        {items.map((item) => {
          const content = messages.timeline.items.find((entry) => entry.id === item.id) ?? item;
          const details = messages.timeline.workDetails[item.id as keyof typeof messages.timeline.workDetails];
          const brand = companyPresentation[item.id];
          const style = { '--company-line': brand?.line ?? '#B8966B', '--company-ink': brand?.ink ?? '#705235', '--company-header': brand?.header ?? '#141414' } as CSSProperties;
          return (
            <article key={item.id} style={style} className="experience-card card card-hover overflow-hidden !p-0">
              <header className="experience-header section-dark border-b border-line/10 p-6 sm:p-8">
                <div className="flex flex-col items-start gap-5 sm:flex-row">
                  <CompanyMark src={brand?.logo} name={content.organization} />
                  <div className="min-w-0 w-full flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="company-label text-sm font-semibold">{content.organization}</p>
                      <TimelineDates item={item} />
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{content.title}</h3>
                    {item.current && <p className="mt-3 text-xs text-muted">{messages.timeline.employment}</p>}
                  </div>
                </div>
              </header>
              <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[.85fr_1.15fr]">
                <div>
                  <h4 className="company-label mb-3 text-[11px] font-semibold uppercase tracking-[.16em]">{messages.timeline.context}</h4>
                  <p className="text-sm leading-7 text-muted">{details?.summary ?? content.description}</p>
                  <h4 className="company-label mb-3 mt-7 text-[11px] font-semibold uppercase tracking-[.16em]">{messages.timeline.technologies}</h4>
                  <div className="flex flex-wrap gap-2">{(details?.technologies ?? item.highlights)?.map((tech) => <span key={tech} className="tech-badge">{tech}</span>)}</div>
                </div>
                <div className="lg:border-l lg:border-line/10 lg:pl-8">
                  <h4 className="company-label mb-4 text-[11px] font-semibold uppercase tracking-[.16em]">{messages.timeline.responsibilities}</h4>
                  {details && <ul className="space-y-3">{details.responsibilities.map((task) => <li key={task} className="flex gap-3 text-sm leading-6 text-muted"><Check aria-hidden="true" className="company-label mt-1 h-3.5 w-3.5 shrink-0" /><span>{task}</span></li>)}</ul>}
                </div>
              </div>
              {details && <div className="mx-6 mb-6 flex items-start gap-3 border-t border-line/10 pt-5 sm:mx-8 sm:mb-8"><ArrowUpRight aria-hidden="true" className="company-label mt-1 h-4 w-4 shrink-0" /><p className="text-xs leading-6 text-muted"><span className="font-semibold text-ink">{messages.timeline.focus}. </span>{details.focus}</p></div>}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
