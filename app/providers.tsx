"use client"

import { SiteConfigProvider } from "@/lib/site-config-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SiteConfigProvider>
      {children}
    </SiteConfigProvider>
  )
}
