'use client';

const FAMILIES = [
  { name: 'T (Burstable)', use: 'Dev/Test', color: '#8b949e', bg: '#21262d', border: '#30363d' },
  { name: 'M (General)', use: 'Web servers', color: '#FF9900', bg: '#2d1b00', border: '#5a3800' },
  { name: 'C (Compute)', use: 'CPU-intensive', color: '#4A9EFF', bg: '#0d1f38', border: '#1a3a5c' },
  { name: 'R (Memory)', use: 'Databases, cache', color: '#a78bfa', bg: '#1a0d38', border: '#2d1f5e' },
  { name: 'I (Storage)', use: 'High IOPS', color: '#3fb950', bg: '#0d2820', border: '#1a4a3a' },
  { name: 'G (GPU)', use: 'ML/Graphics', color: '#f59e0b', bg: '#2d1b00', border: '#5a3800' },
];

const PRICING = [
  { name: 'On-Demand', save: '0%', color: '#8b949e' },
  { name: 'Reserved 1yr', save: '40%', color: '#4A9EFF' },
  { name: 'Reserved 3yr', save: '60%', color: '#3fb950' },
  { name: 'Savings Plan', save: '72%', color: '#a78bfa' },
  { name: 'Spot', save: '90%', color: '#FF9900' },
];

export function Ec2Diagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>EC2 — Instance Families & Pricing Models</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {FAMILIES.map(f => (
          <div key={f.name} className="rounded-lg p-2.5" style={{ background: f.bg, border: `1px solid ${f.border}` }}>
            <div className="text-xs font-bold" style={{ color: f.color }}>{f.name}</div>
            <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{f.use}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {PRICING.map(p => (
          <div key={p.name} className="rounded-lg px-3 py-1.5 text-center" style={{ background: '#21262d', border: '1px solid #30363d' }}>
            <div className="text-xs" style={{ color: '#8b949e' }}>{p.name}</div>
            <div className="text-sm font-bold" style={{ color: p.color }}>{p.save} off</div>
          </div>
        ))}
      </div>
    </div>
  );
}
