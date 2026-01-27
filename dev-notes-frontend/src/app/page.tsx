'use client'; 
import { useEffect, useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion';

interface Note {
  id: number;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [priority, setPriority] = useState('low');
  const [filter, setFilter] = useState('all');


  // Função para buscar notas
  const fetchNotes = () => {
    fetch('http://localhost:3000/notas')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Erro ao buscar notas:", err));
  };

  const filteredNotes = notes.filter((note) => {
    if(filter === 'all') return true;
    return note.priority === filter;
  });

  //Função para carregar os dados no formulário para editação
  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // Função para enviar nova nota ao Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:3000/notas/${editingId}`
      : 'http://localhost:3000/notas';

    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, priority}),
    });
    setPriority('low');
    setEditingId(null);
    setTitle('');
    setContent('');
    fetchNotes(); // Atualiza a lista na hora!
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id: number) => {
    if (!confirm("Deseja mesmo apagar essa nota ?")) return;

    try {
      await fetch(`http://localhost:3000/notas/${id}`, {
        method: 'DELETE',
    });
      fetchNotes(); //Esta função recarrega a lista para a nota sumir da tela
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-500 mb-8">Dev-Notes New Edition V2.0</h1>

        {/* Formulário de Criação */}
        <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-10 shadow-2xl">
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Título da nota..." 
              className="bg-slate-950 border border-slate-800 p-3 rounded-lg focus:border-blue-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
              placeholder="Conteúdo técnico..." 
              className="bg-slate-950 border border-slate-800 p-3 rounded-lg focus:border-blue-500 outline-none h-24"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <h2 className="">Prioridade da Nota:</h2>
            <select
              
              title="Prioridade da Nota"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-slate-800 text-white p-2 rounded mb-4 w-full border border-slate-700"
            >
              <option value="low">🟢 Baixa</option>
              <option value="medium">🟡 Média</option>
              <option value="high">🔴 Alta</option>
            </select>

            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors">
              Salvar Nota no Backend
            </button>


          </div>
        </form>       

        <div className="flex gap-2 mb-4 justify-center">
          {['all', 'high', 'medium', 'low'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Lista de Cards */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => {
              const borderColor = 
                note.priority === 'high' ? 'border-red-500' :
                note.priority === 'medium' ? 'border-yellow-500' : 'border-green-500';
              return(
              <motion.div
                key={note.id}
                layout // Permite animação de layout ao adicionar/remover
                initial={{ opacity: 0, y: 20 }}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, scale: 0.95, transition: {duration: 0.2}}}
                className={`relative p-6 bg-slate-900 rounded-xl border-l-4 ${
                  note.priority === 'high' ? 'border-l-red-500' :
                  note.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                } border-y-slate-800 border-r-slate-800 mb-4 shadow-xl`}
              >
                <div 
                  key={note.id} 
                  className={`relative p-6 bg-slate-900 rounded-xl border ${borderColor} hover:border-blue-500/30 transition-all`}
                >
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-2 inline-block ${
                  note.priority === 'high' ? 'bg-red-500/10 text-red-500' : 
                  note.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' : 
                  'bg-green-500/10 text-green-500'
                }`}>
                  {note.priority}
                </span>
                
                <h2 className="text-xl font-bold text-blue-400">{note.title}</h2>
                <p className="text-slate-400 mt-2">{note.content}</p>

                {/* Button */}
                <button 
                  onClick={() => startEdit(note)}
                  className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-[10px] font-bold px-2 py-1 rounded transition-all"
                >
                  EDITAR
                </button>

                <button             
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-400 font-bold bg-slate-800 px-2 py-1 rounded-lg text-xs"
                >
                  EXCLUIR
                </button>
                </div>
              </motion.div>
            )
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}