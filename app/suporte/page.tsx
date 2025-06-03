"use client"

import { useState } from "react"
import { MessageCircle, Mail, Headphones, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

// Componente de FAQ Item com funcionalidade de accordion
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-zinc-800 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left">
        <h3 className="font-medium text-white">{question}</h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && <div className="pb-4 text-gray-400 text-sm">{answer}</div>}
    </div>
  )
}

export default function Suporte() {
  const [mostrarMenu, setMostrarMenu] = useState(false)

  // Lista de perguntas frequentes
  const faqItems = [
    {
      question: "Como posso fazer um investimento?",
      answer: 'Acesse a área "Investir" no menu lateral, escolha o valor e siga as instruções exibidas na tela.',
    },
    {
      question: "Quanto tempo leva para um saque ser processado?",
      answer: "Os saques são processados em até 24h úteis, dentro do horário de atendimento.",
    },
    {
      question: "Qual o valor mínimo e máximo para saque?",
      answer: "O valor mínimo é de $10 e o máximo de $10.000 por solicitação, conforme o plano ativo.",
    },
    {
      question: "Como faço para alterar minha chave PIX ou endereço USDT?",
      answer: 'Vá até a aba "Configurações" no menu e atualize suas informações de saque com segurança.',
    },
    {
      question: "Posso indicar amigos e ganhar comissões?",
      answer: 'Sim! Acesse o menu "Programa de Afiliados" para ver seu link de indicação e acompanhar seus ganhos.',
    },
  ]

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Fundo com partículas */}
      <ParticlesBackground />

      {/* Gradientes de fundo */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#66e0cc]/20 rounded-full blur-[120px] animate-pulse z-0"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse z-0"></div>

      {/* Conteúdo da página */}
      <div className="relative z-10">
        <div className="p-4 text-white relative max-w-6xl mx-auto">
          <Link href="/dashboard" className="text-[#66e0cc] text-sm inline-block mb-6 hover:underline cursor-pointer">
            ← Voltar para o início
          </Link>

          <h1 className="text-3xl font-bold mb-6">Central de Suporte</h1>

          {/* Seção Institucional - Texto Introdutório */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Precisa de ajuda? Estamos aqui por você.</h2>
            <p className="text-gray-300 max-w-3xl">
              Nossa missão é garantir que você tenha a melhor experiência possível na plataforma. Se tiver qualquer
              dúvida, dificuldade ou precisar de orientação, nosso time de suporte está pronto para te atender com
              agilidade e atenção.
            </p>
          </div>

          {/* Horário de Atendimento */}
          <div className="mb-10 bg-zinc-900 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">🕒 Atendimento Personalizado</h2>
            <p className="text-gray-300">
              Atendemos de segunda a sábado, das 8h às 20h. Durante esse período, você pode entrar em contato conosco
              via WhatsApp, chat ao vivo ou abrir um ticket. Caso esteja fora do horário, sua solicitação será
              respondida assim que possível.
            </p>
          </div>

          {/* Cards de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 p-6 rounded-xl flex flex-col items-center text-center hover:bg-zinc-800 transition"
            >
              <MessageCircle size={32} className="text-green-400 mb-2" />
              <h2 className="text-lg font-semibold">WhatsApp</h2>
              <p className="text-sm text-gray-400 mt-1">Fale conosco pelo WhatsApp</p>
            </a>

            <a
              href="#"
              className="bg-zinc-900 p-6 rounded-xl flex flex-col items-center text-center hover:bg-zinc-800 transition"
            >
              <Mail size={32} className="text-blue-400 mb-2" />
              <h2 className="text-lg font-semibold">Abrir Ticket</h2>
              <p className="text-sm text-gray-400 mt-1">Envie uma solicitação de suporte</p>
            </a>

            <a
              href="#"
              className="bg-zinc-900 p-6 rounded-xl flex flex-col items-center text-center hover:bg-zinc-800 transition"
            >
              <Headphones size={32} className="text-purple-400 mb-2" />
              <h2 className="text-lg font-semibold">Chat ao Vivo</h2>
              <p className="text-sm text-gray-400 mt-1">Atendimento em tempo real</p>
            </a>
          </div>

          {/* Perguntas Frequentes (FAQ) */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
            <div className="bg-zinc-900 rounded-xl p-6">
              {faqItems.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          {/* Botão flutuante de suporte */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setMostrarMenu(!mostrarMenu)}
              className="bg-[#66e0cc] w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
              aria-label="Suporte"
            >
              <Headphones size={24} className="text-black" />
            </button>

            {mostrarMenu && (
              <div className="absolute bottom-16 right-0 bg-zinc-900 rounded-xl p-4 shadow-md w-60">
                <p className="text-white text-sm mb-2 font-semibold">Como podemos te ajudar?</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://wa.me/5511999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-400 hover:underline">
                      Abrir Ticket
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-400 hover:underline">
                      Chat ao Vivo
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
