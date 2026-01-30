import {ArrowLeft, Calendar, Star} from "lucide-react";
import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import { getGameDetails } from "../service/api";

interface GameDetails {
    id: number;
    nome: string;
    description_raw: string;
    background_image: string;
    rating: number;
    released: string;
}

export default function GameDetails( ) {
    const {id} = useParams();
    const [game, setGame] = useState<GameDetails | null>(null);

    useEffect(() => {
        async function loadData() {
            if (!id) return;
            const data = await getGameDetails(id);
            setGame(data);
        }
        loadData();
    }, [id]);

    if (!game) {
        return <div className="min-h-screen bg-black text-white p-8">Carregando...</div>;
    }

    return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* CABEÇALHO: Botão de Voltar */}
        <header className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-500 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Voltar para a biblioteca</span>
          </Link>
        </header>

        {/* CONTEÚDO PRINCIPAL: Grid de Detalhes */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LADO ESQUERDO: Imagem e Destaque */}
          <section className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-zinc-800">
              <img 
                src={game.background_image} 
                alt={game.nome} 
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* LADO DIREITO: Informações e Texto */}
          <section className="flex flex-col">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              {game.nome}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-bold">{game.rating}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-zinc-400">
                <Calendar size={18} />
                <span>{new Date(game.released).getFullYear()}</span>
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-zinc-500 uppercase tracking-widest text-sm font-bold">Sobre o jogo</h3>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {game.description_raw || "Nenhuma descrição disponível para este título."}
              </p>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
};