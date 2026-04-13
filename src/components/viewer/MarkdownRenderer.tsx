'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ContentBlock } from '@/lib/types';
import { CodeBlock } from './CodeBlock';
import { AsciiDiagram } from './AsciiDiagram';

interface Props {
  blocks: ContentBlock[];
  rawMarkdown?: string;
}

function ChecklistLine({ line }: { line: string }) {
  const trimmed = line.trim();
  if (trimmed.startsWith('✅')) {
    return (
      <div className="flex items-start gap-2 py-1">
        <span style={{ color: 'var(--accent-green)' }}>✅</span>
        <span style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
      </div>
    );
  }
  if (trimmed.startsWith('❌')) {
    return (
      <div className="flex items-start gap-2 py-1">
        <span style={{ color: 'var(--accent-red)' }}>❌</span>
        <span style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
      </div>
    );
  }
  if (trimmed.startsWith('⚠️')) {
    return (
      <div className="flex items-start gap-2 py-1">
        <span style={{ color: 'var(--accent-amber)' }}>⚠️</span>
        <span style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(2).trim()}</span>
      </div>
    );
  }
  if (trimmed.startsWith('→')) {
    return (
      <div className="flex items-start gap-2 py-1">
        <span style={{ color: 'var(--accent-blue)' }}>→</span>
        <span style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
      </div>
    );
  }
  if (trimmed.startsWith('☐')) {
    return (
      <div className="flex items-start gap-2 py-1">
        <span style={{ color: 'var(--text-muted)' }}>☐</span>
        <span style={{ color: 'var(--text-secondary)' }}>{trimmed.slice(1).trim()}</span>
      </div>
    );
  }
  return <p style={{ color: 'var(--text-secondary)' }}>{trimmed}</p>;
}

function hasChecklistLines(content: string): boolean {
  return content.split('\n').some(l => /^[✅❌☐→⚠️]/.test(l.trim()));
}

function ParagraphBlock({ content }: { content: string }) {
  if (hasChecklistLines(content)) {
    const lines = content.split('\n');
    return (
      <div className="space-y-0.5 my-2">
        {lines.map((line, i) =>
          line.trim() ? <ChecklistLine key={i} line={line} /> : <div key={i} className="h-1" />
        )}
      </div>
    );
  }
  return (
    <div className="prose prose-sm max-w-none my-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export function MarkdownRenderer({ blocks, rawMarkdown }: Props) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{rawMarkdown ?? ''}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {blocks.map((block, i) => {
        try {
          if (block.type === 'diagram') {
            return <AsciiDiagram key={i} content={block.content} />;
          }
          if (block.type === 'code') {
            return <CodeBlock key={i} content={block.content} language={block.language} />;
          }
          if (block.type === 'text-panel') {
            return (
              <div
                key={i}
                className="text-panel my-3"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  whiteSpace: 'pre-wrap',
                  color: 'var(--text-secondary)',
                }}
              >
                {block.content}
              </div>
            );
          }
          return <ParagraphBlock key={i} content={block.content} />;
        } catch (err) {
          console.warn('Block render failed', err);
          return (
            <pre
              key={i}
              style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', padding: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}
            >
              {block.content}
            </pre>
          );
        }
      })}
    </div>
  );
}
