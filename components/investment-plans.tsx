{
  /* Plano HOO TITAN */
}
;<div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-[#66e0cc]/30 transition-all duration-300 hover:-translate-y-1">
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-4">
      <img
        src="/images/lua-titan.png"
        alt="HOO TITAN"
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23b14aff'/%3E%3C/svg%3E"
        }}
      />
    </div>
    <h2 className="text-xl font-bold">Plano HOO TITAN</h2>
    <ul className="mt-4 space-y-1 text-sm text-gray-300">
      <li>
        • Locação mínima: <strong>$10</strong>
      </li>
      <li>• Duração: 40 dias</li>
      <li>
        • Retorno total: <strong>140%</strong>
      </li>
      <li>• Recompensa diária: 3,25%</li>
      <li>• Saques a cada 3 dias</li>
    </ul>
    <button className="w-full bg-[#b14aff] text-black font-bold py-3 rounded-lg mt-6 hover:bg-[#b14aff]/90 transition-colors">
      Investir Agora
    </button>
  </div>
</div>

{
  /* Plano HOO CALLISTO */
}
;<div className="text-white text-center">
  <h2 className="text-xl font-bold">Plano HOO CALLISTO</h2>
  <ul className="mt-4 space-y-1 text-sm text-gray-300">
    <li>
      • Locação mínima: <strong>$20</strong>
    </li>{" "}
    {/* atualizado */}
    <li>• Duração: 35 dias</li>
    <li>• Retorno total: 160%</li>
    <li>• Recompensa diária: 4,57%</li>
    <li>• Saques a cada 10 dias</li>
  </ul>
</div>
