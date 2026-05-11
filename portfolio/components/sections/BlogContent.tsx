'use client';

import Section from '@/components/ui/Section';
import { FileText } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function BlogContent() {
  const { messages } = useI18n();

  return (
    <Section>
      <span className="heading-section">{messages.blog.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">{messages.blog.title}</h2>
      <p className="mb-10 max-w-xl text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {messages.blog.intro}
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {messages.blog.posts.map((post) => (
          <article key={post.title} className="card card-hover group flex flex-col">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-surface-400">{messages.blog.comingSoon}</span>
            </div>
            <h3 className="mb-2 text-base font-bold text-surface-800 group-hover:text-accent dark:text-surface-100 dark:group-hover:text-accent-light">
              {post.title}
            </h3>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="tech-badge text-[11px]">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
