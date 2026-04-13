'use client';

function Card({ title, items, color, bg, border }: { title: string; items: string[]; color: string; bg: string; border: string }) {
  return (
    <div className="flex-1 rounded-xl p-4 min-w-[160px]" style={{ background: bg, border: `1px solid ${border}` }}>
      <div className="font-bold text-sm mb-2" style={{ color }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} className="text-xs py-0.5" style={{ color: '#8b949e' }}>{item}</div>
      ))}
    </div>
  );
}

export function CloudDiagram() {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Cloud Service Models</p>
      <div className="flex gap-3 flex-wrap">
        <Card title="IaaS" items={['EC2', 'EBS', 'VPC', 'You manage OS+']} color="#FF9900" bg="#2d1b00" border="#5a3800" />
        <Card title="PaaS" items={['Elastic Beanstalk', 'RDS', 'Lambda', 'You manage code']} color="#4A9EFF" bg="#0d1f38" border="#1a3a5c" />
        <Card title="SaaS" items={['Gmail', 'Salesforce', 'Workday', 'AWS manages all']} color="#3fb950" bg="#0d2820" border="#1a4a3a" />
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        {['On-demand', 'Pay-as-you-go', 'Scale in seconds', 'Global reach', 'No upfront cost'].map(t => (
          <span key={t} className="text-xs px-2 py-1 rounded-full" style={{ background: '#21262d', color: '#8b949e' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
