'use client';
import { Search, Keyboard, Bookmark } from 'lucide-react';
import { ModeSwitch } from './ModeSwitch';
import { useLearningStore } from '@/stores/use-learning-store';

interface Props {
  onSearchOpen: () => void;
  onHelpOpen: () => void;
}

export function TopBar({ onSearchOpen, onHelpOpen }: Props) {
  const { manifest } = useLearningStore();

  return (
    <header
      className="h-14 flex items-center justify-between px-4 border-b shrink-0 z-10"
      style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold" style={{ color: 'var(--accent-orange)' }}>
          ☁️ AWS
        </span>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {manifest ? `${manifest.totalTopics} topics · ${manifest.totalQA} Q&As` : 'Loading...'}
        </span>
      </div>

      <ModeSwitch />

      <div className="flex items-center gap-2">
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
          }}
        >
          <Search size={14} />
          <span>Search</span>
          <kbd
            className="ml-1 text-xs px-1 rounded"
            style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }}
          >
            /
          </kbd>
        </button>
        <button
          onClick={onHelpOpen}
          className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
          style={{ color: 'var(--text-secondary)' }}
          title="Keyboard shortcuts (?)"
        >
          <Keyboard size={16} />
        </button>
      </div>
    </header>
  );
}
