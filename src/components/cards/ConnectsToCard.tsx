'use client';

interface Props {
  content: string;
}

function parseRelation(line: string) {
  const trimmed = line.trim();
  const fwMatch = trimmed.match(/^(.+?)\s*→\s*(.+?):\s*(.+)$/);
  if (fwMatch) return { from: fwMatch[1].trim(), to: fwMatch[2].trim(), label: fwMatch[3].trim(), dir: '→' };
  const bwMatch = trimmed.match(/^(.+?)\s*←\s*(.+?):\s*(.+)$/);
  if (bwMatch) return { from: bwMatch[1].trim(), to: bwMatch[2].trim(), label: bwMatch[3].trim(), dir: '←' };
  // Simple arrow without label
  const simpleMatch = trimmed.match(/^(.+?)\s*(→|←)\s*(.+)$/);
  if (simpleMatch) return { from: simpleMatch[1].trim(), to: simpleMatch[3].trim(), label: '', dir: simpleMatch[2] };
  return null;
}

export function ConnectsToCard({ content }: Props) {
  const lines = content.split('\n').filter(l => l.trim() && (l.includes('→') || l.includes('←')));

  if (lines.length === 0) {
    return <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{content}</p>;
  }

  return (
    <div className="space-y-2 mt-2">
      {lines.map((line, i) => {
        const rel = parseRelation(line);
        if (!rel) return (
          <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{line}</p>
        );

        return (
          <div key={i} className="flex items-center gap-2 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ background: 'rgba(74,158,255,0.15)', color: 'var(--accent-blue)' }}
            >
              {rel.from}
            </span>
            <span className="text-lg" style={{ color: rel.dir === '→' ? 'var(--accent-orange)' : 'var(--accent-green)' }}>
              {rel.dir}
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ background: 'rgba(63,185,80,0.15)', color: 'var(--accent-green)' }}
            >
              {rel.to}
            </span>
            {rel.label && (
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                — {rel.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
