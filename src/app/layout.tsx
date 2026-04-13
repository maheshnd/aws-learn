import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AWS Master Notes — Interactive Learning App',
  description: 'AWS learning app — 20 topics, 50+ Q&As, 4 learning modes. Zero to Senior Architect.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
