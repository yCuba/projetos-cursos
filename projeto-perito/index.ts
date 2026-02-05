// Estado Fixo. Evita erros de digitação.
import * as fs from 'fs';

const StatusAgendamento = {
    Pendente: "PENDENTE",
    Confirmado:  "CONFIRMADO",
    Cancelado:  "CANCELADO",
} as const;



interface Agendamento {
    id: number;
    cliente: string;
    inicio: Date; 
    duracaoMinutos: number;
}

const agenda: Agendamento[] = [
    {
        id: 1,
        cliente: "João Perito",
        inicio: new Date("2026-02-10T14:00:00"),
        duracaoMinutos: 60
    }
];

const CAMINHO_ARQUIVO = './agenda.json'

function lerAgenda(): Agendamento[] {
    try {
        const dados = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}

function salvarAgenda(novaAgenda: Agendamento[]):void {
    const dados = JSON.stringify(novaAgenda, null, 2);
    fs.writeFileSync(CAMINHO_ARQUIVO, dados); 
}


function agendarSessao(novaSessao: Agendamento): string {
  const agendaAtual = lerAgenda();  
  
  const novoInicio = novaSessao.inicio.getTime();
  const novoFim = novoInicio + (novaSessao.duracaoMinutos * 60000);

  const temConflito = agendaAtual.some(sessao => {
        const sInicio = new Date(sessao.inicio).getTime();
        const sFim = sInicio + (sessao.duracaoMinutos * 60000);
        return (novoInicio < sFim && novoFim > sInicio);

  });

    if (temConflito) 
        return (
            `❌ ERRO: Conflito com`
        )

    
        
    agendaAtual.push(novaSessao);
    return `✅ SUCESSO: Agendamento salvo no arquivo!`;

   
}

function cancelarSessao(id: number): string {
    const agendaAtual = lerAgenda();

    const agendaFiltrada = agendaAtual.filter(sessao => sessao.id !== id);

    if (agendaFiltrada.length === agendaAtual.length) {
        return `❌ ERRO: Agendamento com ID ${id} não encontrado.`
    }

    salvarAgenda(agendaFiltrada);
    return `✅ SUCESSO: Agendamento ${id} foi cancelado!`;
}


console.log("🚀 Iniciando Sentinel Scheduler...")

const novaReserva = {
    id: Date.now(),
    cliente: "Sergi Perito",
    inicio: new Date("2026-02-15T10:00:00"),
    duracaoMinutos: 45,

};

const resultado = agendarSessao(novaReserva);
console.log(resultado);

console.log("\n📋 Agenda Atualizada:");
console.table(lerAgenda());

console.log("\n--- Teste de Cancelamento ---")
console.log(cancelarSessao(1));

console.log("\n📋 Agenda após cancelamento:");
console.table(lerAgenda());