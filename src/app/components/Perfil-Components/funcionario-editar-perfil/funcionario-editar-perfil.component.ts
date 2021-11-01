import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FuncionarioService } from './../../../services/funcionario.service';
import { Funcionario } from './../../../models/funcionario';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-funcionario-editar-perfil',
	templateUrl: './funcionario-editar-perfil.component.html',
	styleUrls: ['./funcionario-editar-perfil.component.scss'],
})
export class FuncionarioEditarPerfilComponent implements OnInit {
	funcionario = {} as Funcionario;
	defaultImage: any = '../../../../assets/perfil-padrao.jpg';
	newImage: any;
	profilePicture: any;

	constructor(
		private funcionarioService: FuncionarioService,
		private location: Location,
		private currentRoute: ActivatedRoute
	) {}

	CELULAR = '(00) 0 0000-0000'; //Mask para celular
	TELEFONE = '(00) 0000-0000'; //Mask para telefone
	phoneMask = this.TELEFONE;
	phoneLength = '';
	previousLength = 0;
	onPhoneChanged() {
		//Função que checa o tamanho do numero, se for maior que 10 é telefone, senão é celular
		if (this.phoneLength.length <= 10 && this.phoneMask === this.CELULAR) {
			this.phoneMask = this.TELEFONE;
		} else if (
			this.phoneLength.length === 10 &&
			this.phoneMask === this.TELEFONE &&
			this.previousLength === 10
		) {
			this.phoneMask = this.CELULAR;
		}

		this.previousLength = this.phoneLength.length;
	}

	ngOnInit(): void {
		const fid = this.currentRoute.snapshot.paramMap.get('fid');
		if (fid)
			this.funcionarioService
				.getFuncionarioById(fid)
				.then((funcionarios) => {
					funcionarios.forEach((funcionario: any) => {
						this.funcionario = funcionario.data();

						this.funcionarioService.downloadFiles(
							this.funcionario.email,
							this.funcionario.documents,
							0
						);
					});
				});
	}

	setFuncionarioData(funcionario: Funcionario) {
		this.funcionarioService.uploadFiles(
			this.newImage,
			this.funcionario.documents,
			funcionario.email
		);

		funcionario.uid = this.funcionario.uid;

		funcionario.documents = [];
		this.funcionario.documents.forEach((doc) => {
			// GAMBIARRA
			if (doc.nome) funcionario.documents.push(doc.nome);
			else funcionario.documents.push(doc);
		});

		console.log(funcionario);

		this.funcionarioService.setFuncionario(funcionario);
		this.returnToProfile();
	}

	returnToProfile() {
		this.location.back();
	}

	editPhoto(event: any) {
		if (event.target.files && event.target.files[0]) {
			let fileReader = new FileReader();
			this.newImage = event.target.files[0];
			fileReader.readAsDataURL(event.target.files[0]);

			fileReader.onload = (e) => {
				if (e) {
					this.profilePicture = e.target?.result;
				}
			};
		}
	}

	addDocument(event: any) {
		if (!this.funcionario.documents) this.funcionario.documents = [];

		if (event.target.files && event.target.files[0]) {
			for (let i = 0; i < event.target.files.length; i++) {
				this.funcionario.documents.push({
					nome: event.target.files[i].name,
					arquivo: event.target.files[i],
				});
			}
		}
	}

	onErrorImg(e: any) {
		if (e.target) {
			e.target.src = '../../../../assets/perfil-padrao.jpg';
		}
	}
}
