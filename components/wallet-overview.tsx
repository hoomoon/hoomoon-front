// components/wallet-overview.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, Gift, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/providers/AuthProvider"
import toast from "react-hot-toast"

export default function WalletOverview() {
  const [copiado, setCopiado] = useState(false)
  const { user } = useAuth()
  const [totalMembros, setTotalMembros] = useState(0)

  const base = process.env.NEXT_PUBLIC_API_URL || "https://www.hoomoon.ai"
  const link = user?.referral_code
  ? `${base}/cadastro?ref=${user.referral_code}`
  : ""


  const copiarLink = () => {
    navigator.clipboard.writeText(link)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

useEffect(() => {
  async function loadTotal() {
    const res = await fetch(`${base}/api/minha-rede/`, {
      credentials: "include",
    })
    if (!res.ok) return
    const data = await res.json()
    const total = data.niveis.reduce(
      (sum: number, lvl: any) => sum + lvl.indicados.length,
      0
    )
    setTotalMembros(total)
  }
  loadTotal()
}, [base])

  return (
    <div className="text-white space-y-4">
      <h2 className="text-xl font-bold mb-2">Visão geral da carteira</h2>

      {/* LINK DE INDICAÇÃO */}
      <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="bg-transparent border border-[#66e0cc]/50 text-sm p-2 px-4 rounded w-full sm:w-auto truncate text-white">
            {link || "Carregando código..."}
          </div>
          <button
            onClick={copiarLink}
            className="bg-[#66e0cc] text-black text-sm font-semibold px-4 py-2 rounded hover:opacity-90"
          >
            {copiado ? "Link copiado!" : "Copiar link"}
          </button>
        </div>
      </div>

      {/* CARD DE TOPO */}
      <div className="bg-transparent border border-[#66e0cc] rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">Saldo total</p>
          <h3 className="text-3xl font-bold text-white">≈$ 0</h3>
          <p className="text-sm text-green-400 mt-1">
            0% <span className="text-gray-400">nas últimas 24h</span>
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-400 mb-1">Comissões</p>
          <p className="text-lg text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight size={14} /> $ 0
          </p>
          <p className="text-xs text-gray-400">0 transações</p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-400 mb-1">Retiradas</p>
          <p className="text-lg text-red-400 font-semibold flex items-center gap-1">
            <ArrowDownRight size={14} /> $ 0
          </p>
          <p className="text-xs text-gray-400">0 transações</p>
        </div>

        <div className="flex justify-end">
          <Link href="/deposito">
            <button className="bg-[#66e0cc] text-black font-semibold rounded-xl px-4 py-2 text-sm flex items-center gap-2">
              + Novo Depósito
            </button>
          </Link>
        </div>
      </div>

      {/* OUTROS CARDS RESUMIDOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={18} />} title="Total Investido" value="$ 0" color="text-emerald-400" />
        <StatCard icon={<Gift size={18} />} title="Total de Rendimento" value="$ 0" color="text-emerald-400" />
        <StatCard
           icon={<Users size={18} />}
           title="Equipe"
           value={`${totalMembros} membro${totalMembros !== 1 ? "s" : ""}`}
           color="text-white"
         />
        <StatCard
          icon={<DollarSign size={18} />}
          title="Saldo Total da Equipe"
          value="$ 0"
          color="text-emerald-400"
        />
      </div>
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  color,
}: { icon: React.ReactNode; title: string; value: string; color: string }) {
  return (
    <div className="bg-transparent border border-[#66e0cc] rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        {icon} {title}
      </div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  )
}
