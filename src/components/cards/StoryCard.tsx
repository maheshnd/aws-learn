'use client';
import { MarkdownRenderer } from '../viewer/MarkdownRenderer';
import type { Section } from '@/lib/types';

interface Props {
  section: Section;
}

export function StoryCard({ section }: Props) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'rgba(245,158,11,0.05)',
        border: '1px solid rgba(245,158,11,0.2)',
        borderLeft: '4px solid var(--accent-amber)',
      }}
    >
      <MarkdownRenderer blocks={section.blocks} rawMarkdown={section.rawMarkdown} />
    </div>
  );
}
