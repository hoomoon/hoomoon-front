"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Copy, Check, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ParticlesBackground from "@/components/particles-background"

export default function InvestirDepositoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [metodo, setMetodo] = useState("usdt")
  const [valor, setValor] = useState("")
  const [confirmado, setConfirmado] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Memoize plan data to prevent re-renders
  const planData = useMemo(() => {
    const planTitle = searchParams.get("plan") || "Plano HOO TITAN"
    const planColor = searchParams.get("color") || "#b14aff"
    const planMinValue = Number.parseInt(searchParams.get("minValue") || "5")

    return {
      title: planTitle,
      color: planColor,
      minValue: planMinValue,
    }
  }, [searchParams])

  // Initialize valor only once
  useEffect(() => {
    if (!initialized) {
      setValor(planData.minValue.toString())
      setInitialized(true)
    }
  }, [planData.minValue, initialized])

  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"
  const pixKey = "123.456.789-00"

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setValor(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const valorNumerico = Number.parseFloat(valor) || 0
    if (valorNumerico < planData.minValue) {
      alert(`O valor mínimo para este plano é de $${planData.minValue}.`)
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setConfirmado(true)
    }, 1500)
  }

  const gerarCodigo = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `HOO-${result}`
  }

  const codigoGerado = useMemo(() => gerarCodigo(), [confirmado])

  if (confirmado) {
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
                  <h2 className="text-xl font-bold text-white">Investimento registrado com sucesso!</h2>
                  <div className="text-left space-y-2 bg-[#1a1a1a] p-4 rounded-lg">
                    <p className="text-gray-300">
                      <strong>Plano:</strong> {planData.title}
                    </p>
                    <p className="text-gray-300">
                      <strong>Valor:</strong> ${valor}
                    </p>
                    <p className="text-gray-300">
                      <strong>Código:</strong> {codigoGerado}
                    </p>
                    <p className="text-gray-300">
                      <strong>Método:</strong> {metodo === "usdt" ? "USDT - BEP20" : "PIX"}
                    </p>
                  </div>
                  <p className="text-gray-400">
                    Aguardando confirmação da transação. Você receberá uma notificação quando o investimento for
                    confirmado e ativado.
                  </p>

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
                  <p className="text-gray-400">Investimento mínimo: ${planData.minValue}</p>
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
                  <div>
                    <Label htmlFor="metodo" className="text-white">
                      Selecionar método de pagamento
                    </Label>
                    <Select value={metodo} onValueChange={setMetodo}>
                      <SelectTrigger className="mt-1 bg-[#1a1a1a] border-gray-700 text-white">
                        <SelectValue placeholder="Selecione um método" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-gray-700 text-white">
                        <SelectItem value="usdt">USDT - BEP20</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="valor" className="text-white">
                      Valor do investimento (mínimo ${planData.minValue})
                    </Label>
                    <Input
                      id="valor"
                      type="number"
                      min={planData.minValue}
                      value={valor}
                      onChange={handleValorChange}
                      className="mt-1 bg-[#1a1a1a] border-gray-700 text-white"
                      placeholder={`Ex: ${planData.minValue}.00`}
                      required
                    />
                    <div className="flex justify-between mt-2">
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("100")}>
                        $100
                      </button>
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("500")}>
                        $500
                      </button>
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("1000")}>
                        $1000
                      </button>
                      <button type="button" className="text-xs text-[#66e0cc]" onClick={() => setValor("5000")}>
                        $5000
                      </button>
                    </div>
                  </div>

                  {metodo === "usdt" && (
                    <div className="space-y-4">
                      <Alert className="bg-[#172554] text-blue-300 border-blue-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Envie exatamente o valor em <strong>USDT via BEP20</strong> para o endereço abaixo:
                        </AlertDescription>
                      </Alert>

                      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-white">Endereço da Carteira</h3>
                          <span className="text-xs text-gray-400">Rede: BEP20 (BSC)</span>
                        </div>

                        <div className="relative">
                          <Input
                            value={walletAddress}
                            readOnly
                            className="pr-10 bg-[#0d0d0d] border-gray-700 text-white"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            onClick={() => handleCopy(walletAddress)}
                          >
                            {copied ? <Check size={16} className="text-[#66e0cc]" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-white p-2 rounded-lg border border-gray-700">
                          <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(walletAddress)}`}
                              alt="QR Code para USDT"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-[#451a03] text-amber-300 border-amber-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Envie apenas USDT na rede BEP20 (Binance Smart Chain) para este endereço. Outras redes ou
                          moedas podem resultar em perda de fundos.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {metodo === "pix" && (
                    <div className="space-y-4">
                      <Alert className="bg-[#172554] text-blue-300 border-blue-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription>Faça um PIX para a chave abaixo:</AlertDescription>
                      </Alert>

                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-white p-2 rounded-lg border border-gray-700">
                          <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pixKey)}`}
                              alt="QR Code para PIX"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                        <div className="mb-2">
                          <h3 className="font-medium text-white">Chave PIX (CPF)</h3>
                        </div>

                        <div className="relative">
                          <Input
                            value={pixKey}
                            readOnly
                            className="pr-10 bg-[#0d0d0d] border-gray-700 text-white text-center"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            onClick={() => handleCopy(pixKey)}
                          >
                            {copied ? <Check size={16} className="text-[#66e0cc]" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>

                      <Alert className="bg-[#451a03] text-amber-300 border-amber-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Após realizar o pagamento via PIX, seu investimento será ativado automaticamente em até 5
                          minutos.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full text-black font-bold transition-all hover:brightness-110"
                    style={{ backgroundColor: planData.color }}
                    disabled={!valor || Number.parseFloat(valor) < planData.minValue || isSubmitting}
                  >
                    {isSubmitting ? "Processando..." : `Confirmar Investimento de $${valor}`}
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
