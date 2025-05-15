"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

// Função para gerar código aleatório no formato HOO-XXXXXXX
function gerarCodigo(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `HOO-${result}`
}

// Função para formatar tempo no formato HH:MM:SS
function formatarTempo(segundos: number): string {
  const h = String(Math.floor(segundos / 3600)).padStart(2, "0")
  const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0")
  const s = String(segundos % 60).padStart(2, "0")
  return `${h}:${m}:${s}`
}

// Interface para o tipo de investimento
interface Investimento {
  plano: string
  descricao: string
  valor: number
  codigo: string
  rendimentoDiario: number
  rendimentoMaximo: number
  frequenciaSaques: number
  dataAtivacao: string
  proximaLiberacao: string
  dataExpiracao: string
  tempoRestante: number
  progresso: number
}

export default function MeusInvestimentos() {
  // Estado para armazenar os investimentos
  const [investimentos, setInvestimentos] = useState<Investimento[]>([
    {
      plano: "DOGE FLASH",
      descricao: "Ideal para iniciantes com investimento mínimo.",
      valor: 20.0,
      codigo: gerarCodigo(),
      rendimentoDiario: 0.8,
      rendimentoMaximo: 32.0,
      frequenciaSaques: 3,
      dataAtivacao: "15/05/2025",
      proximaLiberacao: "18/05/2025",
      dataExpiracao: "15/06/2025",
      tempoRestante: 7260, // 2 horas, 1 minuto e 0 segundos
      progresso: 25,
    },
    {
      plano: "BTC BOOST",
      descricao: "Rendimentos acelerados para investidores experientes.",
      valor: 100.0,
      codigo: gerarCodigo(),
      rendimentoDiario: 4.5,
      rendimentoMaximo: 180.0,
      frequenciaSaques: 2,
      dataAtivacao: "10/05/2025",
      proximaLiberacao: "16/05/2025",
      dataExpiracao: "10/06/2025",
      tempoRestante: 3600, // 1 hora
      progresso: 40,
    },
    {
      plano: "ETH PREMIUM",
      descricao: "Máximo rendimento para investimentos de longo prazo.",
      valor: 500.0,
      codigo: gerarCodigo(),
      rendimentoDiario: 25.0,
      rendimentoMaximo: 1000.0,
      frequenciaSaques: 5,
      dataAtivacao: "01/05/2025",
      proximaLiberacao: "20/05/2025",
      dataExpiracao: "01/07/2025",
      tempoRestante: 1800, // 30 minutos
      progresso: 60,
    },
  ])

  // Efeito para atualizar o tempo restante a cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setInvestimentos((prev) => {
        if (!prev) return []
        return prev.map((inv) => ({
          ...inv,
          tempoRestante: inv.tempoRestante > 0 ? inv.tempoRestante - 1 : 0,
        }))
      })
    }, 1000)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-20">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Meus Investimentos</h1>
          <p className="text-sm text-gray-400">Acompanhe seus investimentos ativos</p>
        </div>
      </div>

      <div className="space-y-6">
        {investimentos && investimentos.length > 0 ? (
          investimentos.map((inv, index) => (
            <div key={index} className="bg-[#111] rounded-xl p-5 border border-[#222]">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white">{inv.plano}</h2>
                <p className="text-sm text-gray-400">{inv.descricao}</p>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-white">${inv.valor.toFixed(2)}</div>
                <div className="text-sm text-gray-400 mt-1">Código: {inv.codigo}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400">Rendimento Diário</div>
                  <div className="text-lg font-semibold text-white">${inv.rendimentoDiario.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Rendimento Máximo</div>
                  <div className="text-lg font-semibold text-white">${inv.rendimentoMaximo.toFixed(2)}</div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Detalhes do Investimento</h3>
                <div className="bg-[#1a1a1a] rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Frequência de Saques:</span>
                    <span className="text-sm">A cada {inv.frequenciaSaques} dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Data de Ativação:</span>
                    <span className="text-sm">{inv.dataAtivacao}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Próxima Liberação:</span>
                    <span className="text-sm">{inv.proximaLiberacao}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Data de Expiração:</span>
                    <span className="text-sm">{inv.dataExpiracao}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <div className="text-sm text-gray-400 mb-2">Próximo Pagamento</div>
                <div className="font-mono text-3xl font-bold text-[#66e0cc]">{formatarTempo(inv.tempoRestante)}</div>
              </div>

              <div className="space-y-3 mb-4">
                <Button className="w-full bg-[#66e0cc] hover:bg-[#50c4b0] text-black font-semibold">
                  <DollarSign className="h-4 w-4 mr-2" /> Pagar agora
                </Button>
                <Button className="w-full bg-[#222] hover:bg-[#333] text-white">Pagar com Saldo</Button>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>$0.00</span>
                  <span>${inv.rendimentoMaximo.toFixed(2)}</span>
                </div>
                <div className="h-4 bg-[#222] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#66e0cc] transition-all duration-500 ease-in-out"
                    style={{ width: `${inv.progresso}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                    {inv.progresso}%
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#111] p-4 rounded-xl text-center">
            <p className="text-gray-400">Nenhum investimento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
