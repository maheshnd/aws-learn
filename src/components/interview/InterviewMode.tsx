'use client';
import { useEffect, useState } from 'react';
import { Shuffle, List, CreditCard } from 'lucide-react';
import { useLearningStore } from '@/stores/use-learning-store';
import type { QAItem } from '@/lib/types';
import { QuestionCard } from './QuestionCard';
import { QACard } from '../cards/QACard';

export function InterviewMode() {
  const { allQA, loadAllQA, manifest, currentQAIndex, setQAIndex } = useLearningStore();
  const [shuffled, setShuffled] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [filterTopic, setFilterTopic] = useState<number | 'all'>('all');
  const [questions, setQuestions] = useState<QAItem[]>([]);

  useEffect(() => {
    loadAllQA();
  }, [loadAllQA]);

  useEffect(() => {
    if (!allQA) return;
    let filtered = filterTopic === 'all' ? allQA : allQA.filter(q => q.topicNumber === filterTopic);
    if (shuffled) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }
    setQuestions(filtered);
    setQAIndex(0);
  }, [allQA, filterTopic, shuffled, setQAIndex]);

  if (!allQA) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-purple)' }} />
      </div>
    );
  }

  const topics = manifest?.topics ?? [];
  const currentQ = questions[currentQAIndex];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Interview Mode
        </h2>

        {/* Topic filter */}
        <select
          value={filterTopic}
          onChange={e => setFilterTopic(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="px-3 py-1.5 rounded-lg text-sm"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
          }}
        >
          <option value="all">All Topics</option>
          {topics.map(t => (
            <option key={t.number} value={t.number}>
              {String(t.number).padStart(2, '0')} — {t.title}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShuffled(s => !s)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
          style={{
            background: shuffled ? 'rgba(167,139,250,0.2)' : 'var(--bg-card)',
            color: shuffled ? '#a78bfa' : 'var(--text-secondary)',
            border: '1px solid var(--border)',
          }}
        >
          <Shuffle size={14} /> Shuffle
        </button>

        <button
          onClick={() => setViewMode(v => v === 'card' ? 'list' : 'card')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
          style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          {viewMode === 'card' ? <List size={14} /> : <CreditCard size={14} />}
          {viewMode === 'card' ? 'List View' : 'Card View'}
        </button>
      </div>

      {questions.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No questions for this topic.</p>
      ) : viewMode === 'card' && currentQ ? (
        <QuestionCard
          qa={currentQ}
          index={currentQAIndex}
          total={questions.length}
          onPrev={() => setQAIndex(Math.max(0, currentQAIndex - 1))}
          onNext={() => setQAIndex(Math.min(questions.length - 1, currentQAIndex + 1))}
        />
      ) : (
        <div className="space-y-3">
          {questions.map(qa => (
            <QACard key={qa.id} qa={qa} showTopic={filterTopic === 'all'} />
          ))}
        </div>
      )}
    </div>
  );
}
