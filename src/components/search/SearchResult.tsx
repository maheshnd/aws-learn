'use client';
import type { SearchEntry } from '@/lib/types';

interface Props {
  entry: SearchEntry;
  query: string;
  onSelect: (entry: SearchEntry) => void;
}

const TYPE_COLORS: Record<string, string> = {
  story: '#f59e0b',
  qa: '#a78bfa',
  checklist: '#3fb950',
  warning: '#f85149',
  relations: '#4A9EFF',
  pricing: '#f59e0b',
  concept: '#8b949e',
};

export function SearchResult({ entry, query, onSelect }: Props) {
  const color = TYPE_COLORS[entry.type] ?? '#8b949e';
  const snippet = entry.text.slice(0, 120);

  return (
    <button
      onClick={() => onSelect(entry)}
      className="w-full text-left px-4 py-3 rounded-lg transition-colors"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: `${color}22`, color }}
        >
          {entry.type}
        </span>
        <span className="text-xs" style={{ color: 'var(--accent-orange)' }}>
          {String(entry.topicNumber).padStart(2, '0')}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {entry.sectionTitle}
        </span>
      </div>
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
        {snippet}
      </p>
    </button>
  );
}
