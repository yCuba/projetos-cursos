import {useState, useEffect} from "react";

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
};



export function useFavorites() {
    const [favorites, setFavorites] = useState<Game[]>(() => {
        const saved = localStorage.getItem("meus_favoritos");
        return saved ? JSON.parse(saved) : [];
    })




    useEffect(() => {
        localStorage.setItem('meus_favoritos', JSON.stringify(favorites));
    }, [favorites]);


    const toggleFavorite = (game: Game) => {
        setFavorites((prev) => {
            const isAlreadyFavorite = prev.some((fav) => fav.id === game.id);
            if (isAlreadyFavorite) {
                return prev.filter((fav) => fav.id !== game.id);

            }else {
                return [...prev, game];
            }

        })
    };

    const isFavorite = (gameId: number) => {
        return favorites.some((fav) => fav.id === gameId);
    }

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
}