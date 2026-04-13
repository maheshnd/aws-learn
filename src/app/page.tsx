'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/stores/use-learning-store';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { TopicViewer } from '@/components/viewer/TopicViewer';
import { RevisionMode } from '@/components/viewer/RevisionMode';
import { ScenarioMode } from '@/components/viewer/ScenarioMode';
import { InterviewMode } from '@/components/interview/InterviewMode';
import { SearchModal } from '@/components/search/SearchModal';
import { KeyboardHelp } from '@/components/layout/KeyboardHelp';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  const { loadManifest, currentMode } = useLearningStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    loadManifest();
  }, [loadManifest]);

  useKeyboardShortcuts({
    onSearch: () => setSearchOpen(true),
    onHelp: () => setHelpOpen(true),
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg-app)' }}>
      <TopBar onSearchOpen={() => setSearchOpen(true)} onHelpOpen={() => setHelpOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          {currentMode === 'learn' && <TopicViewer />}
          {currentMode === 'revision' && <RevisionMode />}
          {currentMode === 'interview' && <InterviewMode />}
          {currentMode === 'scenario' && <ScenarioMode />}
        </main>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <KeyboardHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
