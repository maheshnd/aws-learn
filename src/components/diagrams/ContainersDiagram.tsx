'use client';

export function ContainersDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>ECS Architecture + ECS vs EKS</p>

      {/* ECS flow */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <div className="rounded-lg p-2.5" style={{ background: '#2d1b00', border: '1px solid #5a3800' }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>ECR</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Registry</div>
        </div>
        <div style={{ color: '#FF9900' }}>→</div>
        <div className="rounded-lg p-2.5" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-xs font-bold" style={{ color: '#4A9EFF' }}>Task Definition</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>CPU/Mem/Image</div>
        </div>
        <div style={{ color: '#4A9EFF' }}>→</div>
        <div className="rounded-lg p-2.5" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-xs font-bold" style={{ color: '#4A9EFF' }}>Service</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Desired count</div>
        </div>
        <div style={{ color: '#4A9EFF' }}>→</div>
        <div className="rounded-lg p-2.5" style={{ background: '#0d2820', border: '1px solid #1a4a3a' }}>
          <div className="text-xs font-bold" style={{ color: '#3fb950' }}>Tasks</div>
          <div className="text-xs" style={{ color: '#8b949e' }}>Running containers</div>
        </div>
      </div>

      {/* ECS vs EKS */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-3" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
          <div className="text-sm font-bold mb-1" style={{ color: '#4A9EFF' }}>ECS (Fargate)</div>
          <div className="text-xs space-y-0.5" style={{ color: '#8b949e' }}>
            <div>· No cluster management</div>
            <div>· AWS-native</div>
            <div>· Simpler, less config</div>
            <div>· No nodes to patch</div>
          </div>
        </div>
        <div className="rounded-xl p-3" style={{ background: '#1a0d38', border: '1px solid #2d1f5e' }}>
          <div className="text-sm font-bold mb-1" style={{ color: '#a78bfa' }}>EKS</div>
          <div className="text-xs space-y-0.5" style={{ color: '#8b949e' }}>
            <div>· Kubernetes-compatible</div>
            <div>· Portable workloads</div>
            <div>· More control/complexity</div>
            <div>· Open-source ecosystem</div>
          </div>
        </div>
      </div>
    </div>
  );
}
