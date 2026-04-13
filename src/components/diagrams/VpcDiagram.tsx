'use client';

export function VpcDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>VPC — Full Subnet Architecture</p>

      {/* Internet */}
      <div className="text-center mb-2">
        <span className="text-xs px-3 py-1 rounded-full" style={{ background: '#2d1b00', color: '#FF9900', border: '1px solid #5a3800' }}>
          🌐 Internet Gateway
        </span>
      </div>
      <div className="text-center text-xs mb-3" style={{ color: '#FF9900' }}>↓</div>

      {/* AZ columns */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {['AZ-1a', 'AZ-1b', 'AZ-1c'].map(az => (
          <div key={az} className="rounded-lg overflow-hidden" style={{ border: '1px solid #30363d' }}>
            <div className="text-center text-xs py-1 font-bold" style={{ background: '#21262d', color: '#8b949e' }}>{az}</div>
            <div className="p-2 space-y-1">
              <div className="rounded p-1.5 text-center" style={{ background: '#0d2820', border: '1px solid #1a4a3a' }}>
                <div className="text-xs" style={{ color: '#3fb950' }}>Public Subnet</div>
                <div className="text-xs" style={{ color: '#8b949e' }}>10.0.x.0/24</div>
              </div>
              <div className="rounded p-1.5 text-center" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
                <div className="text-xs" style={{ color: '#4A9EFF' }}>Private Subnet</div>
                <div className="text-xs" style={{ color: '#8b949e' }}>App Tier</div>
              </div>
              <div className="rounded p-1.5 text-center" style={{ background: '#1a0d38', border: '1px solid #2d1f5e' }}>
                <div className="text-xs" style={{ color: '#a78bfa' }}>DB Subnet</div>
                <div className="text-xs" style={{ color: '#8b949e' }}>RDS/Aurora</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex gap-2 flex-wrap">
        {['NAT Gateway (private→internet)', 'Security Groups (stateful)', 'NACLs (stateless)', 'VPC Peering / TGW'].map(l => (
          <span key={l} className="text-xs px-2 py-1 rounded" style={{ background: '#21262d', color: '#8b949e' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}
