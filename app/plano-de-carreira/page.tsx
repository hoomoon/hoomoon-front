"use client"

import ParticlesBackground from "@/components/particles-background"
import { Rocket, BarChart, Trophy, ArrowLeft } from "lucide-react"
import Link from "next/link"

const niveis = [
  { titulo: "Master", pontos: 0, bonus: "-", premio: "-" },
  { titulo: "Prata", pontos: 100, bonus: "$100", premio: "-" },
  { titulo: "Ouro", pontos: 250, bonus: "$250", premio: "-" },
  { titulo: "Diamante", pontos: 500, bonus: "$500", premio: "-" },
  { titulo: "Duplo Diamante", pontos: 1000, bonus: "$1.000", premio: "-" },
  { titulo: "Triplo Diamante", pontos: 5000, bonus: "$5.000", premio: "-" },
  { titulo: "Imperial Diamante", pontos: 20000, bonus: "$8.000 a $10.000", premio: "Viagem para Dubai" },
  { titulo: "Imperial Two Stars", pontos: 80000, bonus: "$15.000", premio: "Viagem para Maldivas" },
  { titulo: "Imperial Three Stars", pontos: 500000, bonus: "$50.000", premio: "Range Rover Velar" },
  { titulo: "Titan", pontos: 1000000, bonus: "$100.000", premio: "Porsche 911" },
]

// Simulando os pontos acumulados do usuário
const pontosUsuario = 3225

export default function PlanoDeCarreira() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fundo com partículas */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Gradientes animados */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="relative z-10 p-6 text-white">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-center text-4xl font-bold text-cyan-400 mb-4 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-cyan-400 mr-3" />
              Plano de Carreira HOOMOON
            </h1>
            <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-10">
              Conquiste prêmios reais com base em desempenho. Cada ponto representa comissão recebida. Os níveis mais
              altos exigem liderança duplicada. Seu crescimento leva você mais longe!
            </p>

            <div className="mb-10 bg-white/10 border border-cyan-500 rounded-xl p-6 text-center">
              <h2 className="text-xl font-bold text-cyan-400 mb-2 flex items-center justify-center">
                <BarChart className="w-5 h-5 text-cyan-400 mr-2" />
                Seus Pontos Atuais
              </h2>
              <p className="text-4xl font-bold text-white">{pontosUsuario.toLocaleString()} pts</p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center">
                <Trophy className="w-6 h-6 text-cyan-400 mr-2" />
                Progresso por Nível
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {niveis.map((n, index) => {
                  const progresso = Math.min(100, (pontosUsuario / n.pontos) * 100)
                  return (
                    <div
                      key={index}
                      className="bg-white/10 border border-white/20 rounded-xl p-6 text-center shadow-xl"
                    >
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">{n.titulo}</h3>
                      <p className="text-gray-300">
                        Meta: <span className="text-white">{n.pontos.toLocaleString()} pts</span>
                      </p>
                      <p className="text-gray-300">
                        Bonificação: <span className="text-white">{n.bonus}</span>
                      </p>
                      <p className="text-gray-300 mb-4">{n.premio}</p>
                      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-cyan-400 h-3 transition-all duration-700"
                          style={{ width: `${progresso}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{Math.min(progresso, 100).toFixed(1)}%</p>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="text-gray-300 text-sm text-center mt-10">
              <p className="mb-2">
                • O sistema calcula automaticamente sua pontuação com base nas comissões recebidas.
              </p>
              <p>• Cada $1 de comissão gera 1 ponto.</p>
              <p>• Prêmios são entregues em USDT, Pix ou bens físicos conforme validação.</p>
            </section>

            <div className="mt-8 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar para o Início
              </Link>
            </div>

            <p className="text-center text-cyan-500 font-semibold mt-10 text-lg">
              HOOMOON | Seu desempenho te leva mais longe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
