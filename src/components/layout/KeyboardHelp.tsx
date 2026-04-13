'use client';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHORTCUTS = [
  { keys: ['/', 'Cmd+K'], desc: 'Open search' },
  { keys: ['Esc'], desc: 'Close modal' },
  { keys: ['← →'], desc: 'Previous / Next topic' },
  { keys: ['1', '2', '3', '4'], desc: 'Switch mode (Learn/Revision/Interview/Scenario)' },
  { keys: ['N'], desc: 'Next interview question' },
  { keys: ['P'], desc: 'Previous interview question' },
  { keys: ['R'], desc: 'Reveal / hide answer' },
  { keys: ['B'], desc: 'Bookmark current topic' },
  { keys: ['?'], desc: 'Show this help panel' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function KeyboardHelp({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>Keyboard Shortcuts</h2>
              <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={16} /></button>
            </div>
            <div className="p-5 space-y-3">
              {SHORTCUTS.map(s => (
                <div key={s.desc} className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</span>
                  <div className="flex gap-1">
                    {s.keys.map(k => (
                      <kbd
                        key={k}
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
