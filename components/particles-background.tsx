"use client"

import { useCallback, useEffect, useState } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

export default function ParticlesBackground() {
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Cleanup function to handle component unmounting
    return () => {
      setIsLoaded(false)
    }
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      // Initialize the engine with slim preset
      await loadSlim(engine)
    } catch (error) {
      console.error("Failed to initialize particles:", error)
    }
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    try {
      if (container) {
        setIsLoaded(true)
      }
    } catch (error) {
      console.error("Error loading particles container:", error)
    }
  }, [])

  // Return null during server-side rendering
  if (!isClient) return null

  // Use a simpler configuration to avoid potential issues
  const safeOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#66e0cc",
      },
      links: {
        color: "#66e0cc",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40, // Reduced number of particles
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }

  try {
    return (
      <div className="particles-container">
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={safeOptions} />
      </div>
    )
  } catch (error) {
    console.error("Error rendering particles:", error)
    return null
  }
}
