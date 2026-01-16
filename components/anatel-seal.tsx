import Image from "next/image"

export function AnatelSeal() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
        <Image
          src="/anatel.jpg"
          alt="Selo ANATEL"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-xs text-center text-muted-foreground">Certificado ANATEL SCM</p>
    </div>
  )
}
