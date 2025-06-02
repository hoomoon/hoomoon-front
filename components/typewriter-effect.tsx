// components/typewriter-effect.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  text: string
  delay?: number
  speed?: number
}

export default function TypewriterEffect({ text, delay = 0, speed = 50 }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const index = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      // Cleanup on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Reset state when text changes
    setDisplayText("")
    setIsHighlighted(false)
    setIsComplete(false)
    index.current = 0

    // Clear any existing timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Initial delay before starting to type
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (index.current < text.length) {
          setDisplayText((prev) => prev + text.charAt(index.current))
          index.current += 1
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          setIsComplete(true)

          // Add a small delay before applying highlight
          timeoutRef.current = setTimeout(() => {
            setIsHighlighted(true)
          }, 300)
        }
      }, speed)
    }, delay)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, delay, speed, isMounted])

  // Don't render anything until mounted
  if (!isMounted) {
    return null
  }

  return (
    <>
      {displayText}
      {displayText.length > 0 && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: isComplete ? 0 : 1 }}
          transition={{ duration: 0.5, repeat: isComplete ? 0 : Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="ml-1 inline-block w-1 h-8 bg-[#66e0cc]"
        ></motion.span>
      )}

      {isHighlighted && (
        <motion.span
          initial={{ color: "#ffffff" }}
          animate={{ color: "#66e0cc" }}
          transition={{ duration: 0.5 }}
          className="text-[#66e0cc]"
        >
          .
        </motion.span>
      )}
    </>
  )
}
