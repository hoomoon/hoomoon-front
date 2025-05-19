"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface CounterProps {
  value: string
}

export default function Counter({ value }: CounterProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    // If the value is not numeric, just display it directly
    if (isNaN(Number.parseInt(value.replace(/[^0-9]/g, "")))) {
      setDisplayValue(value)
      return
    }

    // Extract numeric part and suffix
    const numericMatch = value.match(/^([0-9,]+)(\+?)(.*)$/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const numericPart = numericMatch[1].replace(/,/g, "")
    const hasPlusSign = numericMatch[2] === "+"
    const suffix = numericMatch[3]

    const targetNumber = Number.parseInt(numericPart)
    const duration = 2000 // ms
    const steps = 20
    const stepValue = targetNumber / steps

    let current = 0
    const timer = setInterval(() => {
      current += stepValue
      if (current >= targetNumber) {
        current = targetNumber
        clearInterval(timer)
      }

      // Format the number with commas
      const formattedNumber = Math.floor(current).toLocaleString()
      setDisplayValue(`${formattedNumber}${hasPlusSign ? "+" : ""}${suffix}`)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return <span ref={ref}>{displayValue}</span>
}
