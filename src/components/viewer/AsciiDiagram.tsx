'use client';

interface Props {
  content: string;
}

export function AsciiDiagram({ content }: Props) {
  return (
    <div
      className="diagram-panel my-3 rounded-lg overflow-x-auto"
      style={{
        background: 'var(--bg-code)',
        border: '1px solid var(--border)',
        padding: '16px',
        fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
        fontSize: '13px',
        lineHeight: 1.5,
        whiteSpace: 'pre',
        color: 'var(--text-secondary)',
      }}
    >
      {content}
    </div>
  );
}
