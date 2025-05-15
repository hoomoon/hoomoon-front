"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Copy, Check, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DepositoPage() {
  const router = useRouter()
  const [metodo, setMetodo] = useState("usdt")
  const [valor, setValor] = useState("")
  const [confirmado, setConfirmado] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"
  const pixKey = "123.456.789-00"

  const handleCopy = (text: string) => {
    if (!text || typeof navigator === "undefined" || !navigator.clipboard) return

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    if (!e || !e.target) return

    const value = e.target.value.replace(/[^0-9.]/g, "")
    setValor(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    const valorNumerico = valor ? Number.parseFloat(valor) : 0
    if (!valor || valorNumerico < 5) {
      alert("O valor mínimo para depósito é de 5 dólares.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Depósito registrado:", {
        metodo,
        valor,
      })
      setIsSubmitting(false)
      setConfirmado(true)
    }, 1500)
  }

  if (confirmado) {
    return (
      <div className="max-w-md mx-auto mt-8 animate-in fade-in duration-500">
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#66e0cc]/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-[#66e0cc]" />
              </div>
              <h2 className="text-xl font-bold">Depósito registrado com sucesso!</h2>
              <p className="text-gray-500">
                Aguardando confirmação da transação na blockchain ou via PIX. Você receberá uma notificação quando o
                depósito for confirmado.
              </p>

              <div className="pt-4">
                <Link href="/">
                  <Button className="w-full bg-[#66e0cc] hover:bg-[#50c4b0] text-black">Voltar para o Dashboard</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Fazer Depósito</h1>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="metodo">Selecionar método de depósito</Label>
                <Select value={metodo} onValueChange={setMetodo}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione um método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdt">USDT - BEP20</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="valor">Valor a depositar (mínimo $5)</Label>
                <Input
                  id="valor"
                  type="number"
                  min="5"
                  value={valor}
                  onChange={handleValorChange}
                  className="mt-1"
                  placeholder="Ex: 100.00"
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
                  <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Envie exatamente o valor em <strong>USDT via BEP20</strong> para o endereço abaixo:
                    </AlertDescription>
                  </Alert>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Endereço da Carteira</h3>
                      <span className="text-xs text-gray-500">Rede: BEP20 (BSC)</span>
                    </div>

                    <div className="relative">
                      <Input value={walletAddress} readOnly className="pr-10 bg-white" />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => handleCopy(walletAddress)}
                      >
                        {copied ? <Check size={16} className="text-[#66e0cc]" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-48 h-48 bg-white p-2 rounded-lg border">
                      <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(walletAddress)}`}
                          alt="QR Code para USDT"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Envie apenas USDT na rede BEP20 (Binance Smart Chain) para este endereço. Outras redes ou moedas
                      podem resultar em perda de fundos.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {metodo === "pix" && (
                <div className="space-y-4">
                  <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                    <Info className="h-4 w-4" />
                    <AlertDescription>Faça um PIX para a chave abaixo:</AlertDescription>
                  </Alert>

                  <div className="flex justify-center">
                    <div className="w-48 h-48 bg-white p-2 rounded-lg border">
                      <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pixKey)}`}
                          alt="QR Code para PIX"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-2">
                      <h3 className="font-medium">Chave PIX (CPF)</h3>
                    </div>

                    <div className="relative">
                      <Input value={pixKey} readOnly className="pr-10 bg-white text-center" />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => handleCopy(pixKey)}
                      >
                        {copied ? <Check size={16} className="text-[#66e0cc]" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Após realizar o pagamento via PIX, seu saldo será creditado automaticamente em até 5 minutos.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#66e0cc] hover:bg-[#50c4b0] text-black"
                disabled={!valor || Number.parseFloat(valor) < 5 || isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Confirmar Depósito"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
