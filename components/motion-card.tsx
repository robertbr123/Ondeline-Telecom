'use client'

import { motion } from 'framer-motion'

interface MotionCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function MotionCard({ children, className = '', delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionButton({ children, className = '', ...props }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function FadeIn({ children, className = '', delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideUp({ children, className = '', delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}