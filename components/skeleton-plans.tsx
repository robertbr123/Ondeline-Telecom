export function SkeletonPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 rounded-xl border border-border bg-card/50">
          <div className="h-8 bg-muted animate-pulse rounded mb-4 w-3/4" />
          <div className="h-4 bg-muted animate-pulse rounded mb-6" />
          <div className="h-10 bg-muted animate-pulse rounded mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="h-4 bg-muted animate-pulse rounded" />
            ))}
          </div>
          <div className="h-12 bg-muted animate-pulse rounded mt-6" />
        </div>
      ))}
    </div>
  )
}