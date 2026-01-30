import { useEffect, useState } from "react"
import { getGames } from "../service/api";
import { Search } from "lucide-react";
import { GameCard } from "../components/GameCard";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
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
          Games
        </h1>
        <div className="bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
          Minha Coleção
        </div>
      </header>

      <main>

        <div className="mb-8 relative group">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors"
            size={20} 
          />

          <input
            type="text"
            placeholder="Buscar jogos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-10 pr-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
            
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.length > 0 ? (
            // PARTE A: Se tiver jogos, mostra o MAP
            games.map((game) => (
                <GameCard key={game.id} game={game}/>
          ))
  ) : (
    // PARTE B: Se não tiver jogos (lista vazia), mostra o seu card de loading
        <div className="bg-gray-900 rounded-xl animate-pulse p-4">
          <h2 className="font-bold text-gray-500 italic">Buscando jogos...</h2>
        </div>
      )}
      </div>
      </main>

      

      
      

    </div>
   
  )
  
}

export default App