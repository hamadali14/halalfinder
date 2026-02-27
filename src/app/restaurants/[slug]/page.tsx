import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAppData } from '@/lib/data';
import { HalalBadgeFull } from '@/components/ui/HalalBadge';
import FeatureIcons from '@/components/ui/FeatureIcons';
import StarRating from '@/components/ui/StarRating';
import PriceLevel from '@/components/ui/PriceLevel';

export const revalidate = 300;

export async function generateStaticParams() {
  const data = await fetchAppData();
  return data.restaurants.map((r) => ({ slug: r.slug }));
}

export default async function RestaurantDetailPage({ params }: { params: { slug: string } }) {
  const data = await fetchAppData();
  const restaurant = data.restaurants.find((r) => r.slug === params.slug);

  if (!restaurant || !restaurant.isActive) notFound();

  const r = restaurant;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--text-muted)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-halal-500">Home</Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-halal-500">Explore</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">{r.name}</span>
      </nav>

      {/* Cover image */}
      <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden mb-8 glass-card">
        {r.coverImageUrl ? (
          <img src={r.coverImageUrl} alt={r.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-muted)]">
            <span className="text-6xl opacity-30">🍽️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white drop-shadow-lg">{r.name}</h1>
              <div className="flex items-center gap-2 mt-1 text-white/80 text-sm">
                <span>📍 {r.city}</span>
                {r.cuisines.length > 0 && (
                  <span>• {r.cuisines.join(', ')}</span>
                )}
              </div>
            </div>
            <HalalBadgeFull status={r.halalStatus} />
          </div>
        </div>
      </div>

      {/* Gallery thumbnails */}
      {r.galleryImageUrls.length > 0 && (
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {r.galleryImageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${r.name} gallery ${i + 1}`}
              className="w-28 h-20 sm:w-36 sm:h-24 object-cover rounded-xl shrink-0 glass-card"
            />
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick stats */}
          <div className="glass rounded-2xl p-5 flex flex-wrap gap-6">
            <div>
              <StarRating rating={r.rating} size="md" />
              <p className="text-xs text-[var(--text-muted)] mt-1">{r.reviewCount} reviews</p>
            </div>
            <div>
              <PriceLevel level={r.priceLevel} />
              <p className="text-xs text-[var(--text-muted)] mt-1">Price range</p>
            </div>
            {r.certificationBody && (
              <div>
                <span className="text-sm font-semibold text-halal-600 dark:text-halal-400">{r.certificationBody}</span>
                <p className="text-xs text-[var(--text-muted)] mt-1">Certified by</p>
              </div>
            )}
          </div>

          {/* Features */}
          {r.features.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-3">Features & Amenities</h2>
              <FeatureIcons features={r.features} showLabels />
            </div>
          )}

          {/* Opening hours */}
          {r.openingHours && (
            <div className="glass rounded-2xl p-5">
              <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-3">Opening Hours</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{r.openingHours}</p>
            </div>
          )}

          {/* Map */}
          {r.lat && r.lng && (
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-[var(--glass-border)]">
                <h2 className="font-display font-semibold text-lg text-[var(--text-primary)]">Location</h2>
              </div>
              <iframe
                title={`Map for ${r.name}`}
                src={`https://maps.google.com/maps?q=${r.lat},${r.lng}&z=15&output=embed`}
                className="w-full h-64"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)]">Contact & Info</h2>

            <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <span className="shrink-0">📍</span>
              <span>{r.address}</span>
            </div>

            {r.phone && (
              <a href={`tel:${r.phone}`} className="flex items-center gap-2 text-sm text-halal-500 hover:text-halal-600">
                <span>📞</span>
                <span>{r.phone}</span>
              </a>
            )}

            {r.website && (
              <a
                href={r.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-halal-500 hover:text-halal-600 truncate"
              >
                <span>🌐</span>
                <span className="truncate">{r.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
          </div>

          {/* Halal info */}
          <div className="glass rounded-2xl p-5">
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-3">Halal Status</h2>
            <HalalBadgeFull status={r.halalStatus} />
            {r.certificationBody && (
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Certified by <strong>{r.certificationBody}</strong>
              </p>
            )}
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Always verify halal status directly with the restaurant before dining.
            </p>
          </div>

          {/* Report */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-medium text-sm text-[var(--text-primary)] mb-2">Something incorrect?</h3>
            <a
              href={`mailto:hello@halalfinder.com?subject=Report: ${encodeURIComponent(r.name)}&body=Please describe the issue with ${r.name}...`}
              className="text-sm text-[var(--text-muted)] hover:text-red-400 transition-colors"
            >
              Report an update →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
