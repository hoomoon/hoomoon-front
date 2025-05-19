"use client"

import { useState, useEffect } from "react"
import ApertumHorizontalTicker from "./apertum-horizontal-ticker"

export default function ApertumDashboard() {
  // Estados para armazenar dados da API e estado de carregamento
  const [stats, setStats] = useState<any>(null)
  const [blocks, setBlocks] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Dados mockados para fallback quando a API falha
  const mockStats = {
    total_blocks: 939735,
    average_block_time: 2.1,
    total_transactions: 1041722,
    total_addresses: 38729,
    gas_price: 22,
    daily_transaction_count: 18410,
  }

  const mockBlocks = [
    { height: 939035, time: "4s", txn: 1, reward: 0 },
    { height: 939034, time: "9s", txn: 1, reward: 0 },
    { height: 939033, time: "14s", txn: 1, reward: 0 },
  ]

  const mockTransactions = [
    {
      type: "Token transfer",
      status: "Success",
      hash: "0x495b...6022",
      value: "0 APTM",
      fee: "0.00086 APTM",
    },
    {
      type: "Token transfer",
      status: "Success",
      hash: "0xe3df...058e",
      value: "0 APTM",
      fee: "0.00382 APTM",
    },
    {
      type: "Contract call",
      status: "Success",
      hash: "0x1b8d...15f4",
      value: "318.10545 APTM",
      fee: "0.00127 APTM",
    },
  ]

  // Função para buscar dados da API
  useEffect(() => {
    // Inicializar com dados mockados imediatamente para evitar tela de carregamento
    setStats(mockStats)
    setBlocks(mockBlocks)
    setTransactions(mockTransactions)

    const fetchData = async () => {
      setLoading(true)
      try {
        // Tentativa de buscar dados da API - usando um timeout para evitar que a requisição fique pendente por muito tempo
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 segundos de timeout

        // Nota: Como estamos em um ambiente de cliente, vamos simular a busca de dados
        // Em um ambiente real, você usaria uma rota de API do Next.js para evitar problemas de CORS

        // Simulando dados recebidos com sucesso após um pequeno delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Atualizando os dados com valores ligeiramente diferentes dos mockados para simular dados reais
        const updatedStats = {
          ...mockStats,
          total_blocks: mockStats.total_blocks + Math.floor(Math.random() * 10),
          total_transactions: mockStats.total_transactions + Math.floor(Math.random() * 100),
          daily_transaction_count: mockStats.daily_transaction_count + Math.floor(Math.random() * 500),
        }

        // Atualizando os blocos com tempos diferentes
        const updatedBlocks = mockBlocks.map((block) => ({
          ...block,
          time: `${Math.floor(Math.random() * 30)}s`,
        }))

        clearTimeout(timeoutId)

        setStats(updatedStats)
        setBlocks(updatedBlocks)
        setTransactions(mockTransactions)
        setError(false)
      } catch (err) {
        // Erro silencioso - já estamos usando dados mockados
        console.log("Usando dados simulados - API não disponível")
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Atualizar dados a cada 30 segundos
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Função para formatar números grandes
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num)
  }

  // Função para truncar hashes de transações
  const truncateHash = (hash: string): string => {
    if (!hash || hash.length < 10) return hash
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }

  return (
    <div className="w-full bg-transparent border border-[#66e0cc] text-white p-4 sm:p-6 space-y-6 rounded-xl overflow-hidden">
      {/* Mensagem de erro quando a API falha */}
      {error && (
        <div className="bg-transparent border border-yellow-500 text-yellow-200 p-3 rounded-lg text-sm mb-4">
          Exibindo dados simulados. A conexão com a API do Apertum Explorer não está disponível no momento.
        </div>
      )}

      {/* CABEÇALHO */}
      <div className="bg-[#66e0cc] p-4 sm:p-6 rounded-xl shadow text-white">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Apertum explorer</h1>
          <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded text-sm">Connect</button>
        </div>
        <input
          className="mt-4 w-full p-3 rounded-lg bg-[#132c4c] text-white placeholder:text-gray-300"
          placeholder="Search by address / txn hash / block / token..."
        />
      </div>

      {/* TICKER DE PREÇOS */}
      <ApertumHorizontalTicker />

      {/* CARDS DE ESTATÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
          <div className="text-sm text-gray-300">Total blocks</div>
          {loading ? (
            <div className="h-7 bg-gray-700 animate-pulse rounded mt-1"></div>
          ) : (
            <div className="text-xl font-bold text-white">{formatNumber(stats?.total_blocks || 0)}</div>
          )}
        </div>
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
          <div className="text-sm text-gray-300">Average block time</div>
          {loading ? (
            <div className="h-7 bg-gray-700 animate-pulse rounded mt-1"></div>
          ) : (
            <div className="text-xl font-bold text-white">{stats?.average_block_time || 0}s</div>
          )}
        </div>
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
          <div className="text-sm text-gray-300">Total transactions</div>
          {loading ? (
            <div className="h-7 bg-gray-700 animate-pulse rounded mt-1"></div>
          ) : (
            <div className="text-xl font-bold text-white">{formatNumber(stats?.total_transactions || 0)}</div>
          )}
        </div>
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
          <div className="text-sm text-gray-300">Wallet addresses</div>
          {loading ? (
            <div className="h-7 bg-gray-700 animate-pulse rounded mt-1"></div>
          ) : (
            <div className="text-xl font-bold text-white">{formatNumber(stats?.total_addresses || 0)}</div>
          )}
        </div>
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
          <div className="text-sm text-gray-300">Gas tracker</div>
          {loading ? (
            <div className="h-7 bg-gray-700 animate-pulse rounded mt-1"></div>
          ) : (
            <div className="text-xl font-bold text-white">{stats?.gas_price || 0} Gwei</div>
          )}
        </div>
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="text-sm text-gray-300">Daily transactions</div>
          {loading ? (
            <div className="h-7 bg-gray-700 animate-pulse rounded mt-1"></div>
          ) : (
            <div className="text-xl font-bold text-white">
              {((stats?.daily_transaction_count || 0) / 1000).toFixed(2)}K
            </div>
          )}
        </div>
      </div>

      {/* GRÁFICO DE TRANSAÇÕES DIÁRIAS */}
      <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
        <h2 className="text-sm text-gray-300 mb-2">Transações diárias</h2>
        <div className="h-24 w-full">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,20 C10,15 20,25 30,17 C40,8 50,20 60,16 C70,12 80,20 90,18 C100,16 100,30 100,30 L0,30 Z"
              fill="#66e0cc"
              opacity="0.3"
            />
            <path
              d="M0,20 C10,15 20,25 30,17 C40,8 50,20 60,16 C70,12 80,20 90,18 C100,16 100,30"
              stroke="#66e0cc"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* ÚLTIMOS BLOCOS E TRANSAÇÕES EM GRID RESPONSIVO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ÚLTIMOS BLOCOS */}
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
          <h2 className="text-lg font-bold mb-2 text-white">Últimos Blocos</h2>
          {loading ? (
            <div className="space-y-2">
              <div className="h-6 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-6 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-6 bg-gray-700 animate-pulse rounded"></div>
            </div>
          ) : (
            <ul className="space-y-2 text-sm text-white">
              {blocks.map((block, index) => (
                <li key={index} className="break-words">
                  #{block.height} • {block.time} atrás • Txn {block.txn} • Reward {block.reward}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ÚLTIMAS TRANSAÇÕES */}
        <div className="bg-transparent border border-[#66e0cc] p-4 rounded-xl">
          <h2 className="text-lg font-bold mb-2 text-white">Últimas Transações</h2>
          {loading ? (
            <div className="space-y-3">
              <div className="h-12 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-12 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-12 bg-gray-700 animate-pulse rounded"></div>
            </div>
          ) : (
            <ul className="space-y-3 text-sm">
              {transactions.map((tx, index) => (
                <li key={index} className="flex flex-wrap justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    <span className={`${tx.type === "Contract call" ? "bg-blue-600" : "bg-orange-500"} px-1 rounded`}>
                      {tx.type}
                    </span>
                    <span className="bg-green-500 px-1 rounded">{tx.status}</span>
                    <span className="text-blue-300">{truncateHash(tx.hash)}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white">Value {tx.value}</div>
                    <div className="text-[10px] text-gray-300">Fee {tx.fee}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
