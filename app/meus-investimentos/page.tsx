"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const investmentPlans = [
  {
    key: "FREE",
    name: "HOO FREE",
    logo: "/images/lua-free.png",
    border: "border-cyan-400",
    text: "text-cyan-400",
    bg: "bg-cyan-400",
    invested: "$0.00",
    daily: "$0.00",
    max: "$0.00",
    start: "15/05/2025",
    next: "18/05/2025",
    end: "15/06/2025",
    progress: 100,
    code: "HOO-FREE001",
    description: "Plano gratuito para novos usuários.",
  },
  {
    key: "PANDORA",
    name: "HOO PANDORA",
    logo: "/images/lua-pandora.png",
    border: "border-green-500",
    text: "text-green-500",
    bg: "bg-green-500",
    invested: "$15.00",
    daily: "$0.30",
    max: "$18.00",
    start: "15/05/2025",
    next: "Diário",
    end: "15/07/2025",
    progress: 25,
    code: "HOO-PAN84RT",
    description: "Locação mínima $5, retorno total 120%",
    withdrawalDays: "Diário",
  },
  {
    key: "TITAN",
    name: "HOO TITAN",
    logo: "/images/lua-titan.png",
    border: "border-purple-500",
    text: "text-purple-500",
    bg: "bg-purple-500",
    invested: "$20.00",
    daily: "$0.80",
    max: "$32.00",
    start: "15/05/2025",
    next: "18/05/2025",
    end: "15/06/2025",
    progress: 50,
    code: "HOO-WQR75KW",
    description: "Locação mínima $10, retorno total 140%",
  },
  {
    key: "CALLISTO",
    name: "HOO CALLISTO",
    logo: "/images/lua-callisto.png",
    border: "border-red-500",
    text: "text-red-500",
    bg: "bg-red-500",
    invested: "$10.00",
    daily: "$0.80",
    max: "$32.00",
    start: "15/05/2025",
    next: "18/05/2025",
    end: "15/06/2025",
    progress: 75,
    code: "HOO-CAL93RT",
    description: "Locação mínima $20, retorno total 160%",
  },
]

export default function MeusInvestimentosPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()
  const countdownRefs = useRef<{ [key: string]: HTMLParagraphElement | null }>({})

  // Efeito para inicializar a animação do canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar o canvas para ocupar toda a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Chamar resize inicialmente e adicionar listener para redimensionamento
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Configurações da animação
    const nodes: Node[] = []
    const nodeCount = 100
    const connectionDistance = 150

    // Classe para representar um nó na teia
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 1.5 + 0.5
      }

      update() {
        // Atualizar posição
        this.x += this.vx
        this.y += this.vy

        // Rebater nas bordas
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(102, 224, 204, 0.5)"
        ctx.fill()
      }
    }

    // Criar nós
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    // Função de animação
    const animate = () => {
      if (!ctx || !canvas) return

      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Atualizar e desenhar nós
      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      // Desenhar conexões entre nós próximos
      ctx.strokeStyle = "rgba(102, 224, 204, 0.15)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Opacidade baseada na distância
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(102, 224, 204, ${opacity * 0.2})`

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    // Iniciar animação
    animate()

    // Limpar ao desmontar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(0) // Apenas para garantir
    }
  }, [])

  // Efeito para o contador regressivo
  useEffect(() => {
    // Definir a data alvo (2 horas a partir de agora)
    const targetTime = new Date()
    targetTime.setHours(targetTime.getHours() + 2)

    const updateCountdown = () => {
      const now = new Date()
      const diff = targetTime.getTime() - now.getTime()

      if (diff <= 0) {
        Object.keys(countdownRefs.current).forEach((key) => {
          const ref = countdownRefs.current[key]
          if (ref) {
            ref.textContent = "00:00:00"
          }
        })
        clearInterval(timerRef.current)
        return
      }

      // Calcular horas, minutos e segundos
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      // Formatar com zeros à esquerda
      const formattedHours = hours.toString().padStart(2, "0")
      const formattedMinutes = minutes.toString().padStart(2, "0")
      const formattedSeconds = seconds.toString().padStart(2, "0")

      // Atualizar o texto em todos os contadores
      Object.keys(countdownRefs.current).forEach((key) => {
        const ref = countdownRefs.current[key]
        if (ref) {
          ref.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        }
      })
    }

    // Atualizar imediatamente e depois a cada segundo
    updateCountdown()
    timerRef.current = setInterval(updateCountdown, 1000)

    // Limpar ao desmontar
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0f1c] to-[#0a0d16] relative overflow-hidden text-white">
      {/* Fundo animado estilo teia */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} id="background-canvas" className="w-full h-full"></canvas>
      </div>

      <div className="relative z-10 p-4 md:p-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Meus Investimentos</h1>

        {/* Cards de investimento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investmentPlans.map((plan) => (
            <div
              key={plan.key}
              className={`bg-black/60 backdrop-blur-sm rounded-2xl border ${plan.border} p-6 mb-8 shadow-lg shadow-${plan.text.split("-")[1]}-500/10`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={plan.logo || "/placeholder.svg"} alt={plan.name} className="w-16 h-16" />
                <div>
                  <h2 className={`text-2xl font-semibold ${plan.text} mb-2`}>{plan.name}</h2>
                  <p className="text-gray-400">{plan.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div>
                  <p className="text-gray-300">Valor</p>
                  <p className="text-xl font-bold">{plan.invested}</p>
                  <p className="text-xs text-gray-400">Código: {plan.code}</p>
                </div>
                <div>
                  <p className="text-gray-300">Rendimento Diário</p>
                  <p className={`text-xl font-bold ${plan.text}`}>{plan.daily}</p>
                </div>
                <div>
                  <p className="text-gray-300">Rendimento Máximo</p>
                  <p className={`text-xl font-bold ${plan.text}`}>{plan.max}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Detalhes do Investimento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Frequência de Saques:</span>
                    <span className="text-white">A cada 3 dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data de Ativação:</span>
                    <span className="text-white">{plan.start}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Próxima Liberação:</span>
                    <span className="text-white">{plan.next}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data de Expiração:</span>
                    <span className="text-white">{plan.end}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-300 mb-1">Próximo Pagamento</p>
                <p ref={(el) => (countdownRefs.current[plan.key] = el)} className={`text-2xl font-mono ${plan.text}`}>
                  02:00:00
                </p>
              </div>

              {/* Barra de progresso */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progresso</span>
                  <span className="text-gray-400">{plan.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className={`${plan.bg} h-2.5 rounded-full transition-all duration-700 ease-in-out`}
                    style={{ width: `${plan.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de voltar */}
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            ← Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  )
}
