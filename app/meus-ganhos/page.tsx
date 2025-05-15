"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dados mockados para os ganhos
const MOCK_GANHOS = [
  {
    tipo: "Indicação",
    origem: "João Silva",
    descricao: "Comissão de indicação nível 1",
    valor: 5.0,
    status: "Confirmado",
    data: "2025-05-14 14:20",
  },
  {
    tipo: "Rendimento",
    origem: "Plano MULTIPLIER",
    descricao: "Rendimento diário",
    valor: 3.24,
    status: "Confirmado",
    data: "2025-05-14 08:00",
  },
  {
    tipo: "Estorno",
    origem: "Sistema",
    descricao: "Estorno por falha na transação",
    valor: -2.0,
    status: "Confirmado",
    data: "2025-05-13 17:42",
  },
  {
    tipo: "Bônus",
    origem: "Programa de Fidelidade",
    descricao: "Bônus por atingir meta de indicações",
    valor: 10.0,
    status: "Pendente",
    data: "2025-05-13 09:15",
  },
  {
    tipo: "Indicação",
    origem: "Maria Oliveira",
    descricao: "Comissão de indicação nível 2",
    valor: 2.5,
    status: "Confirmado",
    data: "2025-05-12 16:30",
  },
  {
    tipo: "Rendimento",
    origem: "Plano DOGE FLASH",
    descricao: "Rendimento diário",
    valor: 1.8,
    status: "Confirmado",
    data: "2025-05-12 08:00",
  },
  {
    tipo: "Cashback",
    origem: "Depósito #12345",
    descricao: "Cashback de 2% sobre depósito",
    valor: 2.0,
    status: "Confirmado",
    data: "2025-05-11 10:25",
  },
  {
    tipo: "Indicação",
    origem: "Carlos Mendes",
    descricao: "Comissão de indicação nível 3",
    valor: 1.5,
    status: "Cancelado",
    data: "2025-05-10 13:45",
  },
]

// Função para formatar a data
function formatarData(dataString: string): string {
  const data = new Date(dataString)
  return data
    .toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", " às")
}

export default function MeusGanhos() {
  const [ganhos, setGanhos] = useState<any[]>([])
  const [totalGanhos, setTotalGanhos] = useState(0)

  useEffect(() => {
    if (MOCK_GANHOS && Array.isArray(MOCK_GANHOS)) {
      setGanhos(MOCK_GANHOS)

      // Calcular o total de ganhos confirmados
      const total = MOCK_GANHOS.filter((item) => item && item.status === "Confirmado").reduce(
        (acc, item) => acc + (item.valor || 0),
        0,
      )
      setTotalGanhos(total)
    } else {
      setGanhos([])
      setTotalGanhos(0)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6 pb-20">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Meus Ganhos</h1>
          <p className="text-sm text-gray-400">Extrato completo dos rendimentos, indicações e estornos</p>
        </div>
      </div>

      {/* Resumo de ganhos */}
      <div className="bg-[#111] rounded-xl p-4 mb-6">
        <div>
          <div className="text-sm text-gray-400">Total de Ganhos Confirmados</div>
          <div className="text-2xl font-bold text-[#66e0cc]">US$ {totalGanhos.toFixed(2)}</div>
        </div>
      </div>

      <div className="space-y-4">
        {ganhos && ganhos.length > 0 ? (
          ganhos.map((item, index) => (
            <div key={index} className="bg-[#111] p-4 rounded-xl shadow border border-[#1f1f1f]">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-bold">{item?.tipo || "Desconhecido"}</div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item?.status === "Confirmado"
                      ? "bg-green-700"
                      : item?.status === "Pendente"
                        ? "bg-yellow-600 text-black"
                        : "bg-gray-600"
                  }`}
                >
                  {item?.status || "Desconhecido"}
                </span>
              </div>

              <div className="text-sm text-gray-400 mb-1">
                Origem: <span className="text-white">{item?.origem || "Desconhecido"}</span>
              </div>
              <div className="text-sm text-gray-400 mb-1">
                Descrição: <span className="text-white">{item?.descricao || "Sem descrição"}</span>
              </div>
              <div className="text-sm text-gray-400 mb-1">
                Data: <span className="text-white">{item?.data ? formatarData(item.data) : "Data desconhecida"}</span>
              </div>
              <div className={`text-lg font-bold ${(item?.valor || 0) >= 0 ? "text-[#66e0cc]" : "text-red-500"}`}>
                {(item?.valor || 0) >= 0 ? "+" : ""}${(item?.valor || 0).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#111] p-4 rounded-xl text-center">
            <p className="text-gray-400">Nenhum ganho encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
