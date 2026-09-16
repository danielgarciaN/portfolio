'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SkillCategoryGrid from '@/components/skills/SkillCategoryGrid';
import { useI18n } from '@/lib/i18n';

export default function Skills() {
  const { messages } = useI18n();
  return (
    <Section id="skills" className="section-dark">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="heading-section">{messages.skills.eyebrow}</span><h2 className="heading-lg mb-4 mt-4">{messages.skills.title} <span className="text-accent-ink">{messages.skills.titleAccent}</span></h2><p className="max-w-2xl text-sm leading-relaxed text-muted">{messages.skills.intro}</p></div>
        <Link href="/skills" className="editorial-link shrink-0">{messages.skills.viewAll}<ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <SkillCategoryGrid />
    </Section>
  );
}
