"use client"

import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

export default function MaterialMarketing() {
  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <ParticlesBackground />

      {/* Gradientes animados */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#66e0cc]/20 rounded-full blur-[120px] animate-pulse z-0"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse z-0"></div>

      <div className="relative z-10 p-4 text-white max-w-4xl mx-auto">
        <Link href="/dashboard" className="block mb-6 text-sm text-[#66e0cc] hover:underline">
          ← Voltar para o início
        </Link>

        <h1 className="text-2xl font-bold mb-6">Materiais de Divulgação</h1>

        <div className="bg-zinc-900 p-6 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-2">📦 Banners Promocionais</h2>
          <p className="text-sm text-gray-300">
            Banners profissionais otimizados para redes sociais. Faça o download diretamente no painel administrativo.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-2">🔗 Link de Indicação</h2>
          <p className="text-sm text-gray-300 mb-2">
            Use seu link exclusivo para convidar novos usuários e acompanhar suas comissões.
          </p>
          <div className="bg-zinc-800 p-3 rounded text-sm text-white">https://hoomoon.com/r/SEULINK</div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-2">📃 Textos prontos para compartilhar</h2>
          <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
            <li>Ganhe todos os dias com o robô da HOOMOON. Simples, seguro e automatizado!</li>
            <li>Convide amigos e receba comissões até o 5º nível com o nosso sistema de afiliados.</li>
            <li>Investir nunca foi tão fácil. Crie sua conta na HOOMOON e comece agora!</li>
          </ul>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">🎥 Vídeo de Apresentação</h2>
          <p className="text-sm text-gray-300">
            O vídeo oficial será disponibilizado em breve no painel administrativo.
          </p>
          <div className="w-full h-48 bg-zinc-800 rounded mt-4 flex items-center justify-center text-gray-500">
            Área reservada para o vídeo institucional
          </div>
        </div>
      </div>
    </div>
  )
}
