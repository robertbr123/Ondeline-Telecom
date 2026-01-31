import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="w-full p-6 rounded-xl border border-border bg-card/50 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="h-3 bg-muted rounded w-full"></div>
      </div>
    </div>
  )
}

export function LoadingTable() {
  return (
    <div className="w-full space-y-3 animate-pulse">
      <div className="h-10 bg-muted rounded"></div>
      <div className="h-16 bg-muted/50 rounded"></div>
      <div className="h-16 bg-muted/50 rounded"></div>
      <div className="h-16 bg-muted/50 rounded"></div>
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="lg" text="Carregando..." />
    </div>
  )
}
