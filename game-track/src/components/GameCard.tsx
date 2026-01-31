import { Heart } from "lucide-react";
import {Link} from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

interface GameCardProps {
    game: {
        id: number;
        name: string;
        background_image: string;
        rating: number;
        released: string;
    }
}

export function GameCard({game}: GameCardProps) {

    const { toggleFavorite, isFavorite} = useFavorites();

    const favorited = isFavorite(game.id);
    

    return(
       <div className="relative group overflow-hidden rounded-xl bg-zinc-900 transition-all hover:scale-[1.02]">

            {/*Botão favoritos*/}
        <button 
            onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(game);
          }}
            className={`absolute top-3 right-3 z-30 p-2 rounded-full transition-all duration-300 shadow-lg
                ${favorited 
                ? 'bg-red-500 scale-110 opacity-100' 
                : 'bg-black/60 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:scale-110'
                }`}
        >
            <Heart 
                size={20} 
                fill={favorited ? "white" : "transparent"} 
                className={`transition-colors duration-300 ${favorited ? "text-white" : "text-white"}`}
            />
        </button>


            {/*Conteúdo visual do card*/}
            <Link
                to={`/game/${game.id}`}                               
                key={game.id}                    
                className="block hover:scale-105 transition-transform"
                
            >


                <div key={game.id} className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform group">
                    <img 
                        src={game.background_image} 
                        className="rounded mb-2 w-full h-48 object-cover" 
                    />

                    <div className="p-5 flex flex-col gap-2"> 

                        <h2 
                            className="text-white font-bold text-lg leading-tight truncate group-hover:text-purple-400 transition-colors"
                        >
                            {game.name}
                        </h2>
                        
                        <div className="flex items-center justify-between mt-1">
                            <div className="flex gap-3">
                                <span
                                    className="flex items-center gap-1 text-yellow-500 font-semibold text-sm bg-yellow-500/10 px-2 py-0.5 rounded"

                                >
                                    ⭐ {game.rating > 0 ? game.rating.toFixed(1) : "N/A"}
                                </span>
                                        
                                <span
                                    className="text-zinc-500 text-sm font-medium"
                                >
                                    {game.released ? new Date(game.released).getFullYear() : "TBA"}
                                </span>
                            </div>
                        </div>

                    </div>
                        
                </div>
            </Link>
        </div>
    )
} 