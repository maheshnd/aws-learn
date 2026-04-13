'use client';

const POLICIES = [
  { name: 'Simple', desc: 'One record, no logic', color: '#8b949e' },
  { name: 'Weighted', desc: 'Split % across endpoints', color: '#4A9EFF' },
  { name: 'Latency', desc: 'Route to lowest latency', color: '#3fb950' },
  { name: 'Failover', desc: 'Primary → Secondary', color: '#f85149' },
  { name: 'Geolocation', desc: 'By country/continent', color: '#a78bfa' },
  { name: 'Geoproximity', desc: 'By distance with bias', color: '#f59e0b' },
  { name: 'Multi-Value', desc: 'Up to 8 healthy IPs', color: '#4A9EFF' },
  { name: 'IP-based', desc: 'By CIDR range', color: '#FF9900' },
];

export function Route53Diagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Route 53 — 8 Routing Policies</p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {POLICIES.map(p => (
          <div key={p.name} className="rounded-lg p-3" style={{ background: '#21262d', border: '1px solid #30363d' }}>
            <div className="text-xs font-bold mb-0.5" style={{ color: p.color }}>{p.name}</div>
            <div className="text-xs" style={{ color: '#8b949e' }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
