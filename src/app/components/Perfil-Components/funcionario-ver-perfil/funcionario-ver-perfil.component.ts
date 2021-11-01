import { FuncionarioService } from './../../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Funcionario } from './../../../models/funcionario';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-funcionario-ver-perfil',
	templateUrl: './funcionario-ver-perfil.component.html',
	styleUrls: ['./funcionario-ver-perfil.component.scss'],
})
export class FuncionarioVerPerfilComponent implements OnInit {
	funcionario!: Funcionario;

	constructor(
		private location: Location,
		private currentRoute: ActivatedRoute,
		private funcionarioService: FuncionarioService
	) {}

	ngOnInit(): void {
		const fid = this.currentRoute.snapshot.paramMap.get('fid');

		if (fid)
			this.funcionarioService
				.getFuncionarioById(fid)
				.then((funcionarios) => {
					funcionarios.forEach((funcionario: any) => {
						this.funcionario = funcionario.data();
						console.log(this.funcionario.documents);

						this.funcionarioService.downloadFiles(
							this.funcionario.email,
							this.funcionario.documents,
							0
						);
					});
				});
	}

	back() {
		this.location.back();
	}

	onErrorImg(e: any) {
		if (e) e.target.src = '../../../../assets/perfil-padrao.jpg';
	}
}
