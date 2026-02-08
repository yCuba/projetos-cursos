import {Infra} from '../infra/infra';

export interface IAgendamento {
    id: number;
    cliente: string;
    inicio: string;
    duracaoMinutos: number;
}

export class Scheduler {

    static listar(): IAgendamento[] {
        return Infra.lerDados<IAgendamento>();
    }


    static agendar(novo: IAgendamento): string {
        const agenda = this.listar();


        const temConflito = agenda.some(existente => {
            const inicioExistente = new Date(existente.inicio).getTime()
            const fimExistente = inicioExistente + (existente.duracaoMinutos * 60000);

            const novoInicio = new Date(novo.inicio).getTime();
            const novoFim = novoInicio + (novo.duracaoMinutos * 60000);

            return novoInicio < fimExistente && novoFim > inicioExistente
        });

        if (temConflito) {
            return "❌ Conflito: Este horário já está reservado por outro cliente.";
        }

        agenda.push(novo);
        Infra.gravarDados<IAgendamento>(agenda);
        return "✅ Sucesso: Agendamento realizado com êxito!";
    
    }

    static salvar(novoAgendamento: IAgendamento): void {
        const atual = this.listar();
        atual. push(novoAgendamento);
        Infra.gravarDados<IAgendamento>(atual);
    }

    static cancelar(id: number): void {
        const agenda = this.listar();
        const novaAgenda = agenda.filter(a => a.id !== id);
        Infra.gravarDados<IAgendamento>(novaAgenda);
    }
}