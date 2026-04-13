'use client';
import { useEffect } from 'react';
import { useLearningStore } from '@/stores/use-learning-store';

interface Options {
  onSearch: () => void;
  onHelp: () => void;
}

export function useKeyboardShortcuts({ onSearch, onHelp }: Options) {
  const {
    manifest,
    currentTopic,
    currentMode,
    allQA,
    currentQAIndex,
    setCurrentTopic,
    setMode,
    setQAIndex,
    toggleAnswer,
    toggleBookmarkTopic,
  } = useLearningStore();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if ((e.key === '/' || (e.metaKey && e.key === 'k'))) {
        e.preventDefault();
        onSearch();
        return;
      }
      if (e.key === 'Escape') return;
      if (e.key === '?') { onHelp(); return; }

      if (e.key === '1') { setMode('learn'); return; }
      if (e.key === '2') { setMode('revision'); return; }
      if (e.key === '3') { setMode('interview'); return; }
      if (e.key === '4') { setMode('scenario'); return; }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const topics = manifest?.topics ?? [];
        if (topics.length === 0) return;
        const idx = topics.findIndex(t => t.number === currentTopic);
        if (e.key === 'ArrowLeft' && idx > 0) setCurrentTopic(topics[idx - 1].number);
        if (e.key === 'ArrowRight' && idx < topics.length - 1) setCurrentTopic(topics[idx + 1].number);
        return;
      }

      if (e.key === 'b' || e.key === 'B') {
        toggleBookmarkTopic(currentTopic);
        return;
      }

      if (currentMode === 'interview') {
        const total = allQA?.length ?? 0;
        if (e.key === 'n' || e.key === 'N') {
          setQAIndex(Math.min(currentQAIndex + 1, total - 1));
        }
        if (e.key === 'p' || e.key === 'P') {
          setQAIndex(Math.max(currentQAIndex - 1, 0));
        }
        if (e.key === 'r' || e.key === 'R') {
          const qa = allQA?.[currentQAIndex];
          if (qa) toggleAnswer(qa.id);
        }
      }
    }

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    manifest,
    currentTopic,
    currentMode,
    allQA,
    currentQAIndex,
    setCurrentTopic,
    setMode,
    setQAIndex,
    toggleAnswer,
    toggleBookmarkTopic,
    onSearch,
    onHelp,
  ]);
}
