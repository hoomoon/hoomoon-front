"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Check } from "lucide-react"

export default function PaginaAfiliados() {
  const router = useRouter()
  const [copiado, setCopiado] = useState(false)

  const linkAfiliado = "https://seudominio.com/?ref=usuario123"

  const copiarLink = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      console.error("Clipboard API não disponível")
      return
    }

    try {
      await navigator.clipboard.writeText(linkAfiliado)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (error) {
      console.error("Erro ao copiar link:", error)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Programa de Afiliados</h1>
      </div>

      <div className="space-y-6">
        <Card className="border-none shadow-md bg-blue-50">
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 mb-3">
              Compartilhe seu link de indicação e ganhe comissões em múltiplos níveis. O bônus é liberado
              instantaneamente após ativação do indicado.
            </p>
            <div className="flex items-center justify-between bg-white border rounded-md p-2">
              <span className="text-sm break-all">{linkAfiliado}</span>
              <Button onClick={copiarLink} size="sm" className="ml-3 bg-blue-600 hover:bg-blue-700">
                {copiado ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
            {copiado && <p className="text-green-600 text-sm mt-2">Link copiado com sucesso!</p>}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Recompensas por Plano</h2>

          <Card className="border-none shadow-sm bg-gray-100">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-600">🔹 Hyper Silver</h3>
              <p className="text-sm">
                1º Nível: <strong>5%</strong>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-yellow-100">
            <CardContent className="p-4">
              <h3 className="font-semibold text-yellow-700">🔸 Hyper Gold</h3>
              <p className="text-sm">
                1º Nível: <strong>7%</strong>
              </p>
              <p className="text-sm">
                2º Nível: <strong>2%</strong>
              </p>
              <p className="text-sm">
                3º Nível: <strong>1%</strong>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-black text-white">
            <CardContent className="p-4">
              <h3 className="font-semibold">🖤 Hyper Black</h3>
              <p className="text-sm">
                1º Nível: <strong>10%</strong>
              </p>
              <p className="text-sm">
                2º Nível: <strong>5%</strong>
              </p>
              <p className="text-sm">
                3º Nível: <strong>3%</strong>
              </p>
              <p className="text-sm">
                4º Nível: <strong>2%</strong>
              </p>
              <p className="text-sm">
                5º Nível: <strong>1%</strong>
              </p>
              <p className="text-sm">
                6º Nível: <strong>0,5%</strong>
              </p>
              <p className="text-sm">
                8º Nível: <strong>0,5%</strong>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">🔓 Regras de Desbloqueio</h2>

          <Card className="border-none shadow-sm bg-gray-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-600">Hyper Silver</h3>
              <p className="text-sm">✅ Acesso automático após ativação de qualquer Membership</p>
              <p className="text-sm">✅ 1º Nível: 5%</p>
              <p className="text-sm text-gray-600">📌 Não exige equipe ou volume inicial</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-yellow-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-yellow-700">Hyper Gold</h3>
              <p className="text-sm">✅ Pelo menos 3 diretos ativos</p>
              <p className="text-sm">✅ Volume da equipe até o 3º nível: $250 ou mais</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-black text-white">
            <CardContent className="p-4">
              <h3 className="font-semibold">Hyper Black</h3>
              <p className="text-sm">✅ 5 diretos ativos</p>
              <p className="text-sm">✅ Volume da equipe até o 5º nível: $500 ou mais</p>
              <p className="text-sm">✅ Pelo menos 1 direto com nível Gold</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-gray-50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">
                💡 As comissões são acreditadas instantaneamente após ativação do indicado. O volume da equipe considera
                todos os pacotes ativos, independente do plano. O sistema realiza upgrade automático assim que os
                critérios forem cumpridos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
