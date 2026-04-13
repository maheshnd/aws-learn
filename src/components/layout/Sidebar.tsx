'use client';
import { ChevronLeft, ChevronRight, BookmarkCheck } from 'lucide-react';
import { useLearningStore } from '@/stores/use-learning-store';
import { useProgress } from '@/hooks/useProgress';

export function Sidebar() {
  const { manifest, currentTopic, visitedTopics, bookmarkedTopics, sidebarCollapsed, setCurrentTopic, markVisited, setSidebarCollapsed } = useLearningStore();
  const { percent } = useProgress();

  const topics = manifest?.topics ?? [];

  function handleTopicClick(n: number) {
    setCurrentTopic(n);
    markVisited(n);
  }

  if (sidebarCollapsed) {
    return (
      <aside
        className="w-10 flex flex-col items-center py-4 border-r shrink-0"
        style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border)' }}
      >
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="p-1 rounded"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ChevronRight size={16} />
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="w-64 flex flex-col border-r shrink-0 overflow-hidden"
      style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              Progress
            </span>
            <span className="text-xs" style={{ color: 'var(--accent-orange)' }}>
              {percent}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--bg-hover)' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${percent}%`, background: 'var(--accent-orange)' }}
            />
          </div>
        </div>
        <button
          onClick={() => setSidebarCollapsed(true)}
          className="ml-2 p-1 rounded"
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Topic list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {topics.map(topic => {
          const isActive = currentTopic === topic.number;
          const isVisited = visitedTopics.includes(topic.number);
          const isBookmarked = bookmarkedTopics.includes(topic.number);

          return (
            <button
              key={topic.number}
              onClick={() => handleTopicClick(topic.number)}
              className="w-full text-left px-4 py-2.5 flex items-center gap-2 transition-colors"
              style={{
                background: isActive ? 'var(--bg-hover)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-orange)' : '3px solid transparent',
              }}
            >
              {/* Number badge */}
              <span
                className="text-xs font-mono w-6 text-center rounded shrink-0"
                style={{
                  color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {String(topic.number).padStart(2, '0')}
              </span>

              {/* Title */}
              <span
                className="text-sm truncate flex-1"
                style={{
                  color: isActive
                    ? 'var(--text-primary)'
                    : isVisited
                    ? 'var(--text-secondary)'
                    : 'var(--text-muted)',
                }}
              >
                {topic.title}
              </span>

              {/* Indicators */}
              <div className="flex items-center gap-1 shrink-0">
                {isBookmarked && (
                  <BookmarkCheck size={12} style={{ color: 'var(--accent-orange)' }} />
                )}
                {isVisited && !isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--accent-green)' }}
                  />
                )}
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {topic.qaCount > 0 ? `${topic.qaCount}Q` : ''}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
