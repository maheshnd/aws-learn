'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/stores/use-learning-store';
import type { TopicData } from '@/lib/types';
import { ChecklistCard } from '../cards/ChecklistCard';

export function RevisionMode() {
  const { currentTopic, loadTopic, markVisited } = useLearningStore();
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    loadTopic(currentTopic).then(data => {
      setTopic(data);
      markVisited(currentTopic);
    });
  }, [currentTopic, loadTopic, markVisited]);

  if (!topic) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-orange)' }} />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <span className="text-3xl font-black font-mono" style={{ color: 'var(--accent-orange)' }}>
          {String(topic.number).padStart(2, '0')}
        </span>
        <h1 className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
          {topic.title} — Revision
        </h1>
      </div>

      <div className="space-y-3">
        {topic.sections.map(section => {
          const isExpanded = expanded.includes(section.id);
          const points = section.revisionPoints;
          if (points.length === 0) return null;

          return (
            <div
              key={section.id}
              className="rounded-xl p-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {section.title}
                </span>
                <button
                  onClick={() => setExpanded(e => e.includes(section.id) ? e.filter(i => i !== section.id) : [...e, section.id])}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                >
                  {isExpanded ? 'Collapse' : 'Show full'}
                </button>
              </div>

              {isExpanded ? (
                <div className="space-y-1">
                  {section.blocks.map((block, i) => (
                    <pre key={i} className="text-xs whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                      {block.content}
                    </pre>
                  ))}
                </div>
              ) : (
                <ChecklistCard lines={points} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
