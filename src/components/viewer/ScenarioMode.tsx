'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/stores/use-learning-store';
import type { Section } from '@/lib/types';

const SCENARIO_KEYWORDS = ['SCENARIO', 'Debug', 'Design a', 'How do you', 'Walk me through', 'production problem', 'troubleshoot'];

function isScenario(section: Section): boolean {
  const text = section.rawMarkdown;
  return SCENARIO_KEYWORDS.some(kw => text.includes(kw));
}

export function ScenarioMode() {
  const { manifest, loadTopic } = useLearningStore();
  const [scenarios, setScenarios] = useState<{ topicTitle: string; section: Section }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!manifest) return;
    const topics = manifest.topics;
    setLoading(true);
    Promise.all(topics.map(t => loadTopic(t.number))).then(datas => {
      const found: { topicTitle: string; section: Section }[] = [];
      datas.forEach(data => {
        data.sections.forEach(section => {
          if (isScenario(section)) {
            found.push({ topicTitle: data.title, section });
          }
        });
      });
      setScenarios(found);
      setLoading(false);
    });
  }, [manifest, loadTopic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-orange)' }} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Scenario Mode</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {scenarios.length} scenario-based questions for troubleshooting practice
        </p>
      </div>

      {scenarios.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No scenario sections detected in current content.</p>
      ) : (
        <div className="space-y-4">
          {scenarios.map(({ topicTitle, section }, i) => (
            <div
              key={`${section.id}-${i}`}
              className="rounded-xl p-4"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--accent-orange)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,153,0,0.15)', color: '#FF9900' }}
                >
                  {topicTitle}
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {section.title}
                </span>
              </div>
              <pre
                className="text-sm whitespace-pre-wrap leading-relaxed font-sans"
                style={{ color: 'var(--text-secondary)' }}
              >
                {section.rawMarkdown.slice(0, 800)}
                {section.rawMarkdown.length > 800 && '...'}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
