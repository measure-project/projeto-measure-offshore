import { Servico } from './../../../models/servico';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-cadastro-servicos',
	templateUrl: './cadastro-servicos.component.html',
	styleUrls: ['./cadastro-servicos.component.scss'],
})
export class CadastroServicosComponent implements OnInit {
	constructor() {}

  tipos: Servico[] = [];

	ngOnInit(): void {}

	cadastrarServico() {}

	fillFormWithPreDefined() {
    
  }
}
