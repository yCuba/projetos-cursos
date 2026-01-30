import { useEffect, useState } from "react"
import { getGames } from "./service/api";

interface Game {
  id: number;
  name: string;
  background_image: string;
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");

  async function loadGames(term: string) {
    const data = await getGames(term);
    setGames(data);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadGames(search);
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  

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
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar jogos..."
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.length > 0 ? (
            // PARTE A: Se tiver jogos, mostra o MAP
            games.map((game) => (
              <div key={game.id} className="bg-gray-800 p-4 rounded-lg">
                <img src={game.background_image} className="rounded mb-2" />
                <h3 className="text-white font-bold">{game.name}</h3>
              </div>
          ))
  ) : (
    // PARTE B: Se não tiver jogos (lista vazia), mostra o seu card de loading
        <div className="bg-gray-900 rounded-xl animate-pulse p-4">
          <h2 className="font-bold text-gray-500">Buscando jogos na RAWG...</h2>
        </div>
      )}
      </div>
      </main>

      

      
      

    </div>
   
  )
  
}

export default App