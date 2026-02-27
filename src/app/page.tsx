import Link from 'next/link';
import { fetchAppData } from '@/lib/data';
import RestaurantCard from '@/components/restaurant/RestaurantCard';

export const revalidate = 0;

export default async function Home() {
  const data = await fetchAppData();
  const { siteSettings, restaurants, cities, filtersConfig } = data;

  // Debug: log all restaurants and their isFeatured value
  console.log('All restaurants:', restaurants.map(r => ({ name: r.name, isFeatured: r.isFeatured, isActive: r.isActive })));

  const featured = restaurants.filter((r) => r.isFeatured && r.isActive).slice(0, 6);
  const popularCities = cities.filter((c) => c.isPopular);
  const activeFilters = filtersConfig.filter((f) => f.enabled).sort((a, b) => a.sortOrder - b.sortOrder);

  console.log('Featured restaurants:', featured.length);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-24 left-[8%] w-80 h-80 bg-green-300/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-24 right-[8%] w-96 h-96 bg-amber-200/12 rounded-full blur-3xl animate-float delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-100/8 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-green-600/20 text-green-700 dark:text-green-400 text-sm font-medium mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Gemenskapsgranskat halalregister
          </div>

          <h1 className="animate-fade-up delay-100 font-display font-bold text-5xl sm:text-6xl md:text-7xl text-[var(--text-primary)] leading-[1.08] mb-5">
            {siteSettings.heroTitle}
          </h1>
          <p className="animate-fade-up delay-200 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            {siteSettings.heroSubtitle}
          </p>

          {/* Search bar */}
          <div className="animate-fade-up delay-300 glass-strong rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto" style={{boxShadow:'0 20px 60px rgba(80,50,20,0.12), inset 0 1px 0 rgba(255,255,255,0.8)'}}>
            <div className="flex-1 flex items-center gap-2.5 px-4">
              <svg className="w-4 h-4 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="search" placeholder="Sök restaurang eller kök..." className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none text-sm py-2.5" />
            </div>
            <div className="w-px bg-[var(--glass-border)] hidden sm:block" />
            <div className="flex items-center gap-2 px-4 sm:min-w-[150px]">
              <svg className="w-4 h-4 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <select className="flex-1 bg-transparent text-[var(--text-secondary)] outline-none text-sm py-2.5">
                <option value="">Alla städer</option>
                {cities.map((c) => <option key={c.city} value={c.city}>{c.city}</option>)}
              </select>
            </div>
            <Link href="/explore" className="px-7 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-all duration-200 whitespace-nowrap" style={{boxShadow:'0 4px 16px rgba(45,122,79,0.35)'}}>
              Sök
            </Link>
          </div>

          {/* Filter chips */}
          <div className="animate-fade-up delay-400 flex flex-wrap gap-2 justify-center mt-6">
            {activeFilters.map((f) => (
              <Link key={f.key} href={`/explore?features=${f.options[0]}`}
                className="glass-pill px-4 py-2 rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer border">
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      {featured.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)]">
                {siteSettings.featuredSectionTitle}
              </h2>
              <p className="text-[var(--text-secondary)] mt-1.5">Handplockade av vårt community</p>
            </div>
            <Link href="/explore?sort=featured" className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium transition-colors">
              Visa alla →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        </section>
      )}

      {/* ===== STÄDER ===== */}
      {popularCities.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)]">Populära städer</h2>
            <p className="text-[var(--text-secondary)] mt-1.5">Utforska halalmatskedar efter ort</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularCities.map((city) => {
              const count = restaurants.filter((r) => r.city === city.city && r.isActive).length;
              return (
                <Link key={city.city} href={`/explore?city=${encodeURIComponent(city.city)}`}
                  className="glass-card rounded-2xl p-5 text-center cursor-pointer group">
                  <div className="text-3xl mb-2">🏙️</div>
                  <div className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{city.city}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{count} restaurang{count !== 1 ? 'er' : ''}</div>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 text-center">
            <Link href="/cities" className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium">Visa alla städer →</Link>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-60 rounded-3xl" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🕌</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-3">
              Är du restaurangägare?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
              Vill du att din halalrestaurang ska synas här? Skicka in en ansökan så granskar vi och lägger till dig i registret.
            </p>
            <a href="/ansokan" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200" style={{boxShadow:'0 4px 16px rgba(45,122,79,0.35)'}}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ansök om att listas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}