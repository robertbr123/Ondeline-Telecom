'use client'

import React, { useEffect, useState } from 'react'

interface MotionCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export function MotionCard({ children, className = '', delay = 0 }: MotionCardProps) {
  const mounted = useIsMounted()

  return (
    <div
      className={className}
      style={mounted ? {
        animation: `fadeInUp ${0.5}s ease ${delay}s both`,
      } : { opacity: 0 }}
    >
      {children}
    </div>
  )
}

export function MotionButton({ children, className = '', ...props }: any) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

export function FadeIn({ children, className = '', delay = 0 }: MotionCardProps) {
  const mounted = useIsMounted()

  return (
    <div
      className={className}
      style={mounted ? {
        animation: `fadeIn ${0.6}s ease ${delay}s both`,
      } : { opacity: 0 }}
    >
      {children}
    </div>
  )
}

export function SlideUp({ children, className = '', delay = 0 }: MotionCardProps) {
  const mounted = useIsMounted()

  return (
    <div
      className={className}
      style={mounted ? {
        animation: `fadeInUp ${0.6}s ease ${delay}s both`,
      } : { opacity: 0 }}
    >
      {children}
    </div>
  )
}
