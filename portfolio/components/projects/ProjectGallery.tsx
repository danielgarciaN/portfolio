'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProjectGalleryImage } from '@/types';

interface ProjectGalleryProps {
  images: ProjectGalleryImage[];
}

function GalleryItem({
  image,
  onImageError,
}: {
  image: ProjectGalleryImage;
  onImageError: (src: string) => void;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-surface-200 bg-[rgb(var(--color-card)/0.9)] shadow-sm dark:border-surface-800 dark:bg-surface-900">
      <div className="relative aspect-video bg-surface-100 dark:bg-surface-950">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          onError={() => onImageError(image.src)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">{image.title}</h3>
        {image.description && (
          <p className="mt-1 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
            {image.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const visibleImages = images.filter((image) => !failedImages.includes(image.src));

  if (visibleImages.length === 0) return null;

  const handleImageError = (src: string) => {
    setFailedImages((current) => (current.includes(src) ? current : [...current, src]));
  };

  return (
    <section>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
        Evidencias
      </span>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
        Capturas y pruebas
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {visibleImages.map((image) => (
          <GalleryItem key={image.src} image={image} onImageError={handleImageError} />
        ))}
      </div>
    </section>
  );
}
