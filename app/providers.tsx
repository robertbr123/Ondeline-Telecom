"use client"

import { Toaster } from "sonner"
import { SiteConfigProvider } from "@/lib/site-config-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SiteConfigProvider>
      {children}
      <Toaster position="top-right" richColors />
    </SiteConfigProvider>
  )
}
