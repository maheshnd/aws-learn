import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TopicsManifest, TopicData, QAItem, SearchEntry, AppMode } from '@/lib/types';

interface LearningStore {
  manifest: TopicsManifest | null;
  loadedTopics: Record<number, TopicData>;
  allQA: QAItem[] | null;
  searchEntries: SearchEntry[] | null;

  currentTopic: number;
  currentMode: AppMode;
  visitedTopics: number[];
  bookmarkedQuestions: string[];
  bookmarkedTopics: number[];
  collapsedSections: string[];
  currentQAIndex: number;
  revealedAnswers: string[];
  sidebarCollapsed: boolean;

  loadManifest: () => Promise<void>;
  loadTopic: (number: number) => Promise<TopicData>;
  loadAllQA: () => Promise<void>;
  loadSearchEntries: () => Promise<void>;
  setCurrentTopic: (n: number) => void;
  setMode: (m: AppMode) => void;
  markVisited: (n: number) => void;
  toggleBookmarkQuestion: (id: string) => void;
  toggleBookmarkTopic: (n: number) => void;
  toggleSection: (id: string) => void;
  toggleAnswer: (id: string) => void;
  setQAIndex: (i: number) => void;
  setSidebarCollapsed: (v: boolean) => void;
}

const BASE = process.env.NODE_ENV === 'production' ? '/aws-learn' : '';

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      manifest: null,
      loadedTopics: {},
      allQA: null,
      searchEntries: null,
      currentTopic: 1,
      currentMode: 'learn',
      visitedTopics: [],
      bookmarkedQuestions: [],
      bookmarkedTopics: [],
      collapsedSections: [],
      currentQAIndex: 0,
      revealedAnswers: [],
      sidebarCollapsed: false,

      loadManifest: async () => {
        if (get().manifest) return;
        const res = await fetch(`${BASE}/data/topics.json`);
        const data = await res.json();
        set({ manifest: data });
      },

      loadTopic: async (number) => {
        if (get().loadedTopics[number]) return get().loadedTopics[number];
        const pad = String(number).padStart(2, '0');
        const res = await fetch(`${BASE}/data/topic-${pad}.json`);
        const data: TopicData = await res.json();
        set(s => ({ loadedTopics: { ...s.loadedTopics, [number]: data } }));
        return data;
      },

      loadAllQA: async () => {
        if (get().allQA) return;
        const res = await fetch(`${BASE}/data/qa-all.json`);
        const data = await res.json();
        set({ allQA: data.questions });
      },

      loadSearchEntries: async () => {
        if (get().searchEntries) return;
        const res = await fetch(`${BASE}/data/search-index.json`);
        const data = await res.json();
        set({ searchEntries: data.entries });
      },

      setCurrentTopic: (n) => set({ currentTopic: n }),
      setMode: (m) => set({ currentMode: m }),
      markVisited: (n) =>
        set(s => ({
          visitedTopics: s.visitedTopics.includes(n) ? s.visitedTopics : [...s.visitedTopics, n],
        })),
      toggleBookmarkQuestion: (id) =>
        set(s => ({
          bookmarkedQuestions: s.bookmarkedQuestions.includes(id)
            ? s.bookmarkedQuestions.filter(q => q !== id)
            : [...s.bookmarkedQuestions, id],
        })),
      toggleBookmarkTopic: (n) =>
        set(s => ({
          bookmarkedTopics: s.bookmarkedTopics.includes(n)
            ? s.bookmarkedTopics.filter(t => t !== n)
            : [...s.bookmarkedTopics, n],
        })),
      toggleSection: (id) =>
        set(s => ({
          collapsedSections: s.collapsedSections.includes(id)
            ? s.collapsedSections.filter(sid => sid !== id)
            : [...s.collapsedSections, id],
        })),
      toggleAnswer: (id) =>
        set(s => ({
          revealedAnswers: s.revealedAnswers.includes(id)
            ? s.revealedAnswers.filter(a => a !== id)
            : [...s.revealedAnswers, id],
        })),
      setQAIndex: (i) => set({ currentQAIndex: i }),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
    }),
    {
      name: 'aws-learn-store',
      partialize: (s) => ({
        currentTopic: s.currentTopic,
        currentMode: s.currentMode,
        visitedTopics: s.visitedTopics,
        bookmarkedQuestions: s.bookmarkedQuestions,
        bookmarkedTopics: s.bookmarkedTopics,
        collapsedSections: s.collapsedSections,
        revealedAnswers: s.revealedAnswers,
        sidebarCollapsed: s.sidebarCollapsed,
      }),
    }
  )
);
