import { Router } from '@angular/router';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';

@Component({
	selector: 'app-membros-atuais',
	templateUrl: './membros-atuais.component.html',
	styleUrls: ['./membros-atuais.component.scss'],
})
export class MembrosAtuaisComponent implements OnInit {
	funcionarios!: Array<Funcionario>;

	constructor(
		private router: Router,
		private funcionarioService: FuncionarioService
	) {}

	return() {
		this.router.navigate(['/verPerfilAdm']);
	}

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getFuncionarios();
	}
}
