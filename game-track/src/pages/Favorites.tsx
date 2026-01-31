import { useFavorites} from "../hooks/useFavorites";
import {GameCard} from "../components/GameCard";

export function Favorites() {
    const {favorites} = useFavorites();
    return (

        <div className="min-h-screen bg-black p-8">
            <header className="mb-8">

                <h1 className="text-3xl font-bold text-white">Minha Biblioteca</h1>

                <p className="text-zinc-400 mt-2">
                    {favorites.length === 0 
                    ? "Você ainda não favoritou nenhum jogo." 
                    : `Você tem ${favorites.length} jogo(s) salvos.`}
                </p>

            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favorites.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>

    );
}