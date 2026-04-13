'use client';

const STORAGE = [
  { name: 'EBS', sub: 'Block Storage', points: ['Single EC2', 'Persist after stop', 'SSD/HDD types', 'Snapshots to S3'], color: '#FF9900', bg: '#2d1b00', border: '#5a3800' },
  { name: 'EFS', sub: 'File Storage', points: ['Multi-AZ mount', 'NFS protocol', 'Auto-scale', 'POSIX filesystem'], color: '#4A9EFF', bg: '#0d1f38', border: '#1a3a5c' },
  { name: 'S3', sub: 'Object Storage', points: ['Unlimited scale', 'Any file type', 'Static hosting', '11 nines durability'], color: '#3fb950', bg: '#0d2820', border: '#1a4a3a' },
  { name: 'Instance Store', sub: 'Ephemeral', points: ['Fastest speed', 'Lost on stop', 'No cost extra', 'Temp scratch disk'], color: '#f85149', bg: '#2d0d0d', border: '#5a1a1a' },
];

export function StorageDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>EC2 Storage Options Compared</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {STORAGE.map(s => (
          <div key={s.name} className="rounded-xl p-3" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div className="font-bold text-sm mb-0.5" style={{ color: s.color }}>{s.name}</div>
            <div className="text-xs mb-2" style={{ color: '#8b949e' }}>{s.sub}</div>
            {s.points.map((p, i) => (
              <div key={i} className="text-xs py-0.5" style={{ color: '#8b949e' }}>· {p}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
