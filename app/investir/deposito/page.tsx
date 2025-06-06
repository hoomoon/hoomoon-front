"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Copy, Check, Info, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ParticlesBackground from "@/components/particles-background"
import toast from 'react-hot-toast'

interface DepositResponse {
  depositId: string
  planName: string
  amount: number
  paymentMethod: 'usdt_bep20' | 'pix'
  usdtWalletAddress?: string
  usdtNetwork?: string
  usdtQrCode?: string
  pixQrCodePayload?: string
  instructionMessage: string
  status?: 'PENDING' | 'CONFIRMED' | 'FAILED'
}

export default function InvestirDepositoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [metodo, setMetodo] = useState("USDT_BEP20")
  const [valor, setValor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [depositResponse, setDepositResponse] = useState<DepositResponse | null>(null)
  const [copied, setCopied] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string>("")
  const [isPolling, setIsPolling] = useState(false)

  // Constante para taxa de conversão USD -> BRL
  const USD_TO_BRL_RATE = 5.70

  // Formatadores de moeda
  const formatUSD = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const formatBRL = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  // Memoize plan data to prevent re-renders
  const planData = useMemo(() => {
    const planTitle = searchParams?.get("plan") || "Plano HOO TITAN"
    const planColor = searchParams?.get("color") || "#b14aff"
    const planMinValue = Number.parseInt(searchParams?.get("minValue") || "5")
    
    // Mapear títulos para IDs da API
    const planIdMap: Record<string, string> = {
      "Plano HOO FREE": "FREE",
      "Plano HOO PANDORA": "PANDORA", 
      "Plano HOO TITAN": "TITAN",
      "Plano HOO CALLISTO": "CALLISTO"
    }

    return {
      title: planTitle,
      color: planColor,
      minValue: planMinValue,
      id: planIdMap[planTitle] || "TITAN"
    }
  }, [searchParams])

  // Initialize valor only once
  useEffect(() => {
    if (!initialized) {
      setValor(planData.minValue.toString())
      setInitialized(true)
    }
  }, [planData.minValue, initialized])

  // Calcula o valor em BRL para exibição
  const valorEmReais = useMemo(() => {
    const valorNumerico = Number.parseFloat(valor) || 0
    return formatBRL.format(valorNumerico * USD_TO_BRL_RATE)
  }, [valor])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copiado para a área de transferência!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setValor(value)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const valorNumerico = Number.parseFloat(valor) || 0
    if (valorNumerico < planData.minValue) {
      setError(`O valor mínimo para este plano é de $${planData.minValue}.`)
      return
    }

    setIsSubmitting(true)

    try {
      const baseApi = process.env.NEXT_PUBLIC_API_URL || 'https://api.hoomoon.ai'
      
      // Sempre envia o valor em USD para a API
      const valorParaEnviar = valor

      const response = await fetch(`${baseApi}/api/investments/deposits/initiate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          planId: planData.id,
          amount: valorParaEnviar,
          paymentMethod: metodo
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || errorData.error || `Erro ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Resposta da API:', data) // Debug
      setDepositResponse(data)
      toast.success('Depósito iniciado com sucesso!')

    } catch (err: any) {
      console.error('Erro ao iniciar depósito:', err)
      const errorMessage = err.message || 'Erro inesperado ao processar sua solicitação.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const gerarCodigo = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `HOO-${result}`
  }

  const codigoGerado = useMemo(() => gerarCodigo(), [depositResponse])

  // Função para verificar o status do depósito
  const checkDepositStatus = async (depositId: string) => {
    try {
      const baseApi = process.env.NEXT_PUBLIC_API_URL || 'https://api.hoomoon.ai'
      const response = await fetch(`${baseApi}/api/deposits/${depositId}/`, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Falha ao verificar status do depósito')
      }

      const data = await response.json()
      
      // Se o depósito foi confirmado ou falhou, para o polling
      if (data.status === 'CONFIRMED') {
        setIsPolling(false)
        toast.success('Pagamento confirmado! Redirecionando...')
        setTimeout(() => {
          router.push('/meus-investimentos')
        }, 2000)
      } else if (data.status === 'FAILED') {
        setIsPolling(false)
        toast.error('Falha no processamento do pagamento')
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error)
    }
  }

  // Inicia o polling quando o depósito é criado
  useEffect(() => {
    if (depositResponse?.depositId && !isPolling) {
      setIsPolling(true)
      
      const pollInterval = setInterval(() => {
        checkDepositStatus(depositResponse.depositId)
      }, 10000) // Verifica a cada 10 segundos

      // Limpa o intervalo após 30 minutos ou quando o componente é desmontado
      const timeoutId = setTimeout(() => {
        clearInterval(pollInterval)
        setIsPolling(false)
      }, 30 * 60 * 1000)

      return () => {
        clearInterval(pollInterval)
        clearTimeout(timeoutId)
        setIsPolling(false)
      }
    }
  }, [depositResponse?.depositId])

  if (depositResponse) {
    return (
      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <ParticlesBackground />
        </div>

        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">
          <div className="max-w-md mx-auto mt-8 animate-in fade-in duration-500">
            <Card className="border-none shadow-md bg-[#101010] border border-gray-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#66e0cc]/20 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8 text-[#66e0cc]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Depósito iniciado com sucesso!</h2>
                  
                  <div className="text-left space-y-2 bg-[#1a1a1a] p-4 rounded-lg">
                    <p className="text-gray-300">
                      <strong>Plano:</strong> {depositResponse.planName}
                    </p>
                    <p className="text-gray-300">
                      <strong>Valor:</strong> {depositResponse.paymentMethod === 'pix' 
                        ? `R$ ${formatBRL.format(depositResponse.amount)}` 
                        : `$ ${formatUSD.format(depositResponse.amount)}`}
                    </p>
                    <p className="text-gray-300">
                      <strong>Código:</strong> {depositResponse.depositId}
                    </p>
                    <p className="text-gray-300">
                      <strong>Método:</strong> {depositResponse.paymentMethod === 'usdt_bep20' ? 'USDT - BEP20' : 'PIX'}
                    </p>
                  </div>

                  {depositResponse.paymentMethod === 'usdt_bep20' && depositResponse.usdtWalletAddress && (
                    <div className="space-y-4">
                      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-white">Endereço da Carteira</h3>
                          <span className="text-xs text-gray-400">Rede: {depositResponse.usdtNetwork}</span>
                        </div>

                        <div className="relative">
                          <Input
                            value={depositResponse.usdtWalletAddress}
                            readOnly
                            className="pr-10 bg-[#0d0d0d] border-gray-700 text-white"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            onClick={() => handleCopy(depositResponse.usdtWalletAddress!)}
                          >
                            {copied ? <Check size={16} className="text-[#66e0cc]" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>

                      {depositResponse.usdtQrCode && (
                        <div className="flex justify-center">
                          <div className="w-48 h-48 bg-white p-2 rounded-lg border border-gray-700">
                            <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                              <img
                                src={depositResponse.usdtQrCode}
                                alt="QR Code para USDT"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <Alert className="bg-[#451a03] text-amber-300 border-amber-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Envie apenas USDT na rede {depositResponse.usdtNetwork} para este endereço. 
                          Outras redes ou moedas podem resultar em perda de fundos.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {depositResponse.paymentMethod === 'pix' && depositResponse.pixQrCodePayload && (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-white p-2 rounded-lg border border-gray-700">
                          <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(depositResponse.pixQrCodePayload)}`}
                              alt="QR Code para PIX"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                        <div className="mb-2">
                          <h3 className="font-medium text-white">Chave PIX</h3>
                        </div>

                        <div className="relative">
                          <Input
                            value={depositResponse.pixQrCodePayload}
                            readOnly
                            className="pr-10 bg-[#0d0d0d] border-gray-700 text-white text-center"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            onClick={() => handleCopy(depositResponse.pixQrCodePayload!)}
                          >
                            {copied ? <Check size={16} className="text-[#66e0cc]" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <Alert className="bg-[#172554] text-blue-300 border-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {depositResponse.instructionMessage}
                      {isPolling && (
                        <div className="mt-2 flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>
                            Aguardando confirmação do pagamento... 
                            {depositResponse.paymentMethod === 'pix' 
                              ? 'Pode levar até 5 minutos para a confirmação'
                              : 'Pode levar até 10 minutos para a confirmação'
                            }
                          </span>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4 space-y-3">
                    <Button
                      onClick={() => router.push("/meus-investimentos")}
                      className="w-full bg-[#66e0cc] hover:bg-[#50c4b0] text-black"
                    >
                      Ver Meus Investimentos
                    </Button>
                    <Button
                      onClick={() => router.push("/investir")}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Fazer Outro Investimento
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">
        <div className="animate-in fade-in duration-500">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 text-white hover:bg-gray-800"
              onClick={() => router.push("/investir")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Investir em {planData.title}</h1>
              <p className="text-sm text-gray-400">Complete seu investimento</p>
            </div>
          </div>

          <Card className="border-none shadow-md bg-[#101010] border border-gray-800 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: planData.color }}>
                    {planData.title}
                  </h3>
                  <p className="text-gray-400">Investimento mínimo: $ {planData.minValue}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${planData.color}20` }}
                >
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: planData.color }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-[#101010] border border-gray-800">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {error && (
                    <Alert className="bg-red-900/20 text-red-400 border-red-800">
                      <Info className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <Label htmlFor="metodo" className="text-white">
                      Selecionar método de pagamento
                    </Label>
                    <Select value={metodo} onValueChange={setMetodo}>
                      <SelectTrigger className="mt-1 bg-[#1a1a1a] border-gray-700 text-white">
                        <SelectValue placeholder="Selecione um método" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-gray-700 text-white">
                        <SelectItem value="USDT_BEP20">USDT - BEP20</SelectItem>
                        <SelectItem value="PIX">PIX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="valor" className="text-white">
                      Valor do investimento {metodo === 'PIX' ? '(USD)' : ''} (mínimo $ {planData.minValue})
                    </Label>
                    <Input
                      id="valor"
                      type="number"
                      min={planData.minValue}
                      step="0.01"
                      value={valor}
                      onChange={handleValorChange}
                      className="mt-1 bg-[#1a1a1a] border-gray-700 text-white"
                      placeholder={`Ex: ${planData.minValue}.00`}
                      required
                      disabled={isSubmitting}
                    />
                    {metodo === 'PIX' && valor && (
                      <p className="mt-2 text-sm text-gray-400">
                        Valor em BRL: R$ {valorEmReais}
                      </p>
                    )}
                    <div className="flex justify-between mt-2">
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("100")}>
                        $ {formatUSD.format(100)}
                      </button>
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("500")}>
                        $ {formatUSD.format(500)}
                      </button>
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("1000")}>
                        $ {formatUSD.format(1000)}
                      </button>
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("5000")}>
                        $ {formatUSD.format(5000)}
                      </button>
                    </div>
                  </div>

                  <Alert className="bg-[#172554] text-blue-300 border-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {metodo === 'PIX' 
                        ? `Após confirmar, você receberá um QR Code para pagamento de R$ ${valorEmReais} via PIX.`
                        : 'Após confirmar, você receberá as instruções de pagamento para completar seu investimento. Certifique-se de usar a rede BEP20 (Binance Smart Chain).'
                      }
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    className="w-full text-black font-bold transition-all hover:brightness-110"
                    style={{ backgroundColor: planData.color }}
                    disabled={!valor || Number.parseFloat(valor) < planData.minValue || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </div>
                    ) : (
                      `Confirmar Investimento de ${metodo === 'PIX' 
                        ? `R$ ${valorEmReais}` 
                        : `$ ${formatUSD.format(Number(valor))}`}`
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}