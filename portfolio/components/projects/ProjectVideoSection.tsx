import { ExternalLink, MonitorPlay } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { ProjectVideo } from '@/types';

interface ProjectVideoSectionProps {
  videos: ProjectVideo[];
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function ProjectVideoSection({ videos }: ProjectVideoSectionProps) {
  const { messages } = useI18n();

  if (videos.length === 0) return null;

  return (
    <section>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
        {messages.projectDossier.videosEyebrow}
      </span>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        {messages.projectDossier.videosTitle}
      </h2>

      <div className="mt-5 grid gap-5">
        {videos.map((video) => (
          <article
            key={`${video.type}-${video.url}`}
            className="overflow-hidden rounded-xl border border-line/10 bg-[rgb(var(--color-card)/0.9)] shadow-sm"
          >
            <div className="aspect-video bg-surface-900">
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
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--project-primary)] px-4 py-2 text-sm font-bold text-surface-950"
                  >
                    {messages.projectDossier.actions.open}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-sm font-bold text-ink">{video.title}</h3>
              {video.description && (
                <p className="mt-1 text-sm leading-relaxed text-muted">
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
