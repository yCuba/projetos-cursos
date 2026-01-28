function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          GameTrack
        </h1>
        <div className="bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
          Minha Coleção
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Aqui entrarão os nossos cards de games */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all cursor-pointer">
            <div className="h-48 bg-gray-800 animate-pulse"></div>
            <div className="p-4">
              <h2 className="font-bold">Carregando games...</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App