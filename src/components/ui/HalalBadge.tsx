import { HalalStatus } from '@/types';

const config: Record<HalalStatus, { label: string; icon: string; }> = {
  certified: { label: 'Halal Certified', icon: '✓' },
  claimed: { label: 'Halal Claimed', icon: '~' },
  pork_free: { label: 'Pork-Free', icon: '🚫' },
  alcohol_free: { label: 'Alcohol-Free', icon: '🍃' },
  unknown: { label: 'Status Unknown', icon: '?' },
};

interface Props {
  status: HalalStatus;
  showLabel?: boolean;
}

export default function HalalBadge({ status, showLabel = false }: Props) {
  const cfg = config[status] || config.unknown;
  return (
    <span className={`badge-${status} inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm`}>
      <span>{cfg.icon}</span>
      {showLabel && <span>{cfg.label}</span>}
      {!showLabel && <span className="sr-only">{cfg.label}</span>}
    </span>
  );
}

export function HalalBadgeFull({ status }: { status: HalalStatus }) {
  return <HalalBadge status={status} showLabel />;
}
