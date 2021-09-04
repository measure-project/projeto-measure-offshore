import { ServicosService } from './../../../services/servicos.service';
import { Equipamento } from './../../../models/equipamento';
import { FuncionarioService } from './../../../services/funcionario.service';
import { Router } from '@angular/router';
import { Servico } from './../../../models/servico';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';
import { MatDialog } from '@angular/material/dialog';
import { CriarEquipamentoComponent } from './criar-equipamento/criar-equipamento.component';

@Component({
	selector: 'app-cadastro-servicos',
	templateUrl: './cadastro-servicos.component.html',
	styleUrls: ['./cadastro-servicos.component.scss'],
})
export class CadastroServicosComponent implements OnInit {
	constructor(
		private router: Router,
		private funcionarioService: FuncionarioService,
		private servicoService: ServicosService,
		public dialog: MatDialog
	) {}

	tipos: Servico[] = [];
	funcionarios!: Array<Funcionario>;
	equipamentos!: Array<Equipamento>;
	servico!: Servico;
	docTypes: Array<string> = [];
	documentList: Array<Array<any>> = [[]];
	funcionarioSelected: Array<Funcionario> = [];
	equipamentoSelected: Array<Equipamento> = [];

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
		this.equipamentos = this.servicoService.getAllEquipments();
	}

	cadastrarServico() {}

	fillFormWithPreDefined() {}

	addDocumentType(typeName: string) {
		this.docTypes.push(typeName);
	}

	addDocuments(docType: string, event: any) {
		if (event.target.files) {
			for (let i = 0; i < event.target.files.length; i++) {
				this.documentList.push([docType, event.target.files[i].name]);
			}
		}
	}

	addFuncionario(funcionario: Funcionario) {
		this.funcionarioSelected.push(funcionario);
	}

	addEquipamento(equipamento: Equipamento) {
		this.equipamentoSelected.push(equipamento);
	}

	openDialog() {
		this.dialog.open(CriarEquipamentoComponent, {
			width: '75%',
		});
	}
}
