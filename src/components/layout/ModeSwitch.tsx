'use client';
import { useLearningStore } from '@/stores/use-learning-store';
import type { AppMode } from '@/lib/types';

const MODES: { id: AppMode; label: string; key: string }[] = [
  { id: 'learn', label: 'Learn', key: '1' },
  { id: 'revision', label: 'Revision', key: '2' },
  { id: 'interview', label: 'Interview', key: '3' },
  { id: 'scenario', label: 'Scenario', key: '4' },
];

export function ModeSwitch() {
  const { currentMode, setMode } = useLearningStore();

  return (
    <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--bg-code)' }}>
      {MODES.map(m => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
          style={{
            background: currentMode === m.id ? 'var(--accent-orange)' : 'transparent',
            color: currentMode === m.id ? '#000' : 'var(--text-secondary)',
          }}
        >
          {m.label}
          <span
            className="ml-1.5 text-xs opacity-50"
            style={{ color: currentMode === m.id ? '#000' : 'var(--text-muted)' }}
          >
            {m.key}
          </span>
        </button>
      ))}
    </div>
  );
}
