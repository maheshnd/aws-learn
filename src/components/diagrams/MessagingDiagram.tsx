'use client';

const SERVICES = [
  {
    name: 'SQS',
    sub: 'Simple Queue Service',
    points: ['Pull-based', 'One consumer per msg', 'Standard or FIFO', 'Decouples producers'],
    color: '#FF9900', bg: '#2d1b00', border: '#5a3800',
  },
  {
    name: 'SNS',
    sub: 'Simple Notification',
    points: ['Push-based', 'Fan-out to many', 'Topics + subscriptions', 'Email/SQS/Lambda'],
    color: '#4A9EFF', bg: '#0d1f38', border: '#1a3a5c',
  },
  {
    name: 'EventBridge',
    sub: 'Event Bus',
    points: ['Event-driven', 'Content filtering', '100+ sources', 'Cross-account'],
    color: '#3fb950', bg: '#0d2820', border: '#1a4a3a',
  },
];

export function MessagingDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Messaging — SQS vs SNS vs EventBridge</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SERVICES.map(s => (
          <div key={s.name} className="rounded-xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div className="text-sm font-bold mb-0.5" style={{ color: s.color }}>{s.name}</div>
            <div className="text-xs mb-2" style={{ color: '#8b949e' }}>{s.sub}</div>
            {s.points.map((p, i) => (
              <div key={i} className="text-xs py-0.5" style={{ color: '#8b949e' }}>· {p}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg p-3" style={{ background: '#21262d', border: '1px solid #30363d' }}>
        <div className="text-xs" style={{ color: '#8b949e' }}>
          <span style={{ color: '#FF9900' }}>SQS</span> = queue (pull) ·{' '}
          <span style={{ color: '#4A9EFF' }}>SNS</span> = broadcast (push) ·{' '}
          <span style={{ color: '#3fb950' }}>EventBridge</span> = event routing ·{' '}
          <span style={{ color: '#a78bfa' }}>Step Functions</span> = orchestration
        </div>
      </div>
    </div>
  );
}
