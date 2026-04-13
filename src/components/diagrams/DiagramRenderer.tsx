'use client';
import { lazy, Suspense } from 'react';

const diagrams: Record<number, React.LazyExoticComponent<() => JSX.Element>> = {
  1: lazy(() => import('./CloudDiagram').then(m => ({ default: m.CloudDiagram }))),
  2: lazy(() => import('./IamDiagram').then(m => ({ default: m.IamDiagram }))),
  3: lazy(() => import('./Ec2Diagram').then(m => ({ default: m.Ec2Diagram }))),
  4: lazy(() => import('./StorageDiagram').then(m => ({ default: m.StorageDiagram }))),
  5: lazy(() => import('./AsgAlbDiagram').then(m => ({ default: m.AsgAlbDiagram }))),
  6: lazy(() => import('./S3TiersDiagram').then(m => ({ default: m.S3TiersDiagram }))),
  7: lazy(() => import('./DatabasesDiagram').then(m => ({ default: m.DatabasesDiagram }))),
  8: lazy(() => import('./VpcDiagram').then(m => ({ default: m.VpcDiagram }))),
  9: lazy(() => import('./Route53Diagram').then(m => ({ default: m.Route53Diagram }))),
  10: lazy(() => import('./CloudFrontDiagram').then(m => ({ default: m.CloudFrontDiagram }))),
  11: lazy(() => import('./MessagingDiagram').then(m => ({ default: m.MessagingDiagram }))),
  12: lazy(() => import('./LambdaDiagram').then(m => ({ default: m.LambdaDiagram }))),
  13: lazy(() => import('./ContainersDiagram').then(m => ({ default: m.ContainersDiagram }))),
  14: lazy(() => import('./ApiGatewayDiagram').then(m => ({ default: m.ApiGatewayDiagram }))),
  15: lazy(() => import('./ObservabilityDiagram').then(m => ({ default: m.ObservabilityDiagram }))),
  16: lazy(() => import('./SecurityDiagram').then(m => ({ default: m.SecurityDiagram }))),
  17: lazy(() => import('./CostDiagram').then(m => ({ default: m.CostDiagram }))),
  20: lazy(() => import('./FullArchDiagram').then(m => ({ default: m.FullArchDiagram }))),
};

interface Props {
  topicNumber: number;
}

export function DiagramRenderer({ topicNumber }: Props) {
  const DiagramComponent = diagrams[topicNumber];
  if (!DiagramComponent) return null;

  return (
    <Suspense fallback={<div className="h-32 rounded-xl mb-6 animate-pulse" style={{ background: 'var(--bg-card)' }} />}>
      <div className="mb-6">
        <DiagramComponent />
      </div>
    </Suspense>
  );
}
