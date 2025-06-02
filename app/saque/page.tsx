"use client"

import { useState, useEffect } from "react"
import { DollarSign } from "lucide-react"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

export default function Saque() {
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState("pix")
  const [chave, setChave] = useState("")
  const [pin, setPin] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [planoSelecionado, setPlanoSelecionado] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [dropdownOpen])

  const historicoFake = [
    { id: 1, valor: "$200.00", tipo: "PIX", data: "2025-05-14", status: "Aprovado" },
    { id: 2, valor: "$500.00", tipo: "USDT", data: "2025-05-12", status: "Pendente" },
    { id: 3, valor: "$150.00", tipo: "PIX", data: "2025-05-10", status: "Aprovado" },
  ]

  const planosAtivos = [
    {
      id: "free-001",
      nome: "HOO FREE",
      logo: "/images/lua-free.png",
      valorInvestido: 0,
      valorDisponivel: 15.5,
      ultimaLiberacao: "2025-05-25",
      proximaLiberacao: "2025-05-29",
      tipo: "free",
    },
    {
      id: "pandora-001",
      nome: "HOO PANDORA",
      logo: "/images/lua-pandora.png",
      valorInvestido: 50,
      valorDisponivel: 25.5,
      ultimaLiberacao: "2025-05-25",
      proximaLiberacao: "2025-05-29",
      tipo: "pandora",
    },
    {
      id: "titan-001",
      nome: "HOO TITAN",
      logo: "/images/lua-titan.png",
      valorInvestido: 100,
      valorDisponivel: 45.8,
      ultimaLiberacao: "2025-05-26",
      proximaLiberacao: "2025-05-29",
      tipo: "titan",
    },
    {
      id: "callisto-001",
      nome: "HOO CALLISTO",
      logo: "/images/lua-callisto.png",
      valorInvestido: 200,
      valorDisponivel: 78.9,
      ultimaLiberacao: "2025-05-18",
      proximaLiberacao: "2025-05-28",
      tipo: "callisto",
    },
  ]

  const handleSaque = () => {
    const valorNum = Number.parseFloat(valor)
    const isEmail = /\S+@\S+\.\S+/.test(chave)
    const isCPF = /^\d{11}$/.test(chave)
    const isValidPin = /^\d{4}$/.test(pin)

    if (valorNum < 10) {
      setMensagem("❌ O saque mínimo é de $10.")
    } else if (valorNum > 10000) {
      setMensagem("❌ O saque máximo permitido é de $10.000.")
    } else if (!chave) {
      setMensagem("❌ Informe a chave PIX ou endereço USDT.")
    } else if (tipo === "pix" && !(isEmail || isCPF)) {
      setMensagem("❌ A chave PIX deve ser um CPF (11 dígitos) ou um e-mail válido.")
    } else if (!isValidPin) {
      setMensagem("❌ Informe um PIN de 4 dígitos válido.")
    } else {
      setMensagem("✅ Solicitação de saque enviada com sucesso.")
    }
  }

  const handlePlanoChange = (planoId: string) => {
    setPlanoSelecionado(planoId)
    const plano = planosAtivos.find((p) => p.id === planoId)
    if (plano) {
      setValor(plano.valorDisponivel.toString())
    }
  }

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Fundo com partículas */}
      <ParticlesBackground />

      {/* Gradientes animados */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#66e0cc]/20 rounded-full blur-[120px] animate-pulse z-0"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse z-0"></div>

      {/* Conteúdo da página */}
      <div className="relative z-10 p-4 text-white flex flex-col items-center">
        <div className="w-full max-w-md mb-6">
          <Link href="/dashboard" className="text-[#66e0cc] text-sm hover:underline cursor-pointer mb-4 inline-block">
            ← Voltar para o início
          </Link>

          <h1 className="text-2xl font-bold mb-4 text-center">Solicitar Saque</h1>

          {/* Nova seção de seleção de plano com logos */}
          <div className="w-full max-w-md mb-6">
            <div className="bg-zinc-900/80 border border-[#66e0cc]/30 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-[#66e0cc]/10">
              <label className="block text-sm text-gray-400 mb-3 font-medium">Selecione o plano para saque</label>

              {/* Custom Dropdown with Logos */}
              <div className="relative">
                <div
                  className="w-full bg-zinc-800/80 border border-[#66e0cc]/50 text-white rounded-lg p-3 outline-none focus:border-[#66e0cc] focus:shadow-lg focus:shadow-[#66e0cc]/20 transition-all duration-300 cursor-pointer flex items-center justify-between"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {planoSelecionado ? (
                    <div className="flex items-center gap-3">
                      {(() => {
                        const plano = planosAtivos.find((p) => p.id === planoSelecionado)
                        return (
                          <>
                            <img
                              src={plano?.logo || "/placeholder.svg"}
                              alt={plano?.nome}
                              className="w-6 h-6 object-contain"
                            />
                            <span>
                              {plano?.nome} - Disponível: ${plano?.valorDisponivel.toFixed(2)}
                            </span>
                          </>
                        )
                      })()}
                    </div>
                  ) : (
                    <span className="text-gray-400">Escolha um plano ativo disponível para saque</span>
                  )}

                  <svg
                    className={`w-5 h-5 text-[#66e0cc] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Options */}
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800/95 border border-[#66e0cc]/50 rounded-lg shadow-xl shadow-black/50 z-50 backdrop-blur-sm">
                    <div className="p-2 space-y-1">
                      {planosAtivos.map((plano) => (
                        <div
                          key={plano.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#66e0cc]/10 cursor-pointer transition-colors duration-200 group"
                          onClick={() => {
                            handlePlanoChange(plano.id)
                            setDropdownOpen(false)
                          }}
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#66e0cc]/20 to-purple-600/20 p-1 flex items-center justify-center border border-[#66e0cc]/30 group-hover:border-[#66e0cc]/60 transition-colors">
                            <img
                              src={plano.logo || "/placeholder.svg"}
                              alt={plano.nome}
                              className="w-6 h-6 object-contain filter drop-shadow-sm"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{plano.nome}</div>
                            <div className="text-[#66e0cc] text-sm">
                              Disponível: ${plano.valorDisponivel.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3 italic">Apenas planos com saques liberados aparecerão aqui.</p>
            </div>

            {/* Detalhes do plano selecionado com logo */}
            {planoSelecionado && (
              <div className="bg-zinc-900/80 border border-[#66e0cc]/30 rounded-xl p-6 backdrop-blur-sm mt-4 shadow-lg shadow-[#66e0cc]/10 transform transition-all duration-300">
                {(() => {
                  const plano = planosAtivos.find((p) => p.id === planoSelecionado)
                  if (!plano) return null
                  return (
                    <div>
                      {/* Header com logo e nome */}
                      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-700/50">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#66e0cc]/20 to-purple-600/20 p-2 flex items-center justify-center border border-[#66e0cc]/30">
                          <img
                            src={plano.logo || "/placeholder.svg"}
                            alt={plano.nome}
                            className="w-12 h-12 object-contain filter drop-shadow-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-[#66e0cc] font-bold text-xl">{plano.nome}</h3>
                          <p className="text-gray-400 text-sm">Plano Ativo</p>
                        </div>
                      </div>

                      {/* Grid de informações */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <span className="text-gray-400 text-sm">Valor Investido</span>
                          <p className="text-white font-semibold text-lg">${plano.valorInvestido.toFixed(2)}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-gray-400 text-sm">Disponível para Saque</span>
                          <p className="text-[#66e0cc] font-bold text-lg glow-text">
                            ${plano.valorDisponivel.toFixed(2)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-gray-400 text-sm">Última Liberação</span>
                          <p className="text-white font-medium">{plano.ultimaLiberacao}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-gray-400 text-sm">Próxima Liberação</span>
                          <p className="text-white font-medium">{plano.proximaLiberacao}</p>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="mt-4 pt-4 border-t border-zinc-700/50">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-sm font-medium">Saque Liberado</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Valor do saque (mínimo $10 / máximo $10.000)</label>
              <div className="flex items-center gap-2 bg-zinc-800 p-3 rounded-md">
                <DollarSign className="text-gray-400" size={18} />
                <input
                  type="number"
                  placeholder="Digite o valor"
                  className="bg-transparent outline-none w-full text-white"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Tipo de saque</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-zinc-800 text-white rounded-md p-2"
              >
                <option value="pix">PIX (CPF ou E-mail)</option>
                <option value="usdt">USDT - BEP20</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                {tipo === "pix" ? "Chave PIX (CPF ou E-mail)" : "Endereço USDT BEP20"}
              </label>
              <input
                type="text"
                placeholder={
                  tipo === "pix" ? "Digite o CPF (somente números) ou E-mail" : "Digite o endereço USDT BEP20"
                }
                className="w-full bg-zinc-800 p-3 rounded-md text-white outline-none"
                value={chave}
                onChange={(e) => setChave(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">PIN de segurança (4 dígitos)</label>
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                className="w-full bg-zinc-800 p-3 rounded-md text-white outline-none"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>

            <button
              onClick={handleSaque}
              className="w-full bg-[#66e0cc] text-black font-bold py-2 rounded-xl hover:opacity-90"
            >
              Confirmar Saque
            </button>

            {mensagem && <p className="mt-2 text-sm text-center">{mensagem}</p>}
          </div>
        </div>

        {/* HISTÓRICO DE SAQUES */}
        <div className="w-full max-w-2xl mt-10">
          <h2 className="text-xl font-semibold mb-4 text-center">Histórico de Saques</h2>
          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="grid grid-cols-4 text-sm text-gray-400 border-b border-zinc-800 pb-2 mb-2">
              <span>Valor</span>
              <span>Tipo</span>
              <span>Data</span>
              <span>Status</span>
            </div>
            {historicoFake.length > 0 ? (
              historicoFake.map((item) => (
                <div key={item.id} className="grid grid-cols-4 text-sm border-b border-zinc-800 py-3">
                  <span>{item.valor}</span>
                  <span>{item.tipo}</span>
                  <span>{item.data}</span>
                  <span className={item.status === "Aprovado" ? "text-green-400" : "text-yellow-400"}>
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-4">Nenhum saque realizado ainda.</p>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px #66e0cc, 0 0 20px #66e0cc, 0 0 30px #66e0cc;
        }
      `}</style>
    </div>
  )
}
