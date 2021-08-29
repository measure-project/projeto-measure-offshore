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
	docTypes: Array<string> = [];
	documentType!: string;

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
	}

	cadastrarServico() {}

	fillFormWithPreDefined() {}

	addDocumentType(typeName: string) {
		this.docTypes.push(typeName);
	}

	addDocuments(docType: string, event: any) {
		console.log(event.target);
		console.log(docType);

		// Ver um jeito de separar o preview dos docs
		// de acordo com os tipos
	}
}
