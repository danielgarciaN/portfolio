import type { Metadata } from 'next';
import BlogContent from '@/components/sections/BlogContent';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notas técnicas sobre Data Science, inteligencia artificial, desarrollo de software y aprendizaje continuo.',
};

export default function BlogPage() {
  return (
    <div className="pt-16">
      <BlogContent />
    </div>
  );
}
