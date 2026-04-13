'use client';
import { useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/useSearch';
import { useLearningStore } from '@/stores/use-learning-store';
import { SearchResult } from './SearchResult';
import type { SearchEntry } from '@/lib/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const { query, setQuery, results, loadSearchEntries } = useSearch();
  const { setCurrentTopic, setMode, markVisited } = useLearningStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      loadSearchEntries();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open, loadSearchEntries, setQuery]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleSelect(entry: SearchEntry) {
    setCurrentTopic(entry.topicNumber);
    markVisited(entry.topicNumber);
    setMode('learn');
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search topics, concepts, Q&As..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--text-primary)' }}
              />
              <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {query.trim() && results.length === 0 && (
                <p className="text-center py-8 text-sm" style={{ color: 'var(--text-muted)' }}>
                  No results for &quot;{query}&quot;
                </p>
              )}
              {!query.trim() && (
                <p className="text-center py-8 text-sm" style={{ color: 'var(--text-muted)' }}>
                  Type to search across all topics and Q&As
                </p>
              )}
              {results.map(entry => (
                <SearchResult key={entry.id} entry={entry} query={query} onSelect={handleSelect} />
              ))}
            </div>

            <div className="px-4 py-2 border-t flex items-center gap-3 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              <span>↩ to select</span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
