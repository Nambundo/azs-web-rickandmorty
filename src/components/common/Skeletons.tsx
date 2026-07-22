export function CardSkeleton() {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="aspect-[3/4] bg-white/10" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
