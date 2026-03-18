"use client"

import Image from "next/image"
import { useSiteConfig } from "@/lib/site-config-context"

function resolveLogoUrl(url: string): string {
  if (!url) return "/logo-ondeline.png"
  // Convert old /uploads/ paths to /api/uploads/ for standalone mode compatibility
  if (url.startsWith("/uploads/")) {
    return url.replace("/uploads/", "/api/uploads/")
  }
  return url
}

export function LogoOndeline({ size = 40 }: { size?: number }) {
  const { config } = useSiteConfig()

  return (
    <Image
      src={resolveLogoUrl(config.logoUrl)}
      alt="Ondeline Logo"
      width={size}
      height={size}
      className="object-contain"
      priority
    />
  )
}
