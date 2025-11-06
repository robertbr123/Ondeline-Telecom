export function AnatelSeal() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16"
      >
        <defs>
          <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>

        <circle cx="40" cy="40" r="38" fill="url(#sealGradient)" />
        <circle cx="40" cy="40" r="35" fill="#0F172A" />

        <text x="40" y="35" textAnchor="middle" className="text-white font-bold text-xs" fill="#3B82F6">
          ANATEL
        </text>
        <text x="40" y="50" textAnchor="middle" className="text-white font-bold text-xs" fill="#3B82F6">
          SCM
        </text>

        <circle cx="40" cy="40" r="32" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
      </svg>
      <p className="text-xs text-center text-muted-foreground">Certificado ANATEL SCM</p>
    </div>
  )
}
