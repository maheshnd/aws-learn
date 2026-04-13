'use client';

const LAYERS = [
  { label: 'AWS Shield + WAF', desc: 'DDoS protection, SQL/XSS filtering', color: '#f85149', bg: '#2d0d0d', border: '#5a1a1a' },
  { label: 'CloudFront + API GW', desc: 'Edge filtering, rate limiting', color: '#FF9900', bg: '#2d1b00', border: '#5a3800' },
  { label: 'VPC + SG + NACL', desc: 'Network isolation, traffic rules', color: '#4A9EFF', bg: '#0d1f38', border: '#1a3a5c' },
  { label: 'IAM + SCP', desc: 'Least privilege, org policies', color: '#3fb950', bg: '#0d2820', border: '#1a4a3a' },
  { label: 'KMS + Secrets Manager', desc: 'Encryption at rest, secret rotation', color: '#a78bfa', bg: '#1a0d38', border: '#2d1f5e' },
  { label: 'GuardDuty + Inspector', desc: 'Threat detection, vulnerability scanning', color: '#f59e0b', bg: '#2d1b00', border: '#5a3800' },
];

export function SecurityDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Defense in Depth — Security Layers</p>
      <div className="space-y-2">
        {LAYERS.map((layer, i) => (
          <div
            key={layer.label}
            className="rounded-lg px-4 py-2.5 flex items-center justify-between"
            style={{ background: layer.bg, border: `1px solid ${layer.border}`, marginLeft: `${i * 4}px` }}
          >
            <div>
              <span className="text-xs font-bold" style={{ color: layer.color }}>{layer.label}</span>
              <span className="text-xs ml-3" style={{ color: '#8b949e' }}>{layer.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
