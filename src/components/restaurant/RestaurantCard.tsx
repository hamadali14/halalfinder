import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/types';
import HalalBadge from '@/components/ui/HalalBadge';
import PriceLevel from '@/components/ui/PriceLevel';
import FeatureIcons from '@/components/ui/FeatureIcons';
import StarRating from '@/components/ui/StarRating';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant: r }: Props) {
  return (
    <Link href={`/restaurants/${r.slug}`} className="block group">
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-[var(--bg-secondary)]">
          {r.coverImageUrl ? (
            <img
              src={r.coverImageUrl}
              alt={r.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
              <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {/* Halal badge overlay */}
          <div className="absolute top-3 left-3">
            <HalalBadge status={r.halalStatus} />
          </div>
          {/* Featured tag */}
          {r.isFeatured && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-accent-gold/90 text-white backdrop-blur-sm">
              ✦ Featured
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] leading-tight group-hover:text-halal-600 dark:group-hover:text-halal-400 transition-colors">
              {r.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5 text-sm text-[var(--text-muted)]">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{r.city}</span>
            </div>
          </div>

          {/* Cuisine tags */}
          {r.cuisines.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {r.cuisines.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)]"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-2 border-t border-[var(--glass-border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarRating rating={r.rating} />
              {r.reviewCount > 0 && (
                <span className="text-xs text-[var(--text-muted)]">({r.reviewCount})</span>
              )}
            </div>
            <PriceLevel level={r.priceLevel} />
          </div>

          {/* Feature icons */}
          <FeatureIcons features={r.features} />
        </div>
      </div>
    </Link>
  );
}
