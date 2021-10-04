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
	) {}

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
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
		this.equipamentos = this.servicoService.getAllEquipments();
		this.tipos = this.servicoService.getAllServices();
		this.adminService
			.consultClient(this.currentRoute.snapshot.paramMap.get('uid') || '')
			.then((users) => {
				users.forEach((user: any) => {
					this.user = user.data();
				});
				this.uid = this.servico.uid;
			});
	}

	editarServico(servico: Servico) {
		servico.funcionarios = this.funcionarioSelected;
		servico.equipamentos = this.equipamentoSelected;

		const index = this.user.services?.findIndex((servico: Servico) => {
			servico.uid === this.uid;
		});

		this.user.services?.splice(index!, 1);
		this.user.services?.push(this.servico);

		if (this.saveModel) {
			console.log('ENTROU');
			this.servicoService.setService(servico);
		}

		console.log(this.user);
		this.authService.SetUserData(this.user);

		this.location.back();
	}

	fillFormWithPreDefined(service: Servico) {
		this.preDefinedType = service;
		console.log(this.preDefinedType.title);
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
