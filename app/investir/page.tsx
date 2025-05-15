"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

function gerarCodigo() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `HOO-${result}`
}

export default function Investir() {
  const [modalPlano, setModalPlano] = useState(null)
  const [valorSimulado, setValorSimulado] = useState(0)
  const [planoSelecionado, setPlanoSelecionado] = useState(null)

  const planos = [
    {
      id: "FREE",
      nome: "🆓 HOO FREE",
      tag: "",
      descricao: [
        "Plano gratuito para novos usuários",
        "Acesso ao sistema e recompensas de indicação",
        "Não requer investimento",
      ],
      percentual: 0,
      duracao: 0,
      teto: 0,
    },
    {
      id: "DIAMOND",
      nome: "💎 HOO DIAMOND",
      tag: "Popular",
      descricao: [
        "Locação mínima: $5",
        "Duração: 40 dias",
        "Retorno total: 140%",
        "Recompensa diária: 3.5%",
        "Saque disponível a cada 3 dias",
      ],
      aviso: "Todos os ganhos (rendimentos + comissões + bônus) contam no teto de 140%",
      percentual: 3.5,
      duracao: 40,
      teto: 140,
    },
    {
      id: "IMPERIAL",
      nome: "👑 HOO IMPERIAL",
      tag: "Premium",
      descricao: [
        "Locação mínima: $10",
        "Duração: 40 dias",
        "Retorno total: 160%",
        "Recompensa diária: 4.57%",
        "Saque disponível a cada 10 dias",
      ],
      aviso: "Todos os ganhos (rendimentos + comissões + bônus) contam no teto de 160%",
      percentual: 4.57,
      duracao: 40,
      teto: 160,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-20 space-y-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Investir</h1>
          <p className="text-sm text-gray-400">Escolha um plano para iniciar seus rendimentos com a HOOMOON</p>
        </div>
      </div>

      {/* Simulador */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#1f1f1f] hover:border-[#333] transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="h-5 w-5 text-[#66e0cc]" />
          <h2 className="text-lg font-semibold">Simulador de Rendimento</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Selecione um plano</label>
            <select
              className="w-full p-3 rounded-lg bg-black border border-[#333] text-white focus:border-[#66e0cc] focus:outline-none transition-colors"
              onChange={(e) => setPlanoSelecionado(planos.find((p) => p.id === e.target.value))}
            >
              <option value="">Escolha um plano</option>
              {planos
                .filter((p) => p.id !== "FREE")
                .map((p, i) => (
                  <option key={i} value={p.id}>
                    {p.nome.replace(/^[^ ]+ /, "")}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Valor do investimento</label>
            <input
              type="number"
              placeholder="Digite o valor que deseja investir"
              className="w-full p-3 rounded-lg bg-black border border-[#333] text-white focus:border-[#66e0cc] focus:outline-none transition-colors"
              onChange={(e) => setValorSimulado(Number(e.target.value))}
            />
          </div>
        </div>

        {planoSelecionado && valorSimulado > 0 && (
          <div className="mt-5 p-4 bg-[#1a1a1a] rounded-lg border border-[#333] space-y-3">
            <h3 className="font-semibold text-[#66e0cc]">Resultados da Simulação</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#222] p-3 rounded-lg">
                <p className="text-xs text-gray-400">Recompensa diária</p>
                <p className="text-xl font-bold text-[#66e0cc]">
                  ${((valorSimulado * planoSelecionado.percentual) / 100).toFixed(2)}
                </p>
              </div>
              <div className="bg-[#222] p-3 rounded-lg">
                <p className="text-xs text-gray-400">Duração do plano</p>
                <p className="text-xl font-bold text-white">{planoSelecionado.duracao} dias</p>
              </div>
              <div className="bg-[#222] p-3 rounded-lg">
                <p className="text-xs text-gray-400">Retorno total estimado</p>
                <p className="text-xl font-bold text-[#66e0cc]">
                  ${((valorSimulado * planoSelecionado.teto) / 100).toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-xs text-[#66e0cc] font-semibold bg-[#66e0cc]/10 p-2 rounded-lg">
              ⚠️ Todos os ganhos contam no teto de {planoSelecionado.teto}%
            </p>

            <button
              className="w-full py-3 font-bold text-black rounded-lg transition-all hover:brightness-110 mt-2"
              style={{ backgroundColor: "#66e0cc" }}
              onClick={() => setModalPlano(planoSelecionado)}
            >
              Investir ${valorSimulado.toFixed(2)} no {planoSelecionado.nome.replace(/^[^ ]+ /, "")}
            </button>
          </div>
        )}
      </div>

      {/* Planos */}
      {planos.map((plano, index) => (
        <div
          key={index}
          className="bg-[#111] p-6 rounded-xl border border-[#1f1f1f] hover:border-[#333] transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold">{plano.nome}</h2>
            {plano.tag && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  plano.tag === "Popular" ? "bg-[#66e0cc]/20 text-[#66e0cc]" : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {plano.tag}
              </span>
            )}
          </div>

          <ul className="text-sm text-gray-300 space-y-2 mb-3">
            {plano.descricao.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {plano.aviso && (
            <p className="text-xs text-[#66e0cc] font-semibold mb-4 bg-[#66e0cc]/10 p-2 rounded-lg">⚠️ {plano.aviso}</p>
          )}

          <button
            className="w-full py-3 font-bold text-black rounded-lg transition-all hover:brightness-110"
            style={{ backgroundColor: "#66e0cc" }}
            onClick={() => setModalPlano(plano)}
          >
            {plano.id === "FREE" ? "Ativar Agora" : `Investir no ${plano.nome.replace(/^[^ ]+ /, "")}`}
          </button>
        </div>
      ))}

      {/* Modal de confirmação */}
      {modalPlano && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-md text-white space-y-4 border border-[#1f1f1f] animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold">
              {modalPlano.id === "FREE" ? "Ativação de Plano" : "Confirmação de Investimento"}
            </h2>
            <p>
              <strong>Plano:</strong> {modalPlano.nome}
            </p>
            <p>
              <strong>ID da transação:</strong> {gerarCodigo()}
            </p>

            {modalPlano.id !== "FREE" && (
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Valor do investimento</label>
                <input
                  type="number"
                  defaultValue={valorSimulado > 0 ? valorSimulado : ""}
                  placeholder={`Mínimo $${modalPlano.id === "DIAMOND" ? "5" : "10"}`}
                  className="w-full p-3 rounded-lg bg-black border border-[#333] text-white mb-4 focus:border-[#66e0cc] focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-3 mt-4">
              {modalPlano.id !== "FREE" && (
                <>
                  <button
                    className="w-full py-3 font-bold text-black rounded-lg transition-all hover:brightness-110"
                    style={{ backgroundColor: "#66e0cc" }}
                  >
                    Depositar via USDT
                  </button>
                  <button
                    className="w-full py-3 font-bold text-black rounded-lg transition-all hover:brightness-110"
                    style={{ backgroundColor: "#66e0cc" }}
                  >
                    Depositar via PIX
                  </button>
                  <button
                    className="w-full py-3 font-bold text-black rounded-lg transition-all hover:brightness-110"
                    style={{ backgroundColor: "#66e0cc" }}
                  >
                    Pagar com Saldo
                  </button>
                </>
              )}

              {modalPlano.id === "FREE" && (
                <button
                  className="w-full py-3 font-bold text-black rounded-lg transition-all hover:brightness-110"
                  style={{ backgroundColor: "#66e0cc" }}
                >
                  Confirmar Ativação
                </button>
              )}
            </div>

            <button
              className="w-full mt-2 py-3 text-sm text-[#66e0cc] border border-[#66e0cc] rounded-lg hover:bg-[#66e0cc]/10 transition-colors"
              onClick={() => setModalPlano(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
