'use client';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Section } from '@/lib/types';
import { useLearningStore } from '@/stores/use-learning-store';
import { MarkdownRenderer } from './MarkdownRenderer';
import { QACard } from '../cards/QACard';
import { ConnectsToCard } from '../cards/ConnectsToCard';

interface Props {
  section: Section;
  defaultOpen?: boolean;
}

const SECTION_STYLES: Record<string, { border: string; bg: string; badge: string }> = {
  story: { border: 'var(--accent-amber)', bg: 'rgba(245,158,11,0.05)', badge: '#f59e0b' },
  qa: { border: 'var(--accent-purple)', bg: 'rgba(167,139,250,0.05)', badge: '#a78bfa' },
  checklist: { border: 'var(--accent-green)', bg: 'rgba(63,185,80,0.05)', badge: '#3fb950' },
  warning: { border: 'var(--accent-red)', bg: 'rgba(248,81,73,0.05)', badge: '#f85149' },
  relations: { border: 'var(--accent-blue)', bg: 'rgba(74,158,255,0.05)', badge: '#4A9EFF' },
  pricing: { border: 'var(--accent-amber)', bg: 'rgba(245,158,11,0.05)', badge: '#f59e0b' },
  concept: { border: 'var(--border)', bg: 'var(--bg-card)', badge: '#8b949e' },
  generic: { border: 'var(--border)', bg: 'var(--bg-card)', badge: '#8b949e' },
};

export function SectionCard({ section, defaultOpen = true }: Props) {
  const styles = SECTION_STYLES[section.type] ?? SECTION_STYLES.concept;
  const { collapsedSections, toggleSection } = useLearningStore();
  const isCollapsed = collapsedSections.includes(section.id);
  const isOpen = defaultOpen ? !isCollapsed : isCollapsed;

  function toggle() { toggleSection(section.id); }

  try {
    return (
      <div
        className="rounded-xl overflow-hidden mb-4"
        style={{
          background: styles.bg,
          border: `1px solid var(--border)`,
          borderLeft: `4px solid ${styles.border}`,
        }}
      >
        {/* Header */}
        <button
          onClick={toggle}
          className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{section.title}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${styles.badge}22`, color: styles.badge }}
            >
              {section.type}
            </span>
            {section.qaItems.length > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}
              >
                {section.qaItems.length} Q&As
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          ) : (
            <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          )}
        </button>

        {/* Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {section.type === 'relations' ? (
                  <ConnectsToCard content={section.rawMarkdown} />
                ) : section.type === 'qa' && section.qaItems.length > 0 ? (
                  <div className="space-y-3 mt-2">
                    {section.qaItems.map(qa => (
                      <QACard key={qa.id} qa={qa} />
                    ))}
                  </div>
                ) : (
                  <MarkdownRenderer blocks={section.blocks} rawMarkdown={section.rawMarkdown} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  } catch (err) {
    console.warn(`Section render failed: ${section.title}`, err);
    return (
      <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', padding: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
        {section.rawMarkdown}
      </pre>
    );
  }
}
