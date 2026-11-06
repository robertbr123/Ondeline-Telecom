type P = { size?: number; className?: string }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
})

export const Arrow = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={2.2} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Check = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={2.4} className={className}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
export const Headset = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1v-6h3zM3 19a2 2 0 002 2h1v-6H3z" /></svg>
)
export const Wifi = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12.55a11 11 0 0114 0M8.5 16.05a6 6 0 017 0M2 8.82a15 15 0 0120 0" /><circle cx="12" cy="20" r="1" /></svg>
)
export const Tv = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}><rect x="2" y="5" width="20" height="13" rx="2" /><path d="M8 21h8" /></svg>
)
export const Menu = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const Close = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const Phone = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" /></svg>
)
