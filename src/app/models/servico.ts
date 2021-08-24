import { Funcionario } from "./funcionario";

export interface Servico {
    uid?: string;
    title: string;
    description: string;
    documentes: Array<File>;
    funcionarios: Array<Funcionario>;
    equipamentos: Array<any>;
}