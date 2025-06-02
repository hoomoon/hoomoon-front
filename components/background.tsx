"use client"

import type React from "react"

import { usePathname } from "next/navigation"

export default function Background({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Lista de rotas que não devem ter o fundo personalizado
  const excludedRoutes = ["/investir", "/programa-afiliados"]

  // Verifica se a rota atual está na lista de exclusões
  const shouldApplyBackground = !excludedRoutes.some((route) => pathname?.startsWith(route))

  // Se a rota estiver na lista de exclusões, retorna apenas os children sem o fundo
  if (!shouldApplyBackground) {
    return <>{children}</>
  }

  // Caso contrário, aplica o fundo personalizado
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-[#0a0e1a] to-[#05161d]">
      <div className="absolute inset-0 z-0">
        {/* Elementos visuais animados do fundo */}
        <svg
          className="absolute left-0 top-0 h-full w-full animate-fade"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2afadf" />
              <stop offset="100%" stopColor="#4c83ff" />
            </radialGradient>
          </defs>
          <circle fill="url(#grad)" r="300" cx="500" cy="500" opacity="0.05" />
          {/* Simula teias com linhas */}
          <g stroke="#66e0cc" strokeOpacity="0.2">
            <line x1="100" y1="100" x2="800" y2="100" />
            <line x1="200" y1="300" x2="700" y2="400" />
            <line x1="400" y1="500" x2="600" y2="200" />
            <line x1="150" y1="650" x2="850" y2="700" />
          </g>
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
