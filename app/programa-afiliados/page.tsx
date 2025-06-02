"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "@/components/particles-background"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ProgramaAfiliados() {
  const router = useRouter()

  // Dados da tabela
  const niveis = [
    { nivel: "1º", silver: "10%", gold: "10%", black: "10%" },
    { nivel: "2º", silver: "--", gold: "5%", black: "5%" },
    { nivel: "3º", silver: "--", gold: "4%", black: "4%" },
    { nivel: "4º", silver: "--", gold: "--", black: "3%" },
    { nivel: "5º", silver: "--", gold: "--", black: "2%" },
    { nivel: "6º", silver: "--", gold: "--", black: "2%" },
    { nivel: "7º", silver: "--", gold: "--", black: "1%" },
    { nivel: "8º", silver: "--", gold: "--", black: "0,5%" },
    { nivel: "9º", silver: "--", gold: "--", black: "0,5%" },
    { nivel: "10º", silver: "--", gold: "--", black: "0,5%" },
  ]

  // Efeito de rotação para a lua 3D
  useEffect(() => {
    const moon = document.getElementById("moon-3d")
    if (moon) {
      let rotation = 0
      const animate = () => {
        rotation += 0.2
        moon.style.transform = `rotate(${rotation}deg)`
        requestAnimationFrame(animate)
      }
      const animationId = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationId)
    }
  }, [])

  // Função para navegar de volta ao dashboard
  const voltarAoDashboard = () => {
    router.push("/dashboard") // ou a rota principal da sua plataforma
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
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

      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        {/* Botão de voltar */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-gray-800 mb-4"
          onClick={voltarAoDashboard}
          aria-label="Voltar ao Dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Título da Seção */}
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Programa de Afiliados</h1>

        {/* Nível Atual e Barra de Progresso */}
        <div className="bg-black/70 border border-cyan-500 rounded-xl p-6 text-center mb-8">
          <p className="text-gray-300 text-sm">Seu Nível Atual</p>
          <p className="text-cyan-400 text-xl font-bold mt-1">Hoo Silver</p>
          <p className="text-gray-400 text-sm mt-2">
            Faltam <span className="text-cyan-300 font-semibold">$32</span> em saques para liberar o próximo nível
          </p>
          <div className="w-full bg-gray-800 h-3 rounded-full mt-4">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: "36%" }}></div>
          </div>
        </div>

        {/* Regras de Desbloqueio do Unilevel */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-6 text-white text-sm mb-8">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Regras de Desbloqueio do Unilevel</h2>
          <ul className="space-y-2">
            <li>
              <span className="font-bold text-cyan-300">HOO Silver:</span> $50 em saques libera o nível{" "}
              <span className="text-yellow-400 font-semibold">Gold</span>
            </li>
            <li>
              <span className="font-bold text-yellow-400">HOO Gold:</span> $250 em saques libera o nível{" "}
              <span className="text-white font-semibold">Black</span>
            </li>
            <li>
              <span className="font-bold text-white">HOO Black:</span> Liberação dos{" "}
              <span className="text-cyan-300 font-semibold">10 níveis</span> de comissionamento
            </li>
          </ul>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabela de comissões (2/3 da largura em desktop) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#66e0cc]/30 shadow-[0_0_15px_rgba(102,224,204,0.15)]">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#66e0cc]">Comissões por Plano</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                  <thead className="text-[#66e0cc]">
                    <tr>
                      <th className="px-4 py-2 font-medium">Nível</th>
                      <th className="px-4 py-2 font-medium">🥈 Hoo Silver</th>
                      <th className="px-4 py-2 font-medium">🥇 Hoo Gold</th>
                      <th className="px-4 py-2 font-medium">⚫ Hoo Black</th>
                    </tr>
                  </thead>
                  <tbody>
                    {niveis.map((row, idx) => (
                      <tr
                        key={idx}
                        className="bg-[#111]/80 backdrop-blur-sm hover:bg-[#1a1a1a] transition-colors duration-200"
                      >
                        {[row.nivel, row.silver, row.gold, row.black].map((cell, i) => (
                          <td
                            key={i}
                            className={`px-4 py-3 rounded-lg ${
                              i === 0 ? "font-medium" : cell === "--" ? "text-gray-500" : "text-[#66e0cc] font-medium"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 pt-6 border-t border-[#66e0cc]/20">
                <h3 className="text-lg font-medium mb-4 text-center">Soma total de comissões por plano:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#111]/80 backdrop-blur-sm p-4 rounded-xl border border-[#66e0cc]/20 flex flex-col items-center">
                    <span className="text-sm text-gray-300 mb-1">🥈 Hoo Silver</span>
                    <span className="text-2xl font-bold text-[#66e0cc]">10%</span>
                  </div>
                  <div className="bg-[#111]/80 backdrop-blur-sm p-4 rounded-xl border border-yellow-500/20 flex flex-col items-center">
                    <span className="text-sm text-gray-300 mb-1">🥇 Hoo Gold</span>
                    <span className="text-2xl font-bold text-yellow-400">19%</span>
                  </div>
                  <div className="bg-[#111]/80 backdrop-blur-sm p-4 rounded-xl border border-gray-500/20 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Image
                        src="/images/hoo-black-logo.png"
                        alt="Hoo Black Logo"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-300">Hoo Black</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-300">29,5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#66e0cc]/30 shadow-[0_0_15px_rgba(102,224,204,0.15)]">
              <p className="text-gray-300 text-center">
                Os bônus de indicação são desbloqueados automaticamente conforme a performance da sua equipe, sem
                necessidade de comprar posições. Quanto melhor o desempenho da sua rede, maiores serão seus ganhos.
              </p>
            </div>
          </motion.div>

          {/* Imagem 3D da Lua (1/3 da largura em desktop) */}
          <motion.div
            className="lg:col-span-1 flex flex-col"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#66e0cc]/30 shadow-[0_0_15px_rgba(102,224,204,0.15)] h-full flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold mb-4 text-center">HOOMOON</h2>
              <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                <img
                  id="moon-3d"
                  src="/images/logo-hoo-3d.png"
                  alt="HOOMOON 3D"
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(102,224,204,0.5)]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-full"></div>
              </div>
              <p className="mt-6 text-sm text-gray-400 text-center">
                Faça parte do programa de afiliados HOOMOON e ganhe comissões em múltiplos níveis.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Seção Hoo Black */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image
                src="/images/hoo-black-logo.png"
                alt="Hoo Black Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-2xl font-bold text-white">Hoo Black Elite</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#111]/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 flex flex-col items-center">
                <span className="text-sm text-gray-400 mb-1">Níveis de Comissão</span>
                <span className="text-xl font-bold text-white">10</span>
              </div>
              <div className="bg-[#111]/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 flex flex-col items-center">
                <span className="text-sm text-gray-400 mb-1">Comissão Total</span>
                <span className="text-xl font-bold text-white">29,5%</span>
              </div>
              <div className="bg-[#111]/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 flex flex-col items-center">
                <span className="text-sm text-gray-400 mb-1">Requisito</span>
                <span className="text-xl font-bold text-white">$250 em saques</span>
              </div>
              <div className="bg-[#111]/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 flex flex-col items-center">
                <span className="text-sm text-gray-400 mb-1">Status</span>
                <span className="text-xl font-bold text-red-400">Bloqueado</span>
              </div>
            </div>

            <p className="text-gray-300 text-center">
              O plano Hoo Black Elite oferece o máximo potencial de ganhos com comissões em todos os 10 níveis da sua
              rede. Desbloqueie este nível atingindo $250 em saques acumulados.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
