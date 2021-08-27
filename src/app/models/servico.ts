import { Funcionario } from './funcionario';

export interface Servico {
	uid?: string;
	title: string;
	description: string;
	documents: Array<File>;
	funcionarios: Array<Funcionario>;
	equipamentos: Array<any>;
}
