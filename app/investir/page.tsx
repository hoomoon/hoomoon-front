// app/investir/page.tsx
"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "@/components/particles-background"
import { useRouter } from "next/navigation"

// Interface para cada plano conforme esperado pela API
interface Plan {
  id: string
  title: string
  imageSrc: string
  features: string[]
  color: string
  tag?: string
  minValue: number
}

// Componente para cada card de plano
interface PlanCardProps {
  plan: Plan
  onClick: (plan: Plan) => void
}

const PlanCard = ({ plan, onClick }: PlanCardProps) => {
  const { title, imageSrc, features, color, tag } = plan
  return (
    <div
      className="relative flex flex-col justify-between items-center h-full bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(102,224,204,0.15)] hover:border-[#66e0cc]/30 overflow-hidden group cursor-pointer"
      onClick={() => onClick(plan)}
    >
      {/* Gradiente de fundo */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      ></div>

      {/* Tag (se houver) */}
      {tag && (
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold z-10"
          style={{ backgroundColor: `${color}30`, color: color }}
        >
          {tag}
        </div>
      )}

      {/* Conteúdo central (imagem, título, características) */}
      <div className="flex flex-col items-center">
        {/* Imagem centralizada */}
        <div className="w-48 h-48 mb-6 transition-transform duração-500 group-hover:scale-110 relative">
          <div className="absolute inset-0 rounded-full opacity-20 blur-xl" style={{ background: color }}></div>
          <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-contain relative z-10" />
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold mb-4 text-center" style={{ color }}>
          {title}
        </h3>

        {/* Lista de características */}
        <ul className="text-gray-300 space-y-2 w-full">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-[#66e0cc]">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botão de investir, sempre no canto inferior central */}
      <button
        className="w-full py-3 font-bold rounded-lg mt-6 transition-all duração-300 hover:brightness-110"
        style={{ backgroundColor: color, color: "#000" }}
      >
        {title.includes("FREE") ? "Ativar Agora" : "Investir"}
      </button>
    </div>
  )
}

export default function Investir() {
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Consome o endpoint de planos do backend usando variável de ambiente
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar planos: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        // Espera-se que a API retorne um array de objetos Plan
        setPlans(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Não foi possível carregar os planos. Tente novamente mais tarde.")
        setLoading(false)
      })
  }, [])

  const handlePlanClick = (plan: Plan) => {
    if (plan.id === "FREE" || plan.title.toUpperCase().includes("FREE")) {
      // Para o plano gratuito, redirecionar para página de ativação
      const params = new URLSearchParams({
        plan: plan.title,
        color: plan.color,
      })
      router.push(`/investir/ativacao?${params.toString()}`)
    } else {
      // Para planos pagos, redirecionar para página de depósito
      const params = new URLSearchParams({
        plan: plan.title,
        color: plan.color,
        minValue: plan.minValue.toString(),
      })
      router.push(`/investir/deposito?${params.toString()}`)
    }
  }

  return (
    <>
      {/* Fundo com partículas (igual à dashboard) */}
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
        <div
          className="absolute top-3/4 right-1/3 w-[300px] h-[300px] rounded-full bg-red-500/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen bg-transparent text-white p-4 pb-20">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="mr-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Planos de Investimento</h1>
            <p className="text-sm text-gray-400">Escolha o plano ideal para seus objetivos financeiros</p>
          </div>
        </div>

        {/* Estado de carregamento e erro */}
        {loading && <p className="text-center text-gray-400">Carregando planos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Cards dos planos */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onClick={handlePlanClick} />
            ))}
          </div>
        )}

        {/* Informações adicionais */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-[#0c0c0c] border border-[#1f1f1f] rounded-xl">
          <div className="flex items-start gap-3 mb-4">
            <Info className="h-5 w-5 text-[#66e0cc] mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Informações Importantes</h3>
              <p className="text-sm text-gray-300">
                Os planos da HOOMOON oferecem diferentes oportunidades de rendimento de acordo com seu perfil de
                investidor. Todos os ganhos, incluindo rendimentos, comissões e bônus, contam para o teto de retorno
                total.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center space-x-2 p-3 bg-[#111] rounded-lg border border-[#333]">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#66e0cc]/20 text-[#66e0cc]">
                1
              </div>
              <div>
                <p className="text-sm font-medium">Escolha um plano</p>
                <p className="text-xs text-gray-400">Selecione o plano que melhor atende suas necessidades</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-[#111] rounded-lg border border-[#333]">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#66e0cc]/20 text-[#66e0cc]">
                2
              </div>
              <div>
                <p className="text-sm font-medium">Faça seu investimento</p>
                <p className="text-xs text-gray-400">Invista via USDT, PIX ou saldo disponível</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-[#111] rounded-lg border border-[#333]">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#66e0cc]/20 text-[#66e0cc]">
                3
              </div>
              <div>
                <p className="text-sm font-medium">Receba recompensas diárias</p>
                <p className="text-xs text-gray-400">Acompanhe seus rendimentos no dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-[#111] rounded-lg border border-[#333]">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#66e0cc]/20 text-[#66e0cc]">
                4
              </div>
              <div>
                <p className="text-sm font-medium">Realize saques programados</p>
                <p className="text-xs text-gray-400">Saque seus ganhos conforme a programação do plano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
