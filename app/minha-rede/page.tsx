// app/minha-rede/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Users,
  ChevronDown,
  ChevronUp,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import toast from 'react-hot-toast'

// Tipagem para o que o backend retorna
interface ApiIndicado {
  id: string
  nome: string
  valorInvestido: number
  status: "Ativo" | "Inativo"
  dataEntrada: string
  planoAtivo: string
  comissoesGeradas: number
}

interface ApiNivel {
  id: number
  nome: string
  totalInvestido: number
  indicados: ApiIndicado[]
}

interface ApiResponse {
  plano: "silver" | "gold" | "black"
  referral_code: string
  totalN1: number
  niveis: ApiNivel[]
}

// Tipagem com campos extras para UI
interface Indicado extends ApiIndicado {
  expandido: boolean
}

interface Nivel extends ApiNivel {
  expandido: boolean
  desbloqueado: boolean
}

export default function MinhaRede() {
  const [niveis, setNiveis] = useState<Nivel[]>([])
  const [plano, setPlano] = useState<"silver"|"gold"|"black">("silver")
  const [referralCode, setReferralCode] = useState("")
  const [totalN1, setTotalN1] = useState(0)
  const [totalIndicados, setTotalIndicados] = useState(0)
  const [totalGeralRede, setTotalGeralRede] = useState(0)

  // Função que determina se um nível está liberado
  const desbloqueia = (id: number, plano: string, totalN1: number) => {
    if (id === 1) return true
    // Plano gold ou black libera níveis 2–6 com >=2500 no N1
    if ((plano === "gold" || plano === "black") && totalN1 >= 2500 && id >= 2 && id <= 6) {
      return true
    }
    // Plano black libera níveis 7–10 com >=10000 no N1
    if (plano === "black" && totalN1 >= 10000 && id >= 7 && id <= 10) {
      return true
    }
    return false
  }

  // Busca dados no backend ao montar o componente
  useEffect(() => {
    async function load() {
      const base = process.env.NEXT_PUBLIC_API_URL
      const res = await fetch(`${base}/api/minha-rede/`, {credentials: "include"})
      if (!res.ok) return console.error("Falha ao buscar minha-rede")
      const data: ApiResponse = await res.json()

      // salva referral code
      setReferralCode(data.referral_code)

      // Calcular totais gerais
      const totalInd = data.niveis.reduce((sum, lvl) => sum + lvl.indicados.length, 0)
      const totalVol = data.niveis.reduce((sum, lvl) => sum + lvl.totalInvestido, 0)

      // Mapear para o formato de UI, adicionando expandido e desbloqueado
      const uiNiveis: Nivel[] = data.niveis.map((lvl) => ({
        ...lvl,
        expandido: false,
        desbloqueado: desbloqueia(lvl.id, data.plano, data.totalN1),
      }))

      setPlano(data.plano)
      setTotalN1(data.totalN1)
      setTotalIndicados(totalInd)
      setTotalGeralRede(totalVol)
      setNiveis(uiNiveis)
    }
    load()
  }, [])

  // Inverte o estado de “expandido” de um nível
  const toggleNivel = (id: number) => {
    setNiveis((old) =>
      old.map((n) =>
        n.id === id ? { ...n, expandido: !n.expandido } : n
      )
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <ArrowLeft size={24} />
        </Link>
        <Users className="h-6 w-6 mr-2 text-[#66e0cc]" />
        <h1 className="text-2xl font-bold">Minha Rede</h1>
      </div>

      {/* SEÇÃO DE CÓDIGO DE INDICAÇÃO */}
      <div className="bg-[#111] p-4 rounded-xl flex items-center justify-between mb-6">
        <div>
          Seu código de indicação:
          <span className="font-bold text-white ml-2">{referralCode || "…carregando"}</span>
        </div>
        <Button
          onClick={() => {
            const url = `${window.location.origin}/cadastro?ref=${referralCode}`
            navigator.clipboard.writeText(url).then(() => {
              toast.success("Link copiado!")
            })
          }}
        >
          Copiar link
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#111] p-4 rounded-xl">
          <div className="text-sm text-gray-400">Total de Indicados</div>
          <div className="text-2xl font-bold mt-1 text-white">
            {totalIndicados} pessoas
          </div>
        </div>
        <div className="bg-[#111] p-4 rounded-xl">
          <div className="text-sm text-gray-400">Volume Total da Rede</div>
          <div className="text-2xl font-bold mt-1 text-[#66e0cc]">
            US$ {totalGeralRede.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Lista de níveis */}
      <div className="space-y-4">
        {niveis.map((nivel) => (
          <div
            key={nivel.id}
            className={`bg-[#111] rounded-xl overflow-hidden ${
              !nivel.desbloqueado ? "opacity-50" : ""
            }`}
          >
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleNivel(nivel.id)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
                  <span className="text-[#66e0cc] font-bold">
                    {nivel.id}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{nivel.nome}</h3>
                  <p className="text-sm text-gray-400">
                    {nivel.indicados.length} indicado
                    {nivel.indicados.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center">

                {/* Badge “Bloqueado” sempre à esquerda do total */}
                {!nivel.desbloqueado && (
                  <Badge variant="outline" className="mr-4">
                    Bloqueado
                  </Badge>
                )}
          
                {/* Total Investido */}
                <div className="text-right mr-4">
                  <div className="text-sm text-gray-400">Total Investido</div>
                  <div className="font-bold text-[#66e0cc]">
                    US$ {nivel.totalInvestido.toLocaleString()}
                  </div>
                </div>
              
                {/* Setinha sempre visível */}
                {nivel.expandido ? (
                  <ChevronUp className="h-6 w-6 text-white" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-white" />
                )}
              </div>
            </div>

            {nivel.expandido && (
              <div className="px-4 pb-4 space-y-2">
                {nivel.indicados.map((i) => (
                  <div
                    key={i.id}
                    className="bg-[#1a1a1a] rounded-lg p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-white">
                          {i.nome}
                        </div>
                        <div className="text-xs text-gray-500">
                          Plano: {i.planoAtivo || "HOO SILVER"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">
                        Investido
                      </div>
                      <div className="font-semibold text-white">
                        US$ {i.valorInvestido.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
