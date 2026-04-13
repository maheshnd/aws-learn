'use client';

export function CloudFrontDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>CloudFront — CDN + S3 + OAC Flow</p>
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="rounded-lg p-3 text-center" style={{ background: '#2d1b00', border: '1px solid #5a3800', minWidth: 80 }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>User</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Browser</div>
        </div>
        <div style={{ color: '#FF9900' }}>→</div>
        <div className="rounded-lg p-3 text-center" style={{ background: '#2d1b00', border: '1px solid #5a3800', minWidth: 120 }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>CloudFront</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Edge Location</div>
          <div className="text-xs mt-1 px-1 rounded" style={{ background: '#5a3800', color: '#FF9900' }}>Cache HIT?</div>
        </div>
        <div style={{ color: '#3fb950' }}>↓ miss</div>
        <div className="rounded-lg p-3 text-center" style={{ background: '#0d2820', border: '1px solid #1a4a3a', minWidth: 120 }}>
          <div className="text-xs font-bold" style={{ color: '#3fb950' }}>S3 Origin</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>+ OAC Policy</div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {['450+ Edge Locations', 'HTTPS enforced', 'Geo-restriction', 'Custom error pages', 'WAF integration', 'OAC (no public S3)'].map(f => (
          <span key={f} className="text-xs px-2 py-1 rounded" style={{ background: '#21262d', color: '#8b949e' }}>{f}</span>
        ))}
      </div>
    </div>
  );
}
