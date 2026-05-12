import { Info } from 'lucide-react';

interface ProjectNoteProps {
  notes: string[];
}

export default function ProjectNote({ notes }: ProjectNoteProps) {
  if (notes.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[var(--project-primary)]/25 bg-[var(--project-soft)] p-5">
      <div className="flex gap-3">
        <div className="mt-0.5 rounded-lg bg-[rgb(var(--color-card)/0.78)] p-2 text-[var(--project-primary)] shadow-sm dark:bg-surface-950/40">
          <Info className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--project-primary)]">
            Nota
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-surface-600 dark:text-surface-300">
            {notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
