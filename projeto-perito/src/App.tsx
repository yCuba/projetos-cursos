import { useState, useEffect } from "react";
import { Scheduler, IAgendamento } from './core/sheduler'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";



export default function App() {
    const [agendamento, setAgendamento] = useState<IAgendamento[]>([]);

    const carregarDados = () => {
        const dados = Scheduler.listar();
        setAgendamento(dados);
    }

    useEffect(() => {
        carregarDados();
    }, []);


    return (

        <BrowserRouter>
            <div className="container">
                <header className="header-sistema">
                    <h1 className="titulo-principal">🛡️ Sentinel Scheduler</h1>
                    <nav className="nav-menu">
                        <Link to="/" className="btn-nav">📋 Ver Agenda</Link>
                        <Link to="/novo" className="btn-nav">➕ Novo Agendamento</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={
                        <PaginaLista agendamento={agendamento} atualizar={carregarDados}/>
                    } />
                    
                    <Route path="/novo" element={
                        <PaginaCadastro aoSalvar={carregarDados} />
                    } />

                    <Route path="*" element={
                        <div className="card">
                            <h2>
                                404 - Página não encontrada
                            </h2>
                            <Link to="/">Voltar ao Início</Link>
                        </div>
                    } />
                </Routes>

            </div>
        
        
        </BrowserRouter>
    );
}

function PaginaLista({agendamento, atualizar}: {agendamento: IAgendamento[], atualizar: () => void}) {
    return  (
        <div className="card">
            <h2>📅 Compromissos Agendados</h2>
            <table className="tabela-agendamentos">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Data e Hora</th>
                    <th>Duração</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
            {agendamento.length > 0 ? (
                agendamento.map((item) => (
                <tr key={item.id}>
                    <td>{item.cliente}</td>
                    <td>{new Date(item.inicio).toLocaleString('pt-BR')}</td>
                    <td>{item.duracaoMinutos} min</td>
                    <td>
                    <button 
                        className="btn-cancelar"
                        onClick={() => {
                        Scheduler.cancelar(item.id);
                        atualizar();
                        }}
                    >
                        Cancelar
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr><td colSpan={4} style={{textAlign: 'center'}}>Nenhum agendamento encontrado.</td></tr>
            )}
            </tbody>
        </table>
        </div>
    );
}

function PaginaCadastro({ aoSalvar }: { aoSalvar: () => void }) {
  const navigate = useNavigate(); // Hook para mudar de página via código
  const [cliente, setCliente] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [duracao, setDuracao] = useState(30);

  const lidarComAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const novo: IAgendamento = {
        id: Date.now(),
        cliente,
        inicio: dataHora,
        duracaoMinutos: Number(duracao)
      };

      const mensagem = Scheduler.agendar(novo);
      alert(mensagem);
      aoSalvar(); // Atualiza os dados no App.tsx
      navigate("/"); // Redireciona para a lista automaticamente
    } catch (error: any) {
      // DEFINIÇÃO (throw): O erro "lançado" no Scheduler cai aqui
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <h2>📝 Novo Agendamento</h2>
      <form className="form-agendamento" onSubmit={lidarComAgendamento}>
        <input type="text" placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        <input type="datetime-local" value={dataHora} onChange={(e) => setDataHora(e.target.value)} required />
        <input type="number" placeholder="Duração (min)" value={duracao} onChange={(e) => setDuracao(Number(e.target.value))} required />
        <div className="botoes-form">
          <button type="submit" className="btn-confirmar">Agendar Agora</button>
          <Link to="/" className="btn-voltar">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}