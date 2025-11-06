export function LogoOndeline() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" className="text-primary" />
          <stop offset="100%" stopColor="currentColor" className="text-secondary" />
        </linearGradient>
      </defs>

      <circle cx="20" cy="20" r="18" stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.3" />

      <path
        d="M 10 20 Q 15 15, 20 20 T 30 20"
        stroke="url(#waveGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 8 26 Q 13 21, 18 26 T 32 26"
        stroke="url(#waveGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 12 14 Q 17 9, 22 14 T 32 14"
        stroke="url(#waveGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
