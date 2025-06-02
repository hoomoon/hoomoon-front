export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#66e0cc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Carregando ativação...</p>
      </div>
    </div>
  )
}
