'use client';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppData, HalalStatus, Feature } from '@/types';
import { filterRestaurants, sortRestaurants } from '@/lib/data';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { GridSkeleton } from '@/components/ui/Skeleton';

type SortOption = 'rating' | 'reviews' | 'featured' | 'newest';

export default function ExploreClient() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [halalStatus, setHalalStatus] = useState<HalalStatus[]>(
    searchParams.get('halalStatus') ? [searchParams.get('halalStatus') as HalalStatus] : []
  );
  const [features, setFeatures] = useState<Feature[]>(
    searchParams.get('features') ? [searchParams.get('features') as Feature] : []
  );
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'rating');

  useEffect(() => {
    fetch('/api/data')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const f = filterRestaurants(data.restaurants, { search, city, halalStatus, features, minRating });
    return sortRestaurants(f, sort);
  }, [data, search, city, halalStatus, features, minRating, sort]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const toggleFeature = (f: Feature) => {
    setFeatures((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
    setPage(1);
  };

  const toggleStatus = (s: HalalStatus) => {
    setHalalStatus((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    setPage(1);
  };

  const clearAll = () => {
    setSearch(''); setCity(''); setHalalStatus([]); setFeatures([]); setMinRating(0); setPage(1);
  };

  const allFeatures: { key: Feature; label: string; icon: string }[] = [
    { key: 'prayer_space', label: 'Bönerum', icon: '🕌' },
    { key: 'wudu', label: 'Wudu', icon: '💧' },
    { key: 'family_seating', label: 'Familjesittning', icon: '👨‍👩‍👧' },
    { key: 'delivery', label: 'Hemleverans', icon: '🛵' },
    { key: 'takeaway', label: 'Take away', icon: '🥡' },
    { key: 'wheelchair', label: 'Rullstolsanpassat', icon: '♿' },
    { key: 'vegetarian', label: 'Vegetariskt', icon: '🌱' },
    { key: 'vegan', label: 'Veganskt', icon: '🌿' },
  ];

  const halalStatuses: { key: HalalStatus; label: string }[] = [
    { key: 'certified', label: 'Halalcertifierat' },
    { key: 'claimed', label: 'Halal (eget påstående)' },
    { key: 'pork_free', label: 'Fläskfritt' },
    { key: 'alcohol_free', label: 'Alkoholfritt' },
  ];

  const FilterPanel = () => (
    <div className="space-y-6">
      {data && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Stad</h3>
          <select
            value={city}
            onChange={(e) => { setCity(e.target.value); setPage(1); }}
            className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-green-500"
          >
            <option value="">Alla städer</option>
            {data.cities.map((c) => (
              <option key={c.city} value={c.city}>{c.city}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Halalstatus</h3>
        <div className="space-y-2">
          {halalStatuses.map((s) => (
            <label key={s.key} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={halalStatus.includes(s.key)} onChange={() => toggleStatus(s.key)}
                className="w-4 h-4 rounded accent-green-600" />
              <span className="text-sm text-[var(--text-secondary)]">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Faciliteter</h3>
        <div className="flex flex-wrap gap-2">
          {allFeatures.map((f) => (
            <button key={f.key} onClick={() => toggleFeature(f.key)}
              className={`glass-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${features.includes(f.key) ? 'active' : ''}`}>
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
          Minsta betyg: {minRating > 0 ? `${minRating}+` : 'Alla'}
        </h3>
        <input type="range" min={0} max={4} step={0.5} value={minRating}
          onChange={(e) => { setMinRating(parseFloat(e.target.value)); setPage(1); }}
          className="w-full accent-green-600" />
        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
          <span>Alla</span><span>2.0</span><span>3.0</span><span>4.0</span>
        </div>
      </div>

      <button onClick={clearAll} className="w-full text-sm text-[var(--text-muted)] hover:text-red-400 transition-colors py-2">
        Rensa alla filter
      </button>
    </div>
  );

  const activeFilterCount = halalStatus.length + features.length + (minRating > 0 ? 1 : 0) + (city ? 1 : 0);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-16 z-40 glass border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-3 py-2">
            <svg className="w-4 h-4 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Sök restauranger..."
              className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}
            className="hidden sm:block bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-3 py-2 text-sm text-[var(--text-secondary)] outline-none">
            <option value="rating">Bäst betyg</option>
            <option value="reviews">Mest recenserade</option>
            <option value="featured">Utvalda först</option>
            <option value="newest">Nyaste</option>
          </select>

          <button onClick={() => setFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 glass-pill px-3 py-2 rounded-xl text-sm font-medium text-[var(--text-secondary)] border border-[var(--glass-border)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="glass rounded-2xl p-5 sticky top-36">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Filter</h2>
            <FilterPanel />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--text-muted)] mb-4">
            {loading ? 'Laddar...' : `${filtered.length} restaurang${filtered.length !== 1 ? 'er' : ''} hittade`}
          </p>

          {loading ? (
            <GridSkeleton count={6} />
          ) : filtered.length === 0 ? (
            <div className="glass rounded-2xl p-16 text-center">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-2">Inga restauranger hittades</h3>
              <p className="text-[var(--text-muted)] mb-4">Prova att justera dina filter eller sökord.</p>
              <button onClick={clearAll} className="text-green-600 hover:text-green-700 font-medium text-sm">Rensa alla filter</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
              </div>
              {hasMore && (
                <div className="mt-8 text-center">
                  <button onClick={() => setPage((p) => p + 1)}
                    className="px-8 py-3 glass-pill rounded-full border border-[var(--glass-border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
                    Ladda fler ({filtered.length - paginated.length} kvar)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className="relative ml-auto w-80 max-w-[90vw] h-full glass-strong border-l border-[var(--glass-border)] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-[var(--text-primary)]">Filter</h2>
                <button onClick={() => setFilterOpen(false)} className="text-[var(--text-muted)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterPanel />
              <button onClick={() => setFilterOpen(false)}
                className="mt-6 w-full py-3 rounded-xl bg-green-600 text-white font-medium text-sm">
                Visa {filtered.length} resultat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}