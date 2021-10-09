import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { User } from './../../../models/user';
import { Location } from '@angular/common';
import { ServicosService } from './../../../services/servicos.service';
import { Equipamento } from './../../../models/equipamento';
import { FuncionarioService } from './../../../services/funcionario.service';
import { Servico } from './../../../models/servico';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';
import { MatDialog } from '@angular/material/dialog';
import { CriarEquipamentoComponent } from './criar-equipamento/criar-equipamento.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-cadastro-servicos',
	templateUrl: './cadastro-servicos.component.html',
	styleUrls: ['./cadastro-servicos.component.scss'],
})
export class CadastroServicosComponent implements OnInit {
	constructor(
		private funcionarioService: FuncionarioService,
		private servicoService: ServicosService,
		private adminService: AdminService,
		private authService: AuthService,
		private currentRoute: ActivatedRoute,
		public dialog: MatDialog,
		private location: Location
	) {}

	tipos!: Array<Servico>;
	saveModel: boolean = false;
	funcionarios!: Array<Funcionario>;
	equipamentos!: Array<Equipamento>;
	servico!: Servico;
	docTypes: Array<string> = [];
	documentList: Array<any> = [];
	funcionarioSelected: Array<Funcionario> = [];
	equipamentoSelected: Array<Equipamento> = [];
	preDefinedType!: Servico;
	user!: User;

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
		this.equipamentos = this.servicoService.getAllEquipments();
		this.tipos = this.servicoService.getAllServices();
		this.adminService
			.consultClient(this.currentRoute.snapshot.paramMap.get('uid') || '')
			.then((users) => {
				users.forEach((user: any) => {
					this.user = user.data();
				});
			});
	}

	cadastrarServico(servico: Servico) {
		// servico.documentos = this.documentList;
		servico.funcionarios = this.funcionarioSelected;
		servico.equipamentos = this.equipamentoSelected;

		servico.uid = uuidv4();

		this.user.services?.push(servico);
		this.documentList.forEach((file) => {
			this.servico.documentos.push(file.type + '/' + file.name);
		});
		this.servicoService.uploadFiles(this.documentList, servico.uid);

		if (this.saveModel) {
			this.servicoService.setService(servico);
		}

		this.authService.SetUserData(this.user);

		this.backToProfile();
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
				this.documentList.push({
					type: docType,
					name: event.target.files[i].name,
					file: event.target.files[i],
				});
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
