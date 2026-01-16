"use client"

import Image from "next/image"
import { useSiteConfig } from "@/lib/site-config-context"

export function LogoOndeline({ size = 40 }: { size?: number }) {
  const { config } = useSiteConfig()
  
  return (
    <Image
      src={config.logoUrl || "/logo-ondeline.png"}
      alt="Ondeline Logo"
      width={size}
      height={size}
      className="object-contain"
      priority
    />
  )
}
