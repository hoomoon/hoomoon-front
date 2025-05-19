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
  const index = useRef(0)

  useEffect(() => {
    // Initial delay before starting to type
    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (index.current < text.length) {
          setDisplayText((prev) => prev + text.charAt(index.current))
          index.current += 1
        } else {
          clearInterval(intervalId)
          setIsComplete(true)

          // Add a small delay before applying highlight
          setTimeout(() => {
            setIsHighlighted(true)
          }, 300)
        }
      }, speed)

      return () => clearInterval(intervalId)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, delay, speed])

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
