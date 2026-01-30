import {Link} from "react-router-dom";

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
    return(
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

                <div className="p-4"> 
                    <h2 className="text-white font-bold">{game.name}</h2>
                    
                    <div>
                        <span
                            className="flex items-center gap-1 text-yellow-500 font-medium"
                        >
                            ⭐ {game.rating > 0 ? game.rating.toFixed(1) : "N/A"}
                        </span>
                                
                        <span
                            className="text-zinc-500"
                        >
                            {game.released ? new Date(game.released).getFullYear() : "TBA"}
                        </span>
                    </div>
                </div>
                    
            </div>
        </Link>
    )
} 