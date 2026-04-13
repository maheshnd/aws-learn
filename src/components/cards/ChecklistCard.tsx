'use client';

interface Props {
  lines: string[];
}

export function ChecklistCard({ lines }: Props) {
  return (
    <div className="space-y-1 mt-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('✅')) {
          return (
            <div key={i} className="flex items-start gap-2 py-1">
              <span style={{ color: 'var(--accent-green)', flexShrink: 0 }}>✅</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
            </div>
          );
        }
        if (trimmed.startsWith('❌')) {
          return (
            <div key={i} className="flex items-start gap-2 py-1">
              <span style={{ color: 'var(--accent-red)', flexShrink: 0 }}>❌</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
            </div>
          );
        }
        if (trimmed.startsWith('⚠️')) {
          return (
            <div key={i} className="flex items-start gap-2 py-1">
              <span style={{ color: 'var(--accent-amber)', flexShrink: 0 }}>⚠️</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(2).trim()}</span>
            </div>
          );
        }
        if (trimmed.startsWith('→')) {
          return (
            <div key={i} className="flex items-start gap-2 py-1">
              <span style={{ color: 'var(--accent-blue)', flexShrink: 0 }}>→</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
            </div>
          );
        }
        if (trimmed.startsWith('☐')) {
          return (
            <div key={i} className="flex items-start gap-2 py-1">
              <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>☐</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
            </div>
          );
        }
        return <p key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{trimmed}</p>;
      })}
    </div>
  );
}
