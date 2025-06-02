"use client"

import { useState } from "react"
import { Lock, KeyRound, Trash2, ShieldCheck } from "lucide-react"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

export default function Configuracao() {
  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [doisFA, setDoisFA] = useState(false)
  const [email, setEmail] = useState("")
  const [pix, setPix] = useState("")
  const [telefone, setTelefone] = useState("")

  const handleSalvarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert("❌ A nova senha e a confirmação não coincidem.")
    } else {
      alert("✅ Senha atualizada com sucesso.")
    }
  }

  const handleSalvarInfo = () => {
    alert("✅ Informações atualizadas com sucesso.")
  }

  const handleExclusaoConta = () => {
    const confirmacao = confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.")
    if (confirmacao) {
      alert("✅ Solicitação de exclusão enviada.")
    }
  }

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Fundo de partículas */}
      <ParticlesBackground />

      {/* Gradientes animados */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#66e0cc]/20 rounded-full blur-[120px] animate-pulse z-0"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse z-0"></div>

      {/* Conteúdo */}
      <div className="relative z-10 p-4 text-white max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-[#66e0cc] text-sm mb-6 inline-block hover:underline">
          ← Voltar para o início
        </Link>
        <h1 className="text-2xl font-bold mb-6">Configurações da Conta</h1>

        {/* Alterar Senha */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={20} className="text-[#66e0cc]" />
            <h2 className="text-lg font-semibold">Alterar Senha</h2>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Senha atual"
              className="w-full p-3 bg-zinc-800 text-white rounded-md outline-none"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nova senha"
              className="w-full p-3 bg-zinc-800 text-white rounded-md outline-none"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar nova senha"
              className="w-full p-3 bg-zinc-800 text-white rounded-md outline-none"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button
              onClick={handleSalvarSenha}
              className="w-full bg-[#66e0cc] text-black font-bold py-2 rounded-xl hover:opacity-90"
            >
              Salvar Senha
            </button>
          </div>
        </div>

        {/* 2FA */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={20} className="text-[#66e0cc]" />
            <h2 className="text-lg font-semibold">Autenticação em Duas Etapas (2FA)</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Ative uma camada extra de segurança para sua conta. Recomendamos o uso de aplicativos como Google
            Authenticator.
          </p>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={doisFA}
              onChange={() => setDoisFA(!doisFA)}
              className="accent-[#66e0cc] w-4 h-4"
            />
            <span className="text-sm">Ativar autenticação 2FA</span>
          </label>
        </div>

        {/* Atualizar Email, Telefone e PIX */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <KeyRound size={20} className="text-[#66e0cc]" />
            <h2 className="text-lg font-semibold">Informações de Contato</h2>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Seu e-mail de login"
              className="w-full p-3 bg-zinc-800 text-white rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Seu telefone"
              className="w-full p-3 bg-zinc-800 text-white rounded-md outline-none"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Chave PIX (CPF ou E-mail)"
              className="w-full p-3 bg-zinc-800 text-white rounded-md outline-none"
              value={pix}
              onChange={(e) => setPix(e.target.value)}
            />
            <button
              onClick={handleSalvarInfo}
              className="w-full bg-[#66e0cc] text-black font-bold py-2 rounded-xl hover:opacity-90"
            >
              Salvar Informações
            </button>
          </div>
        </div>

        {/* Exclusão de Conta */}
        <div className="bg-red-900 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 size={20} className="text-white" />
            <h2 className="text-lg font-semibold">Solicitar Exclusão da Conta</h2>
          </div>
          <p className="text-sm text-white mb-4">
            Se você deseja encerrar sua conta, clique no botão abaixo. Essa ação é irreversível.
          </p>
          <button
            onClick={handleExclusaoConta}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl"
          >
            Excluir Minha Conta
          </button>
        </div>
      </div>
    </div>
  )
}
