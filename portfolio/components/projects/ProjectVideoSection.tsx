import { ExternalLink, MonitorPlay } from 'lucide-react';
import type { ProjectVideo } from '@/types';

interface ProjectVideoSectionProps {
  videos: ProjectVideo[];
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function ProjectVideoSection({ videos }: ProjectVideoSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
        Demos
      </span>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
        Videos y demostraciones
      </h2>

      <div className="mt-5 grid gap-5">
        {videos.map((video) => (
          <article
            key={`${video.type}-${video.url}`}
            className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm dark:border-surface-800 dark:bg-surface-900"
          >
            <div className="aspect-video bg-surface-100 dark:bg-surface-950">
              {video.type === 'video' && (
                <video
                  controls
                  preload="metadata"
                  poster={video.poster}
                  className="h-full w-full object-cover"
                >
                  <source src={video.url} />
                </video>
              )}

              {video.type === 'youtube' && (
                <iframe
                  src={getYoutubeEmbedUrl(video.url)}
                  title={video.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}

              {video.type === 'demo' && (
                <iframe
                  src={video.url}
                  title={video.title}
                  className="h-full w-full"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              )}

              {video.type === 'external' && (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <MonitorPlay className="h-8 w-8 text-[var(--project-primary)]" />
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--project-primary)] px-4 py-2 text-sm font-bold text-white"
                  >
                    Abrir recurso
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">{video.title}</h3>
              {video.description && (
                <p className="mt-1 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
                  {video.description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
