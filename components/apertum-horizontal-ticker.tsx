"use client"

import { useEffect, useRef } from "react"

export default function ApertumHorizontalTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) return

    // Duplicar o conteúdo para garantir um loop contínuo
    const clone = content.cloneNode(true)
    container.appendChild(clone)

    let animationId: number
    let position = 0
    const speed = 0.5 // Velocidade da animação (pixels por frame)

    const animate = () => {
      position += speed

      // Resetar a posição quando o primeiro conjunto de itens sair da visualização
      if (position >= content.offsetWidth) {
        position = 0
      }

      container.style.transform = `translateX(-${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Limpar a animação quando o componente for desmontado
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const tickerItems = Array(10)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="flex items-center space-x-3 px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#111111] border border-[#66e0cc]/30">
            <img
              src="/assets/apertum-logo.png"
              alt="HooMoon"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%2366e0cc'/%3E%3Ctext x='12' y='14' fontFamily='Arial' fontSize='8' fill='%23132c4c' textAnchor='middle'%3EH%3C/text%3E%3C/svg%3E"
              }}
            />
          </div>
          <span className="font-bold text-white whitespace-nowrap">HooMoon</span>
          <span className="text-[#66e0cc] whitespace-nowrap font-medium">$HMON</span>
          <span className="text-white whitespace-nowrap">R$ 7,14</span>
          <span className="text-green-400 whitespace-nowrap">+2.72%</span>
        </div>
      </div>
    ))

  return (
    <div className="bg-black w-full max-w-full mx-auto overflow-hidden py-3 rounded-lg border border-[#111111]">
      <div className="relative w-full overflow-hidden">
        <div ref={containerRef} className="inline-flex">
          <div ref={contentRef} className="inline-flex items-center">
            {tickerItems}
          </div>
        </div>
      </div>
    </div>
  )
}
