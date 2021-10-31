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

	servico: Servico = {
		uid: '',
		title: '',
		description: '',
		documentos: [],
		funcionarios: [],
		equipamentos: [],
	};

	tipos!: Array<Servico>;
	saveModel: boolean = false;
	funcionarios!: Array<Funcionario>;
	equipamentos!: Array<Equipamento>;
	docTypes: Array<string> = [];
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

	async cadastrarServico(servico: Servico) {
		servico.documentos = this.servico.documentos.map((document) => {
			return {
				categoria: document.categoria,
				nome: document.nome,
			};
		});
		servico.funcionarios = this.servico.funcionarios;
		servico.equipamentos = this.servico.equipamentos;

		servico.uid = uuidv4();

		this.servico.documentos.forEach((file) => {
			this.servico.documentos.push({
				name: file.name,
				type: file.type,
			});
		});

		this.servicoService.uploadFiles(this.servico.documentos, servico.uid);

		if (this.saveModel) {
			this.servicoService.setService(servico);
		}

		this.user.services?.push(servico);
		await this.authService.SetUserData(this.user);

		this.backToProfile();
	}

	fillFormWithPreDefined(service: Servico) {
		this.preDefinedType = service;
	}

	addDocumentType(typeName: string) {
		if (!typeName) {
			this.authService.displayMessage('Nome de tipo não inserido!', true);
			return;
		}

		if (this.docTypes.includes(typeName)) {
			this.authService.displayMessage('Nome já existente!', true);
			return;
		}

		this.docTypes.push(typeName);

		(<HTMLInputElement>document.getElementById('typeName')).value = '';
	}

	changeFunction(docType: string, event: any) {
		this.addDocuments(docType, event);
	}

	removeDocumentType(docType: string) {
		this.docTypes.splice(this.docTypes.indexOf(docType), 1);
	}

	addDocuments(docType: string, event: any) {
		if (event.target.files) {
			for (let i = 0; i < event.target.files.length; i++) {
				this.servico.documentos.push({
					categoria: docType,
					nome: event.target.files[i].name,
					documento: event.target.files[i],
				});
			}
		}
	}

	addFuncionario(funcionario: Funcionario) {
		this.servico.funcionarios.push(funcionario);
	}

	addEquipamento(equipamento: Equipamento) {
		this.servico.equipamentos.push(equipamento);
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
