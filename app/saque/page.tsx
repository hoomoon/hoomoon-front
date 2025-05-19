"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import Link from "next/link"

export default function Saque() {
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState("pix")
  const [chave, setChave] = useState("")
  const [pin, setPin] = useState("")
  const [mensagem, setMensagem] = useState("")

  const historicoFake = [
    { id: 1, valor: "$200.00", tipo: "PIX", data: "2025-05-14", status: "Aprovado" },
    { id: 2, valor: "$500.00", tipo: "USDT", data: "2025-05-12", status: "Pendente" },
    { id: 3, valor: "$150.00", tipo: "PIX", data: "2025-05-10", status: "Aprovado" },
  ]

  const handleSaque = () => {
    const valorNum = Number.parseFloat(valor)
    const isEmail = /\S+@\S+\.\S+/.test(chave)
    const isCPF = /^\d{11}$/.test(chave)
    const isValidPin = /^\d{4}$/.test(pin)

    if (valorNum < 10) {
      setMensagem("❌ O saque mínimo é de $10.")
    } else if (valorNum > 10000) {
      setMensagem("❌ O saque máximo permitido é de $10.000.")
    } else if (!chave) {
      setMensagem("❌ Informe a chave PIX ou endereço USDT.")
    } else if (tipo === "pix" && !(isEmail || isCPF)) {
      setMensagem("❌ A chave PIX deve ser um CPF (11 dígitos) ou um e-mail válido.")
    } else if (!isValidPin) {
      setMensagem("❌ Informe um PIN de 4 dígitos válido.")
    } else {
      setMensagem("✅ Solicitação de saque enviada com sucesso.")
    }
  }

  return (
    <div className="p-4 text-white flex flex-col items-center">
      <div className="w-full max-w-md mb-6">
        <Link href="/dashboard" className="text-[#66e0cc] text-sm hover:underline cursor-pointer mb-4 inline-block">
          ← Voltar para o início
        </Link>

        <h1 className="text-2xl font-bold mb-4 text-center">Solicitar Saque</h1>

        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Valor do saque (mínimo $10 / máximo $10.000)</label>
            <div className="flex items-center gap-2 bg-zinc-800 p-3 rounded-md">
              <DollarSign className="text-gray-400" size={18} />
              <input
                type="number"
                placeholder="Digite o valor"
                className="bg-transparent outline-none w-full text-white"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Tipo de saque</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full bg-zinc-800 text-white rounded-md p-2"
            >
              <option value="pix">PIX (CPF ou E-mail)</option>
              <option value="usdt">USDT - BEP20</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              {tipo === "pix" ? "Chave PIX (CPF ou E-mail)" : "Endereço USDT BEP20"}
            </label>
            <input
              type="text"
              placeholder={tipo === "pix" ? "Digite o CPF (somente números) ou E-mail" : "Digite o endereço USDT BEP20"}
              className="w-full bg-zinc-800 p-3 rounded-md text-white outline-none"
              value={chave}
              onChange={(e) => setChave(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">PIN de segurança (4 dígitos)</label>
            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              className="w-full bg-zinc-800 p-3 rounded-md text-white outline-none"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <button
            onClick={handleSaque}
            className="w-full bg-[#66e0cc] text-black font-bold py-2 rounded-xl hover:opacity-90"
          >
            Confirmar Saque
          </button>

          {mensagem && <p className="mt-2 text-sm text-center">{mensagem}</p>}
        </div>
      </div>

      {/* HISTÓRICO DE SAQUES */}
      <div className="w-full max-w-2xl mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">Histórico de Saques</h2>
        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="grid grid-cols-4 text-sm text-gray-400 border-b border-zinc-800 pb-2 mb-2">
            <span>Valor</span>
            <span>Tipo</span>
            <span>Data</span>
            <span>Status</span>
          </div>
          {historicoFake.length > 0 ? (
            historicoFake.map((item) => (
              <div key={item.id} className="grid grid-cols-4 text-sm border-b border-zinc-800 py-3">
                <span>{item.valor}</span>
                <span>{item.tipo}</span>
                <span>{item.data}</span>
                <span className={item.status === "Aprovado" ? "text-green-400" : "text-yellow-400"}>{item.status}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-4">Nenhum saque realizado ainda.</p>
          )}
        </div>
      </div>
    </div>
  )
}
