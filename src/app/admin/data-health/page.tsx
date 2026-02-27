import Link from 'next/link';
import { fetchAppData } from '@/lib/data';

export const revalidate = 60;

export default async function DataHealthPage() {
  let data;
  let error = false;
  try {
    data = await fetchAppData();
  } catch {
    error = true;
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="glass rounded-2xl p-8 text-center border border-red-500/30">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-2">Data fetch failed</h2>
          <p className="text-[var(--text-muted)]">Could not connect to the data source. Check your Google Sheets configuration.</p>
        </div>
      </div>
    );
  }

  const { restaurants, cities, siteSettings, filtersConfig } = data;

  const activeRestaurants = restaurants.filter((r) => r.isActive);
  const inactiveRestaurants = restaurants.filter((r) => !r.isActive);
  const missingImages = activeRestaurants.filter((r) => !r.coverImageUrl);
  const missingSlug = activeRestaurants.filter((r) => !r.slug);
  const noRating = activeRestaurants.filter((r) => r.rating === 0);
  const unknownHalal = activeRestaurants.filter((r) => r.halalStatus === 'unknown');
  const featured = activeRestaurants.filter((r) => r.isFeatured);

  const checks = [
    { label: 'Total restaurants', value: restaurants.length, status: 'info' },
    { label: 'Active listings', value: activeRestaurants.length, status: 'ok' },
    { label: 'Inactive / hidden', value: inactiveRestaurants.length, status: inactiveRestaurants.length > 0 ? 'warn' : 'ok' },
    { label: 'Missing cover image', value: missingImages.length, status: missingImages.length > 0 ? 'warn' : 'ok' },
    { label: 'Missing slug (broken links!)', value: missingSlug.length, status: missingSlug.length > 0 ? 'error' : 'ok' },
    { label: 'No rating set', value: noRating.length, status: noRating.length > 5 ? 'warn' : 'ok' },
    { label: 'Unknown halal status', value: unknownHalal.length, status: unknownHalal.length > 0 ? 'warn' : 'ok' },
    { label: 'Featured restaurants', value: featured.length, status: featured.length === 0 ? 'warn' : 'ok' },
    { label: 'Cities', value: cities.length, status: 'info' },
    { label: 'Active filters', value: filtersConfig.filter((f) => f.enabled).length, status: 'info' },
  ];

  const statusStyles = {
    ok: 'text-halal-600 dark:text-halal-400',
    warn: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-[var(--text-secondary)]',
  };

  const statusIcons = { ok: '✓', warn: '⚠', error: '✗', info: 'ℹ' };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-[var(--text-muted)] hover:text-halal-500 mb-2 inline-block">← Back to Admin</Link>
          <h1 className="font-display font-bold text-3xl text-[var(--text-primary)]">Data Health Check</h1>
          <p className="text-[var(--text-secondary)] mt-1">Live diagnostics from your Google Sheets data</p>
        </div>
        <div className="glass px-3 py-1.5 rounded-full text-xs text-[var(--text-muted)]">
          Refreshes every 60s
        </div>
      </div>

      {/* Summary */}
      <div className="glass rounded-2xl divide-y divide-[var(--glass-border)] mb-6">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-[var(--text-secondary)]">{check.label}</span>
            <div className={`flex items-center gap-2 text-sm font-medium ${statusStyles[check.status as keyof typeof statusStyles]}`}>
              <span>{statusIcons[check.status as keyof typeof statusIcons]}</span>
              <span>{check.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Site settings preview */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold text-[var(--text-primary)] mb-3">Site Settings Preview</h2>
        <div className="space-y-2 text-sm">
          {Object.entries(siteSettings).map(([key, value]) => (
            <div key={key} className="flex gap-3">
              <span className="font-mono text-[var(--text-muted)] w-40 shrink-0">{key}</span>
              <span className="text-[var(--text-secondary)] truncate">{value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing slug list */}
      {missingSlug.length > 0 && (
        <div className="glass rounded-2xl p-5 mt-5 border border-red-500/30">
          <h2 className="font-semibold text-red-500 mb-2">⚠️ Restaurants with missing slugs</h2>
          <p className="text-xs text-[var(--text-muted)] mb-3">These restaurants cannot be linked to. Add a slug in the sheet.</p>
          <div className="space-y-1">
            {missingSlug.map((r) => (
              <div key={r.id} className="text-sm text-[var(--text-secondary)] font-mono">
                ID {r.id}: {r.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
