'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SkillIcon from '@/components/ui/SkillIcon';
import TechnologyIcon from '@/components/skills/TechnologyIcon';
import { useI18n } from '@/lib/i18n';
import { projectsForSkill, type SkillProject } from '@/lib/skill-projects';
import { profileForSkill } from '@/lib/skill-profiles';

export default function SkillsDetail({ categoryId, projects }: { categoryId: string; projects: SkillProject[] }) {
  const { messages } = useI18n();
  const category = messages.skills.categories.find((item) => item.id === categoryId);
  if (!category) return null;
  const categoryProjects = projects.filter((project) => category.skills.some((skill) => projectsForSkill(skill, [project]).length));
  const withExperience = category.skills.filter((skill) => {
    const profile = profileForSkill(skill);
    return profile.experience || profile.work.length || profile.education.length;
  });
  const labelFor = (skill: string) => messages.skills.labels[skill as keyof typeof messages.skills.labels] ?? skill;
  const titleFor = (project: SkillProject) => messages.projects.items[project.slug as keyof typeof messages.projects.items]?.title ?? project.title;
  return (
    <div>
      <header className="hero-cover section-dark pb-16 pt-32">
        <div className="section-container">
          <Link href="/skills" className="editorial-link"><ArrowLeft className="h-4 w-4" />{messages.skills.backToIndex}</Link>
          <div className="mt-12 flex items-start gap-5">
            <SkillIcon name={category.icon} className="mt-2 hidden h-12 w-12 shrink-0 text-accent-ink sm:block" />
            <div><p className="heading-section">{messages.skills.eyebrow}</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{category.name}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted">{category.desc}</p></div>
          </div>
        </div>
      </header>
      <div className="section-light">
        <div className="section-container space-y-16 py-16">
          <section id="tools">
            <h2 className="mb-8 text-2xl font-semibold">{messages.skills.tools}</h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {category.skills.map((skill) => {
                const related = projectsForSkill(skill, projects);
                return (
                  <article key={skill} data-skill={skill} className="card card-hover flex flex-col">
                    <div className="skill-icon mx-auto mb-5"><TechnologyIcon name={skill} /></div>
                    <h3 className="text-center text-lg font-semibold">{labelFor(skill)}</h3>
                    <p className="mb-5 mt-3 text-center text-sm leading-7 text-muted">{messages.skills.descriptions[skill as keyof typeof messages.skills.descriptions]}</p>
                    {related.length > 0 && <div className="mt-auto border-t border-line/10 pt-4"><p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-subtle">{messages.skills.usedIn}</p><ul className="space-y-2">{related.map((project) => <li key={project.slug}><Link href={`/projects/${project.slug}`} className="inline-flex items-start gap-2 text-xs leading-5 text-accent-ink hover:underline"><ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" />{titleFor(project)}</Link></li>)}</ul></div>}
                  </article>
                );
              })}
            </div>
          </section>
          <section id="experience">
            <h2 className="mb-4 text-2xl font-semibold">{messages.skills.experienceHeading}</h2>
            <p className="mb-8 max-w-3xl text-sm leading-7 text-muted">{messages.skills.experienceIntro}</p>
            <div className="grid gap-5 md:grid-cols-2">
              {withExperience.map((skill) => {
                const profile = profileForSkill(skill);
                return <article key={skill} className="border-l-2 border-accent/50 bg-[rgb(var(--color-card))] p-6">
                  <h3 className="font-semibold">{labelFor(skill)}</h3>
                  {profile.experience && <p className="mt-3 text-sm leading-7 text-muted">{messages.skills.experienceTexts[profile.experience]}</p>}
                  {profile.work.length > 0 && <div className="mt-4"><p className="mb-2 text-xs font-semibold text-muted">{messages.skills.professional}</p><div className="flex flex-wrap gap-3">{profile.work.map((id) => <Link key={id} href="/#experiencia" className="editorial-link !text-xs">{id === 't0' ? 'SDG Group' : 'Occident'}<ArrowUpRight className="h-3 w-3" /></Link>)}</div></div>}
                  {profile.education.length > 0 && <div className="mt-4"><p className="mb-2 text-xs font-semibold text-muted">{messages.skills.education}</p><div className="flex flex-wrap gap-3">{profile.education.map((id) => <Link key={id} href="/#formacion" className="editorial-link !text-xs">{messages.timeline.items.find((item) => item.id === id)?.title}<ArrowUpRight className="h-3 w-3 shrink-0" /></Link>)}</div></div>}
                </article>;
              })}
            </div>
          </section>
          {categoryProjects.length > 0 && <section id="related-projects"><h2 className="mb-8 text-2xl font-semibold">{messages.skills.relatedHeading}</h2><div className="grid gap-4 md:grid-cols-2">{categoryProjects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`} className="card card-hover group"><div className="flex items-start justify-between gap-4"><h3 className="font-semibold">{titleFor(project)}</h3><ArrowUpRight className="h-4 w-4 shrink-0 text-accent-ink" /></div><div className="mt-4 flex flex-wrap gap-2">{category.skills.filter((skill) => projectsForSkill(skill, [project]).length).map((skill) => <span key={skill} className="tech-badge">{labelFor(skill)}</span>)}</div></Link>)}</div></section>}
          <div className="border-t border-line/10 pt-8"><Link href="/skills" className="editorial-link"><ArrowLeft className="h-4 w-4" />{messages.skills.backToIndex}</Link></div>
        </div>
      </div>
    </div>
  );
}

