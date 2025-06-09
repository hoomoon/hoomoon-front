'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para a landing page após um pequeno delay
    const timer = setTimeout(() => {
      router.replace('/')
    }, 100)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-white text-2xl font-bold">
        HOO<span className="text-[#66e0cc]">MOON</span>
      </div>
    </div>
  )
} 