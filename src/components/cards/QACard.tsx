'use client';
import { useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QAItem } from '@/lib/types';
import { useLearningStore } from '@/stores/use-learning-store';

interface Props {
  qa: QAItem;
  showTopic?: boolean;
}

export function QACard({ qa, showTopic = false }: Props) {
  const { revealedAnswers, toggleAnswer, bookmarkedQuestions, toggleBookmarkQuestion } = useLearningStore();
  const isRevealed = revealedAnswers.includes(qa.id);
  const isBookmarked = bookmarkedQuestions.includes(qa.id);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent-purple)' }}
    >
      {/* Question */}
      <div className="px-4 py-3">
        {showTopic && (
          <span
            className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block"
            style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}
          >
            {qa.topic}
          </span>
        )}
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium text-sm flex-1" style={{ color: 'var(--text-primary)' }}>
            Q: {qa.question}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => toggleBookmarkQuestion(qa.id)}
              className="p-1 rounded transition-colors"
              style={{ color: isBookmarked ? 'var(--accent-orange)' : 'var(--text-muted)' }}
            >
              {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            </button>
            <button
              onClick={() => toggleAnswer(qa.id)}
              className="p-1 rounded transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              {isRevealed ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
        </div>

        <button
          onClick={() => toggleAnswer(qa.id)}
          className="mt-2 text-xs px-3 py-1 rounded-md transition-colors"
          style={{
            background: isRevealed ? 'rgba(167,139,250,0.15)' : 'var(--bg-hover)',
            color: isRevealed ? '#a78bfa' : 'var(--text-secondary)',
          }}
        >
          {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
        </button>
      </div>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isRevealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 py-3 border-t"
              style={{ borderColor: 'var(--border)', background: 'rgba(167,139,250,0.05)' }}
            >
              <pre
                className="text-sm whitespace-pre-wrap leading-relaxed font-sans"
                style={{ color: 'var(--text-secondary)' }}
              >
                {qa.answer}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
