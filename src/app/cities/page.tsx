import Link from 'next/link';
import { fetchAppData } from '@/lib/data';

export const revalidate = 300;

export default async function CitiesPage() {
  const data = await fetchAppData();
  const { cities, restaurants } = data;

  const citiesWithCounts = cities.map((c) => ({
    ...c,
    count: restaurants.filter((r) => r.city === c.city && r.isActive).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-halal-500/30 text-halal-500 text-xs font-medium mb-4">
          🗺️ Browse by Location
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)]">Cities</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Explore halal restaurants in {citiesWithCounts.length} cities across the UK.
        </p>
      </div>

      {/* Popular cities */}
      {citiesWithCounts.some((c) => c.isPopular) && (
        <div className="mb-10">
          <h2 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-4">Popular Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {citiesWithCounts
              .filter((c) => c.isPopular)
              .map((city) => (
                <Link
                  key={city.city}
                  href={`/explore?city=${encodeURIComponent(city.city)}`}
                  className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer group"
                >
                  <div className="text-4xl mb-3">🏙️</div>
                  <div className="font-semibold text-[var(--text-primary)] group-hover:text-halal-500 transition-colors">
                    {city.city}
                  </div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">
                    {city.count} listing{city.count !== 1 ? 's' : ''}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* All cities */}
      <div>
        <h2 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-4">All Cities</h2>
        <div className="glass rounded-2xl divide-y divide-[var(--glass-border)]">
          {citiesWithCounts.map((city) => (
            <Link
              key={city.city}
              href={`/explore?city=${encodeURIComponent(city.city)}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-[var(--glass-bg)] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] group-hover:text-halal-500 transition-colors">
                    {city.city}
                  </div>
                  {city.country && (
                    <div className="text-xs text-[var(--text-muted)]">{city.country}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--text-muted)]">
                  {city.count} restaurant{city.count !== 1 ? 's' : ''}
                </span>
                <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-halal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
