import { Equipamento } from './equipamento';
import { Funcionario } from './funcionario';

export interface Servico {
	uid?: string;
	title: string;
	description: string;
	funcionarios: Array<Funcionario>;
	equipamentos: Array<Equipamento>;
}
