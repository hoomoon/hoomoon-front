"use client"

import { useEffect, useState } from "react"
import { ArrowLeftRight, Calendar } from "lucide-react"

function SwapCountdown() {
  const targetDate = new Date("2026-01-01T00:00:00").getTime()
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        setTimeLeft("Liberado!")
        clearInterval(timer)
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="text-center mb-6">
      <div className="text-sm text-gray-400 mb-1">Liberação em:</div>
      <div className="text-[#66e0cc] text-lg font-mono font-bold">{timeLeft}</div>
    </div>
  )
}

export default function SwapDashboard() {
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    const targetDate = new Date("2026-01-01T00:00:00").getTime()
    const now = new Date().getTime()
    setIsAvailable(now >= targetDate)
  }, [])

  return (
    <div className="w-full bg-transparent border border-[#66e0cc] rounded-xl p-6 text-white">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <div className="text-2xl mb-2">💰</div>
        <h2 className="text-xl font-bold mb-2">Receba 100% do seu investimento em APTM (Apertum)</h2>
        <p className="text-gray-300 mb-2">Se você possui saldo em APTM (Apertum), temos uma excelente notícia:</p>
        <div className="flex items-center justify-center gap-2 text-[#66e0cc] font-semibold">
          <span>📅</span>
          <span>Liberação oficial para swap em USDT agendada para:</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-lg font-bold mt-1">
          <Calendar className="w-5 h-5 text-red-400" />
          <span>01 de Janeiro de 2026</span>
        </div>
      </div>

      {/* Contagem Regressiva */}
      <SwapCountdown />

      {/* Interface de Swap */}
      <div className="bg-white/5 rounded-xl p-6 border border-[#66e0cc]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-4">
          {/* Campo Quantia */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Quantia</label>
            <div className="relative">
              <input
                type="text"
                placeholder="$0.8"
                className="w-full bg-black/30 border border-[#66e0cc] rounded-lg px-4 py-3 text-white placeholder-gray-400 pr-20 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isAvailable}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <img
                  src="/assets/aperthum-logo-new.png"
                  alt="APTM"
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                  }}
                />
                <span className="text-[#66e0cc] font-semibold">APTM</span>
              </div>
            </div>
          </div>

          {/* Campo Converter Para */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Converter para</label>
            <div className="relative">
              <input
                type="text"
                value="USDT"
                className="w-full bg-black/30 border border-[#66e0cc] rounded-lg px-4 py-3 text-white pr-20 disabled:cursor-not-allowed"
                disabled
                readOnly
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                <span className="text-[#66e0cc] font-semibold">USDT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ícone de Swap */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#66e0cc]/20 p-3 rounded-full">
            <ArrowLeftRight className="w-6 h-6 text-[#66e0cc]" />
          </div>
        </div>

        {/* Título Swap */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold">Swap</h3>
        </div>

        {/* Botão de Ação */}
        <button
          disabled={!isAvailable}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
            isAvailable
              ? "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/25"
              : "bg-gray-600 cursor-not-allowed text-gray-300"
          }`}
        >
          {isAvailable ? "Enviar dinheiro" : "Swap indisponível até 01/01/2026"}
        </button>

        {/* Informações Adicionais */}
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>Taxa de conversão: 1 APTM = 1 USDT</p>
          <p>Sem taxas de transação</p>
        </div>
      </div>
    </div>
  )
}
