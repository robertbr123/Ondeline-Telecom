export function SkeletonBlog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-border bg-card/50 overflow-hidden">
          <div className="h-48 bg-muted animate-pulse" />
          <div className="p-6">
            <div className="h-6 bg-muted animate-pulse rounded mb-3 w-2/3" />
            <div className="h-4 bg-muted animate-pulse rounded mb-4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}