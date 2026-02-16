export function SkeletonFAQ() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border border-border rounded-lg p-6 bg-card/50">
          <div className="h-6 bg-muted animate-pulse rounded mb-4 w-3/4" />
          <div className="h-4 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
      ))}
    </div>
  )
}