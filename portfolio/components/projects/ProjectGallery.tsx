'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import type { ProjectGalleryImage } from '@/types';

interface ProjectGalleryProps {
  images: ProjectGalleryImage[];
}

function GalleryItem({ image }: { image: ProjectGalleryImage }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm dark:border-surface-800 dark:bg-surface-900">
      <div className="relative aspect-video bg-surface-100 dark:bg-surface-950">
        {!failed ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-surface-400">
            <ImageIcon className="h-6 w-6 text-[var(--project-primary)]" />
            <span className="px-4 text-center font-mono text-xs">{image.src}</span>
          </div>
        )}
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
  if (images.length === 0) return null;

  return (
    <section>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
        Evidencias
      </span>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
        Capturas y pruebas
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {images.map((image) => (
          <GalleryItem key={image.src} image={image} />
        ))}
      </div>
    </section>
  );
}
