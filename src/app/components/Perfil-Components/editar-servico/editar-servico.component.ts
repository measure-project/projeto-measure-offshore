import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CriarEquipamentoComponent } from 'src/app/components/cadastro-components/cadastro-servicos/criar-equipamento/criar-equipamento.component';

@Component({
	selector: 'app-editar-servico',
	templateUrl: './editar-servico.component.html',
	styleUrls: ['./editar-servico.component.scss'],
})
export class EditarServicoComponent implements OnInit {
	constructor(
		private funcionarioService: FuncionarioService,
		private servicoService: ServicosService,
		private adminService: AdminService,
		private authService: AuthService,
		private currentRoute: ActivatedRoute,
		public dialog: MatDialog,
		private location: Location
	) {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
		this.equipamentos = this.servicoService.getAllEquipments();
		this.tipos = this.servicoService.getAllServices();

		this.loadUser().then(() => {
			this.loadServico();
		});
	}

	tipos!: Array<Servico>;
	uid: string | undefined;
	saveModel: boolean = false;
	funcionarios!: Array<Funcionario>;
	equipamentos!: Array<Equipamento>;
	servico!: Servico;
	docTypes: Array<string> = [];
	documentList: Array<Array<any>> = [[]];
	funcionarioSelected: Array<Funcionario> = [];
	equipamentoSelected: Array<Equipamento> = [];
	preDefinedType!: Servico;
	user!: User;

	ngOnInit(): void {
		
	}

	async loadUser() {
		return await this.adminService
			.consultClient(this.currentRoute.snapshot.paramMap.get('uid') || '')
			.then((users) => {
				users.forEach((user: any) => {
					this.user = user.data();
				});
			});
	}

	async loadServico() {
		await this.currentRoute.params.subscribe((params) => {
			this.servico = this.user.services?.find(
				(servico) => servico.uid == params['id']
			);
			this.funcionarioSelected = this.servico.funcionarios;
			this.equipamentoSelected = this.servico.equipamentos;
			this.docTypes = this.servico.documentos.map((doc: any) => doc.categoria)
		});
	}

	async editarServico() {
		this.servico.funcionarios = this.funcionarioSelected;
		this.servico.equipamentos = this.equipamentoSelected;

		const index = this.user.services?.findIndex((servico: Servico) => {
			servico.uid === this.uid;
		});

		
		if (this.saveModel) this.servicoService.editService(this.servico);
		
		this.user.services?.splice(index!, 1);
		this.user.services?.push(this.servico);
		console.log("passou");
		
		await this.authService.SetUserData(this.user);

		console.log("passou");
		

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

	confereForm(): boolean {
		return (
			!!this.servico.title &&
			!!this.servico.description &&
			!!this.servico.funcionarios &&
			!!this.servico.equipamentos
		);
	}
}
