'use client';

export function DatabasesDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Databases — RDS, Aurora, DynamoDB</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* RDS Multi-AZ */}
        <div className="rounded-xl p-4" style={{ background: '#1a0d38', border: '1px solid #2d1f5e' }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#a78bfa' }}>RDS Multi-AZ</div>
          <div className="flex gap-3">
            <div className="flex-1 rounded p-2 text-center" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
              <div className="text-xs" style={{ color: '#4A9EFF' }}>Primary DB</div>
              <div className="text-xs" style={{ color: '#8b949e' }}>AZ-1 (writes)</div>
            </div>
            <div className="flex items-center" style={{ color: '#a78bfa' }}>⇄</div>
            <div className="flex-1 rounded p-2 text-center" style={{ background: '#21262d', border: '1px solid #30363d' }}>
              <div className="text-xs" style={{ color: '#8b949e' }}>Standby</div>
              <div className="text-xs" style={{ color: '#8b949e' }}>AZ-2 (sync)</div>
            </div>
          </div>
          <div className="text-xs mt-2" style={{ color: '#8b949e' }}>Failover ~1-2min. NOT for read scaling!</div>
        </div>

        {/* Read Replicas */}
        <div className="rounded-xl p-4" style={{ background: '#0d2820', border: '1px solid #1a4a3a' }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#3fb950' }}>Read Replicas</div>
          <div className="flex gap-2 items-center flex-wrap">
            <div className="rounded p-2 text-center" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
              <div className="text-xs" style={{ color: '#4A9EFF' }}>Primary</div>
              <div className="text-xs" style={{ color: '#8b949e' }}>writes</div>
            </div>
            <div style={{ color: '#3fb950' }}>→</div>
            <div className="flex gap-1">
              {['RR 1', 'RR 2', 'RR 3'].map(r => (
                <div key={r} className="rounded p-1.5 text-center" style={{ background: '#0d2820', border: '1px solid #1a4a3a' }}>
                  <div className="text-xs" style={{ color: '#3fb950' }}>{r}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs mt-2" style={{ color: '#8b949e' }}>Async replication. Cross-region OK. Async lag exists!</div>
        </div>

        {/* DynamoDB */}
        <div className="rounded-xl p-4 md:col-span-2" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-sm font-bold mb-2" style={{ color: '#4A9EFF' }}>DynamoDB</div>
          <div className="flex gap-3 flex-wrap">
            {['Partition Key (Hash)', 'Sort Key (optional)', 'GSI (Global Secondary Index)', 'LSI (Local Secondary Index)'].map(c => (
              <span key={c} className="text-xs px-2 py-1 rounded" style={{ background: '#21262d', color: '#8b949e' }}>{c}</span>
            ))}
          </div>
          <div className="text-xs mt-2" style={{ color: '#8b949e' }}>Single-digit ms at any scale · Serverless · Provisioned or On-Demand capacity</div>
        </div>
      </div>
    </div>
  );
}
