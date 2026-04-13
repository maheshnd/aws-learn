'use client';

export function ObservabilityDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Observability — CloudWatch + CloudTrail + X-Ray</p>

      {/* CloudWatch flow */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <div className="rounded-lg p-2.5" style={{ background: '#2d1b00', border: '1px solid #5a3800' }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>Metric / Log</div>
        </div>
        <div style={{ color: '#FF9900' }}>→</div>
        <div className="rounded-lg p-2.5" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-xs font-bold" style={{ color: '#4A9EFF' }}>CloudWatch</div>
        </div>
        <div style={{ color: '#4A9EFF' }}>→</div>
        <div className="rounded-lg p-2.5" style={{ background: '#2d0d0d', border: '1px solid #5a1a1a' }}>
          <div className="text-xs font-bold" style={{ color: '#f85149' }}>Alarm</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>CPU&gt;80%</div>
        </div>
        <div style={{ color: '#f85149' }}>→</div>
        <div className="rounded-lg p-2.5" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-xs font-bold" style={{ color: '#4A9EFF' }}>SNS → Action</div>
        </div>
      </div>

      {/* Three pillars */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: 'CloudWatch', desc: 'Metrics, Logs, Dashboards, Alarms, Events', color: '#FF9900', bg: '#2d1b00', border: '#5a3800' },
          { name: 'CloudTrail', desc: 'API call history. Who did what, when, from where. 90-day default.', color: '#3fb950', bg: '#0d2820', border: '#1a4a3a' },
          { name: 'X-Ray', desc: 'Distributed tracing. Request flow. Find bottlenecks across services.', color: '#a78bfa', bg: '#1a0d38', border: '#2d1f5e' },
        ].map(s => (
          <div key={s.name} className="rounded-xl p-3" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div className="text-xs font-bold mb-1" style={{ color: s.color }}>{s.name}</div>
            <div className="text-xs" style={{ color: '#8b949e' }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
