'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  content: string;
  language?: string;
}

export function CodeBlock({ content, language }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative my-3 group" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
      {language && (
        <div
          className="flex items-center justify-between px-4 py-1.5 border-b"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-hover)' }}
        >
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 rounded"
            style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)' }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed m-0" style={{ color: 'var(--text-primary)' }}>
        <code>{content}</code>
      </pre>
    </div>
  );
}
