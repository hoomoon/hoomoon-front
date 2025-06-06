"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, User, Mail, Calendar, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "@/components/particles-background"

export default function AtivacaoFree() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isActivated, setIsActivated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alreadyHasFreePlan, setAlreadyHasFreePlan] = useState(false)

  // Verificar se o usuário já tem o plano ativado
  useEffect(() => {
    const checkFreePlanStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investments/plans/free/status`, {
          credentials: 'include'
        })
        
        if (response.ok) {
          const data = await response.json()
          setAlreadyHasFreePlan(data.isActivated)
          if (data.isActivated) {
            setIsActivated(true)
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status do plano:', error)
      }
    }

    checkFreePlanStatus()
  }, [])

  // Dados do plano vindos da URL
  const planData = useMemo(
    () => ({
      plan: searchParams?.get("plan") || "Plano HOO FREE",
      color: searchParams?.get("color") || "#66e0cc",
    }),
    [searchParams],
  )

  // Código de ativação gerado
  const codigoAtivacao = useMemo(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `FREE-${result}`
  }, [])

  const handleActivation = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investments/plans/free/activate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Falha ao ativar o plano')
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsActivated(true)
    } catch (error) {
      console.error('Erro ao ativar o plano:', error)
      // Aqui você pode adicionar um toast ou notificação de erro
    } finally {
      setIsLoading(false)
    }
  }

  if (isActivated) {
    return (
      <>
        {/* Fundo com partículas */}
        <div className="fixed inset-0 z-0">
          <ParticlesBackground />
        </div>

        {/* Gradientes animados */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#66e0cc]/10 blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Tela de sucesso */}
        <div className="relative z-10 min-h-screen bg-transparent text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Ícone de sucesso */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#66e0cc]/20 blur-xl animate-pulse"></div>
                <CheckCircle className="relative h-20 w-20 text-[#66e0cc] animate-bounce" />
              </div>
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-[#66e0cc]">Plano Ativado!</h1>
            <p className="text-gray-300">Seu Plano HOO FREE foi ativado com sucesso</p>

            {/* Detalhes da ativação */}
            <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Plano:</span>
                <span className="text-[#66e0cc] font-semibold">HOO FREE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Código de Ativação:</span>
                <span className="text-white font-mono">{codigoAtivacao}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-semibold">Ativo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Data de Ativação:</span>
                <span className="text-white">{new Date().toLocaleDateString("pt-BR")}</span>
              </div>
            </div>

            {/* Benefícios desbloqueados */}
            <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#66e0cc]">Benefícios Desbloqueados</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Acesso completo ao sistema</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Programa de indicações ativo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Dashboard personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Relatórios de performance</span>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3 font-bold text-black rounded-lg transition-all hover:brightness-110"
                style={{ backgroundColor: "#66e0cc" }}
              >
                Ir para Dashboard
              </Button>
              <Button
                onClick={() => router.push("/meus-investimentos")}
                variant="outline"
                className="w-full py-3 border-[#66e0cc] text-[#66e0cc] hover:bg-[#66e0cc]/10"
              >
                Ver Meus Planos
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Fundo com partículas */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Gradientes animados */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#66e0cc]/10 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen bg-transparent text-white p-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/investir" className="mr-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Ativação do Plano FREE</h1>
            <p className="text-sm text-gray-400">Confirme a ativação do seu plano gratuito</p>
          </div>
        </div>

        {/* Conteúdo centralizado */}
        <div className="max-w-2xl mx-auto">
          {/* Card do plano */}
          <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-[#66e0cc]/20 blur-xl"></div>
                <img src="/images/lua-free.png" alt="HOO FREE" className="w-full h-full object-contain relative z-10" />
              </div>
              <h2 className="text-2xl font-bold text-[#66e0cc] mb-2">Plano HOO FREE</h2>
              <p className="text-gray-400">Seu primeiro passo no ecossistema HOOMOON</p>
            </div>

            {/* Detalhes do plano */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-3 bg-[#111] rounded-lg border border-[#333]">
                <span className="text-gray-400">Investimento inicial:</span>
                <span className="text-[#66e0cc] font-semibold">Gratuito</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#111] rounded-lg border border-[#333]">
                <span className="text-gray-400">Duração:</span>
                <span className="text-white">Ilimitado</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#111] rounded-lg border border-[#333]">
                <span className="text-gray-400">Código de Ativação:</span>
                <span className="text-white font-mono">{codigoAtivacao}</span>
              </div>
            </div>

            {/* Benefícios inclusos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#66e0cc]">Benefícios Inclusos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-[#111] rounded-lg border border-[#333]">
                  <User className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Acesso ao sistema</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#111] rounded-lg border border-[#333]">
                  <Gift className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Programa de indicações</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#111] rounded-lg border border-[#333]">
                  <Mail className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Suporte via email</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#111] rounded-lg border border-[#333]">
                  <Calendar className="h-5 w-5 text-[#66e0cc]" />
                  <span className="text-sm">Relatórios básicos</span>
                </div>
              </div>
            </div>

            {/* Informações importantes */}
            <div className="bg-[#66e0cc]/10 border border-[#66e0cc]/30 rounded-lg p-4 mb-8">
              <h4 className="font-semibold text-[#66e0cc] mb-2">Informações Importantes</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• O Plano FREE não possui data de expiração</li>
                <li>• Você pode fazer upgrade para planos pagos a qualquer momento</li>
                <li>• Ganhe comissões indicando novos usuários</li>
                <li>• Acesso completo ao dashboard e ferramentas básicas</li>
              </ul>
            </div>

            {/* Botão de ativação */}
            <Button
              onClick={handleActivation}
              disabled={isLoading || alreadyHasFreePlan}
              className="w-full py-4 font-bold text-black rounded-lg transition-all hover:brightness-110"
              style={{ backgroundColor: "#66e0cc" }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Ativando...</span>
                </div>
              ) : alreadyHasFreePlan ? (
                "Plano já ativado"
              ) : (
                "Ativar Plano FREE"
              )}
            </Button>
          </div>

          {/* Próximos passos */}
          <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#66e0cc]">Próximos Passos</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#66e0cc] text-black text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <span className="text-sm">Ative seu plano FREE</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#333] text-gray-400 text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <span className="text-sm text-gray-400">Explore o dashboard e funcionalidades</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#333] text-gray-400 text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <span className="text-sm text-gray-400">Comece a indicar amigos e ganhe comissões</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#333] text-gray-400 text-xs font-bold flex items-center justify-center">
                  4
                </div>
                <span className="text-sm text-gray-400">Considere fazer upgrade para planos premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
