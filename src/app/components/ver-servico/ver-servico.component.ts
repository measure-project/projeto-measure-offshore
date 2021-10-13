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
	downloadUrl!: Array<string>;

	constructor(
		private servicoService: ServicosService,
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
						}
					});
				});
			});
		}
	}

	backToProfile() {
		this.location.back();
	}
}
