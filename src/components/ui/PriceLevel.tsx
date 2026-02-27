interface Props {
  level: number;
}

export default function PriceLevel({ level }: Props) {
  return (
    <div className="flex gap-0.5" title={`Price: ${level} of 4`}>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={`text-sm ${i <= level ? 'text-accent-gold' : 'text-[var(--text-muted)] opacity-30'}`}>
          £
        </span>
      ))}
    </div>
  );
}
