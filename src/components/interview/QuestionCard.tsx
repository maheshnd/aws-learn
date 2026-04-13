'use client';
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Eye, EyeOff, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QAItem } from '@/lib/types';
import { useLearningStore } from '@/stores/use-learning-store';

interface Props {
  qa: QAItem;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function QuestionCard({ qa, index, total, onPrev, onNext }: Props) {
  const { revealedAnswers, toggleAnswer, bookmarkedQuestions, toggleBookmarkQuestion } = useLearningStore();
  const isRevealed = revealedAnswers.includes(qa.id);
  const isBookmarked = bookmarkedQuestions.includes(qa.id);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {index + 1} / {total} questions
        </span>
        <div
          className="h-1.5 flex-1 mx-4 rounded-full overflow-hidden"
          style={{ background: 'var(--bg-hover)' }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${((index + 1) / total) * 100}%`, background: 'var(--accent-purple)' }}
          />
        </div>
        <button
          onClick={() => toggleBookmarkQuestion(qa.id)}
          className="p-1.5 rounded transition-colors"
          style={{ color: isBookmarked ? 'var(--accent-orange)' : 'var(--text-muted)' }}
          title="Bookmark"
        >
          {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qa.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderTop: '4px solid var(--accent-purple)' }}
        >
          {/* Topic badge */}
          <div className="px-6 pt-5 pb-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}
            >
              {qa.topic}
            </span>
          </div>

          {/* Question */}
          <div className="px-6 pb-4">
            <h2 className="text-lg font-semibold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {qa.question}
            </h2>
          </div>

          {/* Reveal button */}
          <div className="px-6 pb-4">
            <button
              onClick={() => toggleAnswer(qa.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all"
              style={{
                background: isRevealed ? 'rgba(167,139,250,0.2)' : 'var(--accent-purple)',
                color: isRevealed ? '#a78bfa' : '#fff',
              }}
            >
              {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
              {isRevealed ? 'Hide Answer (R)' : 'Reveal Answer (R)'}
            </button>
          </div>

          {/* Answer */}
          <AnimatePresence initial={false}>
            {isRevealed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div
                  className="px-6 py-4 border-t"
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
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-30"
          style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          <ChevronLeft size={16} /> Previous (P)
        </button>
        <button
          onClick={onNext}
          disabled={index === total - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-30"
          style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          Next (N) <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
