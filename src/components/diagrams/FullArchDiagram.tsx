'use client';

export function FullArchDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Full Production Architecture</p>

      {/* Row 1: Edge */}
      <div className="flex justify-center gap-2 mb-2 flex-wrap">
        {['Route 53', 'CloudFront', 'WAF / Shield'].map(s => (
          <div key={s} className="rounded px-3 py-1.5 text-center" style={{ background: '#2d1b00', border: '1px solid #5a3800' }}>
            <div className="text-xs font-bold" style={{ color: '#FF9900' }}>{s}</div>
          </div>
        ))}
      </div>
      <div className="text-center text-xs mb-2" style={{ color: '#FF9900' }}>↓</div>

      {/* Row 2: Load balancing */}
      <div className="flex justify-center mb-2">
        <div className="rounded px-6 py-1.5" style={{ background: '#2d1b00', border: '1px solid #5a3800' }}>
          <div className="text-xs font-bold" style={{ color: '#FF9900' }}>ALB (Multi-AZ)</div>
        </div>
      </div>
      <div className="text-center text-xs mb-2" style={{ color: '#4A9EFF' }}>↓</div>

      {/* Row 3: Compute */}
      <div className="flex justify-center gap-2 mb-2 flex-wrap">
        {['EC2 (ASG)', 'ECS/Fargate', 'Lambda'].map(s => (
          <div key={s} className="rounded px-3 py-1.5" style={{ background: '#0d1f38', border: '1px solid #1a3a5c' }}>
            <div className="text-xs font-bold" style={{ color: '#4A9EFF' }}>{s}</div>
          </div>
        ))}
      </div>
      <div className="text-center text-xs mb-2" style={{ color: '#a78bfa' }}>↓</div>

      {/* Row 4: Data */}
      <div className="flex justify-center gap-2 mb-2 flex-wrap">
        {['RDS / Aurora', 'DynamoDB', 'ElastiCache', 'S3'].map(s => (
          <div key={s} className="rounded px-3 py-1.5" style={{ background: '#1a0d38', border: '1px solid #2d1f5e' }}>
            <div className="text-xs font-bold" style={{ color: '#a78bfa' }}>{s}</div>
          </div>
        ))}
      </div>

      {/* Pillars */}
      <div className="mt-4 flex gap-2 flex-wrap justify-center">
        {['IAM / KMS', 'CloudWatch / X-Ray', 'SNS / SQS', 'VPC Private Subnets', 'CloudTrail'].map(s => (
          <span key={s} className="text-xs px-2 py-1 rounded" style={{ background: '#21262d', color: '#8b949e' }}>{s}</span>
        ))}
      </div>
    </div>
  );
}
