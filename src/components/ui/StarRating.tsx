interface Props {
  rating: number;
  size?: 'sm' | 'md';
}

export default function StarRating({ rating, size = 'sm' }: Props) {
  const pct = Math.round(rating * 10) / 10;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${
              i <= Math.round(rating)
                ? 'text-accent-gold fill-current'
                : 'text-[var(--text-muted)] fill-current opacity-30'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className={`${textSize} font-medium text-[var(--text-secondary)]`}>{pct > 0 ? pct.toFixed(1) : '—'}</span>
    </div>
  );
}
