export default function SwapLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66e0cc] mx-auto mb-4"></div>
        <p className="text-white">Carregando Swap...</p>
      </div>
    </div>
  )
}
