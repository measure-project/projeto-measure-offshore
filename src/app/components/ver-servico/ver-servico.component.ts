import { FuncionarioService } from './../../services/funcionario.service';
import { Servico } from './../../models/servico';
import { ServicosService } from './../../services/servicos.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ver-servico',
	templateUrl: './ver-servico.component.html',
	styleUrls: ['./ver-servico.component.scss'],
})
export class VerServicoComponent implements OnInit {
	service!: Servico;
	docTypes: Array<any> = [];
	doclist: Array<any> = [];

	//Variáveis pro expansion panel
	panelOpenState: boolean = false;
	step: number = 0;

	constructor(
		private servicoService: ServicosService,
		private funcionarioService: FuncionarioService,
		private currentRoute: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		// Pegar id do user e do servico na url, e dar um query para pegar os dados do serviço
		const uid = this.currentRoute.snapshot.paramMap.get('uid');
		const sid = this.currentRoute.snapshot.paramMap.get('sid');

		if (uid && sid) {
			this.servicoService.getServiceFromClient(uid).then((users) => {
				users.forEach((user: any) => {
					user.data().services.forEach((service: any) => {
						if (service.uid == sid) {
							this.service = service;
							this.service.documentos.forEach((doc) => {
								this.doclist.push(doc.categoria);
							});

							this.docTypes = [...new Set(this.doclist)];

							this.servicoService.downloadFiles(
								sid,
								service.documentos
							);

							let funcionarioIndex = 0;
							this.service.funcionarios.forEach((funcionario) => {
								this.funcionarioService.downloadFiles(
									funcionario.email,
									funcionario.documents,
									funcionarioIndex
								);
								funcionarioIndex++;
							});
						}
					});
				});
			});
		}
	}

	backToProfile() {
		this.location.back();
	}

	// Setando qual expansion panel abrir
	setStep(n: number) {
		this.step = n;
	}
}
