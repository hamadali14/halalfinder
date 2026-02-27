import { Feature } from '@/types';

const featureConfig: Record<Feature, { icon: string; label: string }> = {
  prayer_space: { icon: '🕌', label: 'Prayer Space' },
  wudu: { icon: '💧', label: 'Wudu Facility' },
  family_seating: { icon: '👨‍👩‍👧', label: 'Family Seating' },
  delivery: { icon: '🛵', label: 'Delivery' },
  takeaway: { icon: '🥡', label: 'Takeaway' },
  wheelchair: { icon: '♿', label: 'Wheelchair Access' },
  vegetarian: { icon: '🌱', label: 'Vegetarian' },
  vegan: { icon: '🌿', label: 'Vegan' },
};

interface Props {
  features: Feature[];
  showLabels?: boolean;
}

export default function FeatureIcons({ features, showLabels = false }: Props) {
  if (!features.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {features.map((f) => {
        const cfg = featureConfig[f];
        if (!cfg) return null;
        return (
          <span
            key={f}
            title={cfg.label}
            className={`flex items-center gap-1 text-xs text-[var(--text-muted)] ${showLabels ? 'bg-[var(--glass-bg)] border border-[var(--glass-border)] px-2 py-0.5 rounded-full' : ''}`}
          >
            <span>{cfg.icon}</span>
            {showLabels && <span>{cfg.label}</span>}
            {!showLabels && <span className="sr-only">{cfg.label}</span>}
          </span>
        );
      })}
    </div>
  );
}
