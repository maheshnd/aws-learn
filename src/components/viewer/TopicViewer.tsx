'use client';
import { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLearningStore } from '@/stores/use-learning-store';
import type { TopicData } from '@/lib/types';
import { SectionCard } from './SectionCard';
import { DiagramRenderer } from '../diagrams/DiagramRenderer';

export function TopicViewer() {
  const {
    currentTopic,
    loadTopic,
    manifest,
    markVisited,
    bookmarkedTopics,
    toggleBookmarkTopic,
    setCurrentTopic,
  } = useLearningStore();
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadTopic(currentTopic)
      .then(data => {
        setTopic(data);
        markVisited(currentTopic);
      })
      .finally(() => setLoading(false));
  }, [currentTopic, loadTopic, markVisited]);

  const topics = manifest?.topics ?? [];
  const idx = topics.findIndex(t => t.number === currentTopic);
  const isBookmarked = bookmarkedTopics.includes(currentTopic);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
            style={{ borderColor: 'var(--accent-orange)' }}
          />
          <p style={{ color: 'var(--text-muted)' }}>Loading topic...</p>
        </div>
      </div>
    );
  }

  if (!topic) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Topic header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span
              className="text-3xl font-black font-mono"
              style={{ color: 'var(--accent-orange)' }}
            >
              {String(topic.number).padStart(2, '0')}
            </span>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {topic.title}
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {topic.sections.length} sections · {topic.sections.reduce((a, s) => a + s.qaItems.length, 0)} Q&As
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmarkTopic(currentTopic)}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: isBookmarked ? 'rgba(255,153,0,0.15)' : 'var(--bg-card)',
                color: isBookmarked ? 'var(--accent-orange)' : 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
              title="Bookmark (B)"
            >
              {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => idx > 0 && setCurrentTopic(topics[idx - 1].number)}
            disabled={idx <= 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-30"
            style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {idx + 1} / {topics.length}
          </span>
          <button
            onClick={() => idx < topics.length - 1 && setCurrentTopic(topics[idx + 1].number)}
            disabled={idx >= topics.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-30"
            style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Diagram for this topic */}
      <DiagramRenderer topicNumber={topic.number} />

      {/* Sections */}
      <div className="space-y-2">
        {topic.sections.map(section => (
          <SectionCard key={section.id} section={section} defaultOpen={true} />
        ))}
      </div>
    </div>
  );
}
