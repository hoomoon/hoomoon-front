"use client"

import { useState } from "react"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

export default function MeusGanhos() {
  const [showRendimentos, setShowRendimentos] = useState(false)
  const [showRede, setShowRede] = useState(false)

  const extratosRendimento = [
    { plano: "HOO TITAN", valor: "$3.25", data: "28/05/2025", hora: "10:00", logo: "/images/lua-titan.png" },
    { plano: "HOO CALLISTO", valor: "$4.57", data: "27/05/2025", hora: "10:00", logo: "/images/lua-callisto.png" },
    { plano: "HOO PANDORA", valor: "$2.00", data: "26/05/2025", hora: "10:00", logo: "/images/lua-pandora.png" },
    { plano: "HOO FREE", valor: "$0.50", data: "25/05/2025", hora: "10:00", logo: "/images/lua-free.png" },
  ]

  const extratosRede = [
    { indicado: "João Silva", nivel: "1", valor: "$10.00", data: "28/05/2025", hora: "14:22" },
    { indicado: "Maria Souza", nivel: "2", valor: "$4.00", data: "27/05/2025", hora: "15:20" },
    { indicado: "Carlos Mendes", nivel: "1", valor: "$8.50", data: "26/05/2025", hora: "16:45" },
    { indicado: "Ana Costa", nivel: "3", valor: "$2.25", data: "25/05/2025", hora: "11:15" },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0f1c] to-[#001f2d] p-6">
      {/* Fundo com partículas */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="relative z-10">
        <Link href="/dashboard" className="text-[#66e0cc] text-sm hover:underline cursor-pointer mb-4 inline-block">
          ← Voltar para o início
        </Link>

        <div className="text-white text-2xl font-bold mb-6">Meus Ganhos</div>

        {/* Extrato de Rendimentos */}
        <div
          className="bg-black/70 hover:bg-black/80 transition-all border border-cyan-500 rounded-2xl p-6 mb-6 cursor-pointer shadow-lg hover:shadow-cyan-500/50"
          onClick={() => setShowRendimentos(!showRendimentos)}
        >
          <div className="flex items-center justify-between">
            <div className="text-white text-lg font-semibold">Extrato de Rendimentos</div>
            <img src="/images/lua-titan.png" alt="Logo Plano" className="w-8 h-8" />
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Veja os rendimentos detalhados de cada plano com data, horário e valores.
          </p>

          {showRendimentos && (
            <div className="mt-4 space-y-3 border-t border-cyan-500/30 pt-4">
              {extratosRendimento.map((item, i) => (
                <div key={i} className="bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={item.logo || "/placeholder.svg"} alt={item.plano} className="w-8 h-8" />
                      <div>
                        <p className="text-white font-semibold">{item.plano}</p>
                        <p className="text-gray-400 text-sm">
                          {item.data} às {item.hora}
                        </p>
                      </div>
                    </div>
                    <div className="text-cyan-400 font-bold text-lg">{item.valor}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Extrato de Rede */}
        <div
          className="bg-black/70 hover:bg-black/80 transition-all border border-purple-500 rounded-2xl p-6 mb-6 cursor-pointer shadow-lg hover:shadow-purple-500/50"
          onClick={() => setShowRede(!showRede)}
        >
          <div className="text-white text-lg font-semibold mb-2">Extrato de Rede</div>
          <p className="text-gray-400 text-sm">Veja todas as comissões da sua rede:</p>

          {!showRede ? (
            <ul className="text-sm text-gray-300 mt-2 space-y-1">
              <li>
                <strong>Nível:</strong> 1
              </li>
              <li>
                <strong>Indicado:</strong> João Silva
              </li>
              <li>
                <strong>Data:</strong> 28/05/2025
              </li>
              <li>
                <strong>Hora:</strong> 14:22
              </li>
              <li>
                <strong>Comissão:</strong> $10
              </li>
            </ul>
          ) : (
            <div className="mt-4 space-y-3 border-t border-purple-500/30 pt-4">
              {extratosRede.map((item, i) => (
                <div key={i} className="bg-black/50 rounded-lg p-4 border border-purple-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-semibold">{item.indicado}</p>
                      <p className="text-gray-400 text-sm">Nivel 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 font-bold text-lg">{item.valor}</p>
                      <p className="text-gray-400 text-sm">
                        {item.data} às {item.hora}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
