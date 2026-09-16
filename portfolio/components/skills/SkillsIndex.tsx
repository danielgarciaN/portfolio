'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SkillCategoryGrid from './SkillCategoryGrid';
import { useI18n } from '@/lib/i18n';

export default function SkillsIndex() {
  const { messages } = useI18n();
  return (
    <div className="section-light">
      <div className="section-container pb-24 pt-32">
        <Link href="/#skills" className="editorial-link"><ArrowLeft className="h-4 w-4" />{messages.skills.back}</Link>
        <header className="mb-12 mt-12 max-w-3xl"><p className="heading-section">{messages.skills.eyebrow}</p><h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{messages.skills.indexTitle}</h1><p className="mt-6 text-base leading-7 text-muted">{messages.skills.indexIntro}</p></header>
        <SkillCategoryGrid />
        <h2 className="mb-8 mt-16 text-2xl font-semibold">{messages.skills.additional}</h2>
        <SkillCategoryGrid additional />
      </div>
    </div>
  );
}
