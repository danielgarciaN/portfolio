'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SkillIcon from '@/components/ui/SkillIcon';
import { useI18n } from '@/lib/i18n';

export default function SkillCategoryGrid({ additional = false }: { additional?: boolean }) {
  const { messages } = useI18n();
  const categories = messages.skills.categories.filter((category) => additional ? category.featuredSkills.length === 0 : category.featuredSkills.length > 0);
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <article key={category.id} className="card card-hover skill-card group flex flex-col text-center !p-7 sm:!p-8">
          <div className="skill-icon mx-auto mb-5"><SkillIcon name={category.icon} className="h-8 w-8" /></div>
          <h3 className="text-xl font-semibold">{category.name}</h3>
          <p className="mb-6 mt-3 text-sm leading-6 text-muted">{category.desc}</p>
          <ul className="mb-7 mt-auto flex flex-wrap justify-center gap-2">{(additional ? category.skills.slice(0, 3) : category.featuredSkills).map((skill) => <li key={skill} className="tech-badge">{messages.skills.labels[skill as keyof typeof messages.skills.labels] ?? skill}</li>)}</ul>
          <Link href={`/skills/${category.id}`} className="editorial-link justify-center border-t border-line/10 pt-5">{messages.skills.categoryCta} {category.name}<ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" /></Link>
        </article>
      ))}
    </div>
  );
}
