export function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="h-48 skeleton" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-14 rounded-full" />
        </div>
        <div className="skeleton h-4 w-full rounded mt-2" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
