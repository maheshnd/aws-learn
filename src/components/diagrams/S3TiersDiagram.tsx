'use client';

const TIERS = [
  { name: 'S3 Standard', cost: '$0.023/GB', retrieval: 'Instant', use: 'Frequently accessed', color: '#FF9900', width: '100%' },
  { name: 'S3 Intelligent-Tiering', cost: '$0.023/GB', retrieval: 'Auto', use: 'Unknown patterns', color: '#4A9EFF', width: '90%' },
  { name: 'S3 Standard-IA', cost: '$0.0125/GB', retrieval: 'Instant', use: 'Monthly access', color: '#3fb950', width: '75%' },
  { name: 'S3 One Zone-IA', cost: '$0.01/GB', retrieval: 'Instant', use: 'Recreatable data', color: '#a78bfa', width: '60%' },
  { name: 'S3 Glacier Instant', cost: '$0.004/GB', retrieval: 'Milliseconds', use: 'Quarterly access', color: '#f59e0b', width: '45%' },
  { name: 'S3 Glacier Flexible', cost: '$0.0036/GB', retrieval: '1–12 hours', use: 'Archive', color: '#f59e0b', width: '35%' },
  { name: 'Glacier Deep Archive', cost: '$0.00099/GB', retrieval: '12–48 hours', use: 'Long-term archive', color: '#8b949e', width: '20%' },
];

export function S3TiersDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>S3 Storage Classes — Cost vs Speed</p>
      <div className="space-y-2">
        {TIERS.map(t => (
          <div key={t.name} className="flex items-center gap-3">
            <div className="w-44 text-xs text-right shrink-0" style={{ color: 'var(--text-secondary)' }}>{t.name}</div>
            <div className="flex-1 h-6 rounded relative" style={{ background: 'var(--bg-hover)' }}>
              <div
                className="h-full rounded flex items-center px-2"
                style={{ width: t.width, background: `${t.color}33`, border: `1px solid ${t.color}55` }}
              >
                <span className="text-xs font-medium" style={{ color: t.color }}>{t.cost}</span>
              </div>
            </div>
            <div className="w-32 text-xs" style={{ color: 'var(--text-muted)' }}>{t.retrieval}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
