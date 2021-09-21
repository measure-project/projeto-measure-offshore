import { Location } from '@angular/common';
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
		public dialog: MatDialog,
		private location: Location
	) {}

	tipos!: Array<Servico>;
	saveModel: boolean = false;
	funcionarios!: Array<Funcionario>;
	equipamentos!: Array<Equipamento>;
	servico!: Servico;
	docTypes: Array<string> = [];
	documentList: Array<Array<any>> = [[]];
	funcionarioSelected: Array<Funcionario> = [];
	equipamentoSelected: Array<Equipamento> = [];
	preDefinedType!: Servico;

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
		this.equipamentos = this.servicoService.getAllEquipments();
		this.tipos = this.servicoService.getAllServices();
	}

	cadastrarServico(servico: Servico) {
		servico.funcionarios = this.funcionarioSelected;
		servico.equipamentos = this.equipamentoSelected;

		if (this.saveModel) {
			this.servicoService.setService(servico);
		}

		this.location.back();
	}

	fillFormWithPreDefined(service: Servico) {
		this.preDefinedType = service;
		console.log(this.preDefinedType.title);
	}

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

	backToProfile() {
		this.location.back();
	}
}
