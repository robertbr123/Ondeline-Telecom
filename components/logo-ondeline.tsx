import Image from "next/image"

export function LogoOndeline({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/logo-ondeline.png"
      alt="Ondeline Logo"
      width={size}
      height={size}
      className="object-contain"
      priority
    />
  )
}
