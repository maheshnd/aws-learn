'use client';

export function IamDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>IAM — Identity & Access Flow</p>
      <div className="flex items-center gap-2 flex-wrap">
        {/* User */}
        <div className="rounded-lg p-3 text-center min-w-[90px]" style={{ background: '#2d1b00', border: '1px solid #5a3800' }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>User</div>
          <div className="text-xs mt-1" style={{ color: '#8b949e' }}>Root / IAM User</div>
        </div>
        <div className="text-lg" style={{ color: '#4A9EFF' }}>→</div>
        {/* Group */}
        <div className="rounded-lg p-3 text-center min-w-[90px]" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-xs font-bold" style={{ color: '#4A9EFF' }}>Group</div>
          <div className="text-xs mt-1" style={{ color: '#8b949e' }}>Admins / Devs</div>
        </div>
        <div className="text-lg" style={{ color: '#4A9EFF' }}>→</div>
        {/* Policy */}
        <div className="rounded-lg p-3 text-center min-w-[90px]" style={{ background: '#1a0d38', border: '1px solid #2d1f5e' }}>
          <div className="text-xs font-bold" style={{ color: '#a78bfa' }}>Policy</div>
          <div className="text-xs mt-1" style={{ color: '#8b949e' }}>JSON rules</div>
        </div>
        <div className="text-lg" style={{ color: '#4A9EFF' }}>→</div>
        {/* Resource */}
        <div className="rounded-lg p-3 text-center min-w-[90px]" style={{ background: '#0d2820', border: '1px solid #1a4a3a' }}>
          <div className="text-xs font-bold" style={{ color: '#3fb950' }}>Resource</div>
          <div className="text-xs mt-1" style={{ color: '#8b949e' }}>S3, EC2, RDS</div>
        </div>
      </div>

      {/* Role */}
      <div className="mt-4 flex gap-3 flex-wrap">
        <div className="rounded-lg p-3 flex-1 min-w-[200px]" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-xs font-bold mb-1" style={{ color: '#4A9EFF' }}>IAM Role</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Assumed by EC2, Lambda, or cross-account. No long-term credentials.</div>
        </div>
        <div className="rounded-lg p-3 flex-1 min-w-[200px]" style={{ background: '#2d0d0d', border: '1px solid #5a1a1a' }}>
          <div className="text-xs font-bold mb-1" style={{ color: '#f85149' }}>Policy Evaluation</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Default DENY → Explicit ALLOW → Explicit DENY wins</div>
        </div>
      </div>
    </div>
  );
}
