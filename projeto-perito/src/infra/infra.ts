

export class Infra {
    private static STORAGE_KEY = 'sentinel_agenda';

    static lerDados<T>(): T[] {
        try {
            const dados = localStorage.getItem(this.STORAGE_KEY);
            if (!dados) return [];

            return JSON.parse(dados) as T[];
        } catch (error) {
            console.error("Erro crítico na leitura de dados da Infra:", error)
            return [];
        }
    }


    static gravarDados<T>(dados: T[]): void {
        try {
            const json = JSON.stringify(dados);
            localStorage.setItem(this.STORAGE_KEY, json);
        } catch (error) {
            console.error("Erro crítico na gravação de dados da Infra:", error)
            throw new Error("Falha ao persistir dados no dispositivo.")
        }
    }
}
