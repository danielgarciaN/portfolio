'use client';

import { useI18n } from '@/lib/i18n';
import type { TimelineItem } from '@/types';

export default function TimelineDates({ item }: { item: TimelineItem }) {
  const { locale, messages } = useI18n();
  const format = (date: string) => new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + '-01T00:00:00Z'));
  return (
    <span className="inline-flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
      <time dateTime={item.start_date}>{format(item.start_date)}</time><span>—</span>
      {item.current ? messages.timeline.present : item.end_date && <time dateTime={item.end_date}>{format(item.end_date)}</time>}
    </span>
  );
}
