"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CounterProps {
  value: string
  duration?: number
}

export default function Counter({ value, duration = 2000 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Check if the value contains numbers to animate
    const numericMatch = value.match(/[\d,]+/)
    if (!numericMatch) {
      // If no numbers found, just display the value as is
      setDisplayValue(value)
      return
    }

    const numericPart = numericMatch[0].replace(/,/g, "")
    const targetNumber = Number.parseInt(numericPart, 10)

    if (isNaN(targetNumber)) {
      setDisplayValue(value)
      return
    }

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentNumber = Math.floor(startValue + (targetNumber - startValue) * easeOutQuart)

      // Format the number with commas if the original had them
      const formattedNumber = value.includes(",") ? currentNumber.toLocaleString() : currentNumber.toString()

      // Replace the numeric part in the original value
      const newDisplayValue = value.replace(/[\d,]+/, formattedNumber)
      setDisplayValue(newDisplayValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [value, duration, isMounted])

  // Don't render anything until mounted
  if (!isMounted) {
    return null
  }

  return (
    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      {displayValue}
    </motion.span>
  )
}
