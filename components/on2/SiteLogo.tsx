import Image from "next/image"
import { getSiteConfig } from "@/lib/site-config"

interface SiteLogoProps {
  height?: number
  width?: number
  style?: React.CSSProperties
  className?: string
}

export async function SiteLogo({ height = 36, width = 140, style, className }: SiteLogoProps) {
  const config = await getSiteConfig()
  const src = config.logoUrl || "/logo-ondeline.png"
  return (
    <Image
      src={src}
      alt="Ondeline"
      width={width}
      height={height}
      style={{ height, width: "auto", ...style }}
      className={className}
    />
  )
}
