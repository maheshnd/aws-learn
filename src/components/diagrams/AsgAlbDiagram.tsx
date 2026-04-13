'use client';

export function AsgAlbDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>ALB → Target Group → ASG</p>

      {/* Flow */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="rounded-lg p-3 text-center" style={{ background: '#2d1b00', border: '1px solid #5a3800', minWidth: 100 }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>Internet</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Users</div>
        </div>
        <div style={{ color: '#FF9900' }}>→</div>
        <div className="rounded-lg p-3 text-center" style={{ background: '#2d1b00', border: '1px solid #5a3800', minWidth: 120 }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>ALB</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Layer 7 · HTTPS</div>
        </div>
        <div style={{ color: '#FF9900' }}>→</div>
        <div className="rounded-lg p-3 text-center" style={{ background: '#0d1f38', border: '1px solid #1a3a5c', minWidth: 120 }}>
          <div className="text-xs font-bold" style={{ color: '#4A9EFF' }}>Target Group</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Health checks</div>
        </div>
        <div style={{ color: '#4A9EFF' }}>→</div>
        <div className="flex gap-1">
          {['EC2 1', 'EC2 2', 'EC2 3'].map(e => (
            <div key={e} className="rounded-lg p-2 text-center" style={{ background: '#0d1f38', border: '1px solid #1a3a5c', minWidth: 55 }}>
              <div className="text-xs" style={{ color: '#4A9EFF' }}>{e}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ASG policies */}
      <div className="flex gap-3 flex-wrap">
        {[
          { name: 'Scale Out', desc: 'CPU > 70% → add EC2', color: '#3fb950', bg: '#0d2820' },
          { name: 'Scale In', desc: 'CPU < 30% → remove EC2', color: '#f85149', bg: '#2d0d0d' },
          { name: 'Min/Max', desc: '2 min · 10 max', color: '#8b949e', bg: '#21262d' },
        ].map(p => (
          <div key={p.name} className="rounded-lg px-3 py-2 flex-1 min-w-[140px]" style={{ background: p.bg, border: '1px solid #30363d' }}>
            <div className="text-xs font-bold" style={{ color: p.color }}>{p.name}</div>
            <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
