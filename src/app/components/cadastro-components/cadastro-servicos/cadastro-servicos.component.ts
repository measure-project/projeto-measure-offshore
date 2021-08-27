import { FuncionarioService } from './../../../services/funcionario.service';
import { Router } from '@angular/router';
import { Servico } from './../../../models/servico';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';

@Component({
	selector: 'app-cadastro-servicos',
	templateUrl: './cadastro-servicos.component.html',
	styleUrls: ['./cadastro-servicos.component.scss'],
})
export class CadastroServicosComponent implements OnInit {
	constructor(
		private router: Router,
		private funcionarioService: FuncionarioService
	) {}

	tipos: Servico[] = [];
	funcionarios!: Array<Funcionario>;
	servico!: Servico;
	filterText!: string;

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
	}

	cadastrarServico() {}

	fillFormWithPreDefined() {}
}
