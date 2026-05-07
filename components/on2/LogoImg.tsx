"use client"

import { useEffect, useState } from "react"

interface LogoImgProps {
  height?: number
  style?: React.CSSProperties
  filterInvert?: boolean
}

export function LogoImg({ height = 36, style, filterInvert = false }: LogoImgProps) {
  const [src, setSrc] = useState("/logo-ondeline.png")

  useEffect(() => {
    fetch("/api/site/config")
      .then((r) => r.json())
      .then((d) => { if (d.data?.logoUrl) setSrc(d.data.logoUrl) })
      .catch(() => {})
  }, [])

  return (
    <img
      src={src}
      alt="Ondeline"
      style={{ height, width: "auto", ...(filterInvert ? { filter: "brightness(0) invert(1)" } : {}), ...style }}
    />
  )
}
