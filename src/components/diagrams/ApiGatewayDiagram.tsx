'use client';

export function ApiGatewayDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>API Gateway — Request Auth Flow</p>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {[
          { label: 'Client', color: '#FF9900', bg: '#2d1b00', border: '#5a3800' },
          { label: 'WAF', color: '#f85149', bg: '#2d0d0d', border: '#5a1a1a' },
          { label: 'API GW', color: '#FF9900', bg: '#2d1b00', border: '#5a3800' },
          { label: 'Authorizer', color: '#a78bfa', bg: '#1a0d38', border: '#2d1f5e' },
          { label: 'Lambda / HTTP', color: '#4A9EFF', bg: '#0d1f38', border: '#1a3a5c' },
        ].map((step, i) => (
          <>
            <div key={step.label} className="rounded-lg px-3 py-2 text-center" style={{ background: step.bg, border: `1px solid ${step.border}` }}>
              <div className="text-xs font-bold" style={{ color: step.color }}>{step.label}</div>
            </div>
            {i < 4 && <div style={{ color: '#8b949e' }}>→</div>}
          </>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {['REST API', 'HTTP API (cheaper)', 'WebSocket API', 'Throttling', 'Caching', 'Usage Plans', 'Stages'].map(f => (
          <span key={f} className="text-xs px-2 py-1 rounded" style={{ background: '#21262d', color: '#8b949e' }}>{f}</span>
        ))}
      </div>
    </div>
  );
}
