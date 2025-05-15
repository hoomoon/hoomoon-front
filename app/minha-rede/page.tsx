"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, ChevronDown, ChevronUp, User, DollarSign, Calendar, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Interface para os indicados
interface Indicado {
  id: string
  nome: string
  valorInvestido: number
  status: "Ativo" | "Inativo"
  dataEntrada: string
  planoAtivo: string
  comissoesGeradas: number
  expandido: boolean
}

// Interface para os níveis
interface Nivel {
  id: number
  nome: string
  indicados: Indicado[]
  totalInvestido: number
  expandido: boolean
  desbloqueado: boolean
}

export default function MinhaRede() {
  // Estado para os níveis
  const [niveis, setNiveis] = useState<Nivel[]>([
    {
      id: 1,
      nome: "Nível 1",
      totalInvestido: 8200,
      expandido: false,
      desbloqueado: true,
      indicados: [
        {
          id: "ID-78945",
          nome: "Carlos Silva",
          valorInvestido: 2500,
          status: "Ativo",
          dataEntrada: "15/04/2025",
          planoAtivo: "Hyper Gold",
          comissoesGeradas: 125,
          expandido: false,
        },
        {
          id: "ID-65432",
          nome: "Maria Oliveira",
          valorInvestido: 1000,
          status: "Ativo",
          dataEntrada: "20/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 50,
          expandido: false,
        },
        {
          id: "ID-98765",
          nome: "João Santos",
          valorInvestido: 3500,
          status: "Ativo",
          dataEntrada: "10/04/2025",
          planoAtivo: "Hyper Black",
          comissoesGeradas: 175,
          expandido: false,
        },
        {
          id: "ID-45678",
          nome: "Ana Costa",
          valorInvestido: 1200,
          status: "Inativo",
          dataEntrada: "05/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 60,
          expandido: false,
        },
      ],
    },
    {
      id: 2,
      nome: "Nível 2",
      totalInvestido: 5600,
      expandido: false,
      desbloqueado: true,
      indicados: [
        {
          id: "ID-12345",
          nome: "Pedro Almeida",
          valorInvestido: 2000,
          status: "Ativo",
          dataEntrada: "12/04/2025",
          planoAtivo: "Hyper Gold",
          comissoesGeradas: 40,
          expandido: false,
        },
        {
          id: "ID-23456",
          nome: "Lucia Ferreira",
          valorInvestido: 1800,
          status: "Ativo",
          dataEntrada: "18/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 36,
          expandido: false,
        },
        {
          id: "ID-34567",
          nome: "Roberto Martins",
          valorInvestido: 1800,
          status: "Inativo",
          dataEntrada: "22/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 36,
          expandido: false,
        },
      ],
    },
    {
      id: 3,
      nome: "Nível 3",
      totalInvestido: 3200,
      expandido: false,
      desbloqueado: true,
      indicados: [
        {
          id: "ID-56789",
          nome: "Fernanda Lima",
          valorInvestido: 1500,
          status: "Ativo",
          dataEntrada: "14/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 15,
          expandido: false,
        },
        {
          id: "ID-67890",
          nome: "Ricardo Sousa",
          valorInvestido: 1700,
          status: "Ativo",
          dataEntrada: "16/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 17,
          expandido: false,
        },
      ],
    },
    {
      id: 4,
      nome: "Nível 4",
      totalInvestido: 2800,
      expandido: false,
      desbloqueado: true,
      indicados: [
        {
          id: "ID-78901",
          nome: "Camila Rocha",
          valorInvestido: 1300,
          status: "Ativo",
          dataEntrada: "19/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 26,
          expandido: false,
        },
        {
          id: "ID-89012",
          nome: "Bruno Dias",
          valorInvestido: 1500,
          status: "Inativo",
          dataEntrada: "21/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 30,
          expandido: false,
        },
      ],
    },
    {
      id: 5,
      nome: "Nível 5",
      totalInvestido: 1500,
      expandido: false,
      desbloqueado: true,
      indicados: [
        {
          id: "ID-90123",
          nome: "Juliana Mendes",
          valorInvestido: 1500,
          status: "Ativo",
          dataEntrada: "23/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 15,
          expandido: false,
        },
      ],
    },
    {
      id: 6,
      nome: "Nível 6",
      totalInvestido: 1000,
      expandido: false,
      desbloqueado: true,
      indicados: [
        {
          id: "ID-01234",
          nome: "Marcelo Gomes",
          valorInvestido: 1000,
          status: "Ativo",
          dataEntrada: "24/04/2025",
          planoAtivo: "Hyper Silver",
          comissoesGeradas: 5,
          expandido: false,
        },
      ],
    },
    {
      id: 7,
      nome: "Nível 7",
      totalInvestido: 0,
      expandido: false,
      desbloqueado: false,
      indicados: [],
    },
    {
      id: 8,
      nome: "Nível 8",
      totalInvestido: 0,
      expandido: false,
      desbloqueado: false,
      indicados: [],
    },
  ])

  // Função para expandir/colapsar um nível
  const toggleNivel = (nivelId: number) => {
    setNiveis(
      niveis.map((nivel) => {
        if (!nivel) return nivel
        if (nivel.id === nivelId) {
          return { ...nivel, expandido: !nivel.expandido }
        }
        return nivel
      }),
    )
  }

  // Função para expandir/colapsar um indicado
  const toggleIndicado = (nivelId: number, indicadoId: string) => {
    setNiveis(
      niveis.map((nivel) => {
        if (!nivel) return nivel
        if (nivel.id === nivelId) {
          return {
            ...nivel,
            indicados: nivel.indicados.map((indicado) => {
              if (!indicado) return indicado
              if (indicado.id === indicadoId) {
                return { ...indicado, expandido: !indicado.expandido }
              }
              return indicado
            }),
          }
        }
        return nivel
      }),
    )
  }

  // Calcular o total geral da rede
  const totalGeralRede = niveis.reduce((total, nivel) => {
    if (!nivel) return total
    return total + (nivel.totalInvestido || 0)
  }, 0)

  // Calcular o total de indicados
  const totalIndicados = niveis.reduce((total, nivel) => {
    if (!nivel || !nivel.indicados) return total
    return total + nivel.indicados.length
  }, 0)

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-20">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center">
          <Users className="h-6 w-6 mr-2 text-[#66e0cc]" />
          <h1 className="text-2xl font-bold">Minha Rede</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#111] p-4 rounded-xl">
          <div className="text-sm text-gray-400">Total de Indicados</div>
          <div className="text-2xl font-bold mt-1 text-white">{totalIndicados} pessoas</div>
        </div>
        <div className="bg-[#111] p-4 rounded-xl">
          <div className="text-sm text-gray-400">Volume Total da Rede</div>
          <div className="text-2xl font-bold mt-1 text-[#66e0cc]">US$ {totalGeralRede.toLocaleString()}</div>
        </div>
      </div>

      <div className="space-y-4">
        {niveis.map((nivel) => (
          <div
            key={nivel.id}
            className={`bg-[#111] rounded-xl overflow-hidden ${!nivel.desbloqueado ? "opacity-50" : ""}`}
          >
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => nivel.desbloqueado && toggleNivel(nivel.id)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
                  <span className="text-[#66e0cc] font-bold">{nivel.id}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{nivel.nome}</h3>
                  <p className="text-sm text-gray-400">
                    {nivel.indicados.length} indicado{nivel.indicados.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <div className="text-sm text-gray-400">Total Investido</div>
                  <div className="font-bold text-[#66e0cc]">US$ {nivel.totalInvestido.toLocaleString()}</div>
                </div>
                {nivel.desbloqueado ? (
                  nivel.expandido ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )
                ) : (
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Bloqueado</span>
                )}
              </div>
            </div>

            {nivel.expandido && nivel.desbloqueado && (
              <div className="border-t border-[#222] divide-y divide-[#222]">
                {nivel.indicados.length > 0 ? (
                  nivel.indicados.map((indicado) => (
                    <div key={indicado.id} className="p-0">
                      <div
                        className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#1a1a1a]"
                        onClick={() => toggleIndicado(nivel.id, indicado.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{indicado.nome}</h4>
                            <p className="text-xs text-gray-400">{indicado.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-right mr-4">
                            <div className="text-sm">US$ {indicado.valorInvestido.toLocaleString()}</div>
                            <Badge
                              className={`text-xs ${
                                indicado.status === "Ativo"
                                  ? "bg-green-900/30 text-green-400 border-green-800"
                                  : "bg-red-900/30 text-red-400 border-red-800"
                              }`}
                            >
                              {indicado.status}
                            </Badge>
                          </div>
                          {indicado.expandido ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {indicado.expandido && (
                        <div className="bg-[#1a1a1a] p-4 text-sm">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <div className="text-gray-400">Data de Entrada</div>
                                <div>{indicado.dataEntrada}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <div className="text-gray-400">Plano Ativo</div>
                                <div>{indicado.planoAtivo}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <div className="text-gray-400">Valor Investido</div>
                                <div>US$ {indicado.valorInvestido.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <div className="text-gray-400">Comissões Geradas</div>
                                <div className="text-[#66e0cc]">US$ {indicado.comissoesGeradas.toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>Nenhum indicado neste nível</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#111] p-5 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Total Geral da Rede</div>
          <div className="text-2xl font-bold text-[#66e0cc]">US$ {totalGeralRede.toLocaleString()}</div>
        </div>
        <div className="mt-2 text-sm text-gray-400">Soma de todos os investimentos em todos os níveis da sua rede</div>
      </div>
    </div>
  )
}
