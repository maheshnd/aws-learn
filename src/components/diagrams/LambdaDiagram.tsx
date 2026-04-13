'use client';

export function LambdaDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Lambda — Cold Start Lifecycle</p>

      {/* Cold start lifecycle */}
      <div className="flex items-center gap-1 flex-wrap mb-4">
        {[
          { label: 'Download code', time: '~100ms', color: '#f85149' },
          { label: 'Start runtime', time: '~200ms', color: '#f85149' },
          { label: 'Init handler', time: '~50ms', color: '#f59e0b' },
          { label: 'Execute', time: 'varies', color: '#3fb950' },
        ].map((step, i) => (
          <>
            <div key={step.label} className="rounded-lg px-3 py-2" style={{ background: '#21262d', border: '1px solid #30363d' }}>
              <div className="text-xs font-medium" style={{ color: step.color }}>{step.label}</div>
              <div className="text-xs" style={{ color: '#8b949e' }}>{step.time}</div>
            </div>
            {i < 3 && <div style={{ color: '#8b949e', fontSize: '18px' }}>→</div>}
          </>
        ))}
      </div>

      {/* Warm vs cold */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1 rounded-lg p-3" style={{ background: '#2d0d0d', border: '1px solid #5a1a1a' }}>
          <div className="text-xs font-bold" style={{ color: '#f85149' }}>Cold Start</div>
          <div className="text-xs mt-1" style={{ color: '#8b949e' }}>First invocation or scale-out. 100–1000ms overhead. Avoid with Provisioned Concurrency.</div>
        </div>
        <div className="flex-1 rounded-lg p-3" style={{ background: '#0d2820', border: '1px solid #1a4a3a' }}>
          <div className="text-xs font-bold" style={{ color: '#3fb950' }}>Warm Start</div>
          <div className="text-xs mt-1" style={{ color: '#8b949e' }}>Container reused. ~1ms. Globals initialized once.</div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['15min max', '10GB RAM max', '1000 concurrent default', 'VPC adds ~10s cold start', 'Provisioned Concurrency'].map(f => (
          <span key={f} className="text-xs px-2 py-1 rounded" style={{ background: '#21262d', color: '#8b949e' }}>{f}</span>
        ))}
      </div>
    </div>
  );
}
