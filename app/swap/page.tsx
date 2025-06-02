"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"

export default function SwapPage() {
  const [timeLeft, setTimeLeft] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const countdown = () => {
      const swapDate = new Date("2026-01-01T00:00:00").getTime()
      const now = new Date().getTime()
      const distance = swapDate - now

      if (distance < 0) {
        setTimeLeft("Liberado!")
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    countdown()
    const timer = setInterval(countdown, 1000)
    return () => clearInterval(timer)
  }, [])

  // Don't render anything on the server side
  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fundo com partículas */}
      <div className="fixed inset-0 z-0">{isMounted && <ParticlesBackground />}</div>

      {/* Gradientes animados */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header with back button and logos */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-white hover:text-[#66e0cc] transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Dashboard
          </Link>

          <div className="flex items-center justify-between mb-4">
            <div className="text-white text-3xl font-bold flex items-center gap-3">
              <img
                src="/images/logo-825.png"
                alt="Logo"
                className="h-12 w-12"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
              <span>SWAP Apertum</span>
              <img
                src="/images/apertum-logo-circle.png"
                alt="Apertum"
                className="h-12 w-12"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-white text-center mb-6">
          <p className="text-lg font-semibold">Receba 100% do seu investimento em APTM (Apertum)</p>
          <p className="mt-2">Se você possui saldo em APTM (Apertum), temos uma excelente notícia:</p>
          <p className="mt-1 text-[#66e0cc] font-bold">Liberação oficial para swap em USDT agendada para:</p>
          <p className="text-2xl font-bold mt-2">01 de Janeiro de 2026</p>
        </div>

        <div className="bg-black/70 backdrop-blur-md border border-[#66e0cc] rounded-xl p-6 w-full max-w-xl mx-auto">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="amount" className="text-white mb-1 block">
                Quantidade
              </label>
              <div className="flex items-center gap-2 bg-[#0a0a0a] p-3 rounded-xl border border-[#66e0cc]">
                <input
                  id="amount"
                  type="text"
                  placeholder="$0.00"
                  disabled
                  className="bg-transparent text-white w-full outline-none disabled:cursor-not-allowed"
                />
                <div className="flex items-center gap-1">
                  <img
                    src="/images/apertum-logo-circle.png"
                    alt="APTM"
                    className="w-6 h-6"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                  <span className="text-white font-bold">APTM</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[#66e0cc] text-lg">↓</span>
            </div>

            <div>
              <label className="text-white mb-1 block">Converter para</label>
              <div className="flex items-center gap-2 bg-[#0a0a0a] p-3 rounded-xl border border-[#66e0cc]">
                <div className="flex items-center gap-1">
                  <img
                    src="/images/usdt-logo.png"
                    alt="USDT"
                    className="w-6 h-6"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                  <span className="text-white font-bold">USDT</span>
                </div>
              </div>
            </div>

            <button
              disabled
              className="bg-[#66e0cc]/60 text-black py-3 rounded-xl font-semibold mt-4 opacity-60 cursor-not-allowed"
            >
              Enviar dinheiro (Disponível a partir de 01/01/2026)
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white text-sm">Tempo restante para liberação do swap:</p>
          <div className="text-[#66e0cc] text-3xl font-mono mt-2">{timeLeft || "--:--:--"}</div>
        </div>
      </div>
    </div>
  )
}
