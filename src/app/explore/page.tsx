import { Suspense } from 'react';
import ExploreClient from './ExploreClient';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--text-muted)]">Laddar...</div>}>
      <ExploreClient />
    </Suspense>
  );
}