'use client';
import { useLearningStore } from '@/stores/use-learning-store';

export function useProgress() {
  const { visitedTopics, manifest, bookmarkedTopics } = useLearningStore();
  const total = manifest?.totalTopics ?? 0;
  const visited = visitedTopics.length;
  const percent = total > 0 ? Math.round((visited / total) * 100) : 0;

  return { visited, total, percent, bookmarkedTopics };
}
