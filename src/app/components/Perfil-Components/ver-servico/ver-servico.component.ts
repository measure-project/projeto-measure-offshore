import { Servico } from './../../../models/servico';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ver-servico',
	templateUrl: './ver-servico.component.html',
	styleUrls: ['./ver-servico.component.scss'],
})
export class VerServicoComponent implements OnInit {
	servico = {} as Servico;
	constructor(private location: Location) {}

	ngOnInit(): void {}

	goBack() {
		this.location.back();
	}
}
