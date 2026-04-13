'use client';

const MODELS = [
  { name: 'On-Demand', flexibility: 100, savings: 0, color: '#8b949e' },
  { name: 'Reserved 1yr', flexibility: 40, savings: 40, color: '#4A9EFF' },
  { name: 'Reserved 3yr', flexibility: 20, savings: 60, color: '#3fb950' },
  { name: 'Savings Plans', flexibility: 60, savings: 66, color: '#a78bfa' },
  { name: 'Spot', flexibility: 10, savings: 90, color: '#FF9900' },
];

export function CostDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>EC2 Pricing — Cost Savings vs Flexibility</p>
      <div className="space-y-2.5">
        {MODELS.map(m => (
          <div key={m.name} className="flex items-center gap-3">
            <div className="w-28 text-xs text-right" style={{ color: 'var(--text-secondary)' }}>{m.name}</div>
            <div className="flex-1 flex gap-1">
              <div
                className="h-6 rounded-l flex items-center px-2"
                style={{ width: `${m.flexibility}%`, background: '#21262d', border: '1px solid #30363d', minWidth: 20 }}
              >
                <span className="text-xs" style={{ color: '#8b949e' }}>flex</span>
              </div>
            </div>
            <div
              className="h-6 rounded flex items-center px-2 w-20"
              style={{ background: `${m.color}22`, border: `1px solid ${m.color}44` }}
            >
              <span className="text-xs font-bold" style={{ color: m.color }}>-{m.savings}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
