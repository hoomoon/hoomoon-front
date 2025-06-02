"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

export default function DepositoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Dados de exemplo para a tabela
  const depositos = [
    {
      id: 1,
      usuario: "João Silva",
      valor: 100.0,
      data: "20/05/2025",
      status: "Pendente",
    },
    {
      id: 2,
      usuario: "Maria Oliveira",
      valor: 500.0,
      data: "19/05/2025",
      status: "Confirmado",
    },
    {
      id: 3,
      usuario: "Carlos Santos",
      valor: 250.0,
      data: "18/05/2025",
      status: "Confirmado",
    },
  ]

  const handleNovoDeposito = () => {
    setIsLoading(true)
    router.push("/deposito/novo")
  }

  // Função para determinar a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "text-yellow-400"
      case "Confirmado":
        return "text-green-400"
      case "Rejeitado":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  // Calcular totais
  const totalDepositos = depositos.filter((dep) => dep.status === "Confirmado").reduce((acc, dep) => acc + dep.valor, 0)

  const depositosPendentes = depositos
    .filter((dep) => dep.status === "Pendente")
    .reduce((acc, dep) => acc + dep.valor, 0)

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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Depósitos</h1>
          </div>
          <Button
            onClick={handleNovoDeposito}
            className="bg-[#66e0cc] hover:bg-[#50c4b0] text-black"
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isLoading ? "Carregando..." : "Novo Depósito"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#101010] p-6 rounded-2xl shadow-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Total de Depósitos</h2>
            <p className="text-3xl font-bold text-green-400">$ {totalDepositos.toFixed(2)}</p>
          </div>
          <div className="bg-[#101010] p-6 rounded-2xl shadow-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Depósitos Pendentes</h2>
            <p className="text-3xl font-bold text-yellow-400">$ {depositosPendentes.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-[#0d0d0d] p-6 rounded-2xl shadow-lg border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Histórico de Depósitos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-2">Usuário</th>
                  <th className="py-3 px-2">Valor</th>
                  <th className="py-3 px-2">Data</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {depositos.length > 0 ? (
                  depositos.map((deposito) => (
                    <tr key={deposito.id} className="border-b border-gray-800">
                      <td className="py-3 px-2">{deposito.usuario}</td>
                      <td className="py-3 px-2">$ {deposito.valor.toFixed(2)}</td>
                      <td className="py-3 px-2">{deposito.data}</td>
                      <td className={`py-3 px-2 ${getStatusColor(deposito.status)}`}>{deposito.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      Nenhum depósito encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
