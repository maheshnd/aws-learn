'use client';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { useLearningStore } from '@/stores/use-learning-store';
import type { SearchEntry } from '@/lib/types';

export function useSearch() {
  const { searchEntries, loadSearchEntries } = useLearningStore();
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => {
    if (!searchEntries) return null;
    return new Fuse<SearchEntry>(searchEntries, {
      keys: ['text', 'sectionTitle'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [searchEntries]);

  const results = useMemo(() => {
    if (!fuse || !query.trim()) return [];
    return fuse.search(query).slice(0, 20).map(r => r.item);
  }, [fuse, query]);

  return { query, setQuery, results, loadSearchEntries };
}
