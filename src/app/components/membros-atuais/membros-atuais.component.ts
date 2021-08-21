import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
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
	clientes!: Array<User>;

	constructor(
		private router: Router,
		private funcionarioService: FuncionarioService,
		private authService: AuthService
	) {}

	return() {
		this.router.navigate(['/verPerfilAdm']);
	}

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getFuncionarios();
		this.clientes = this.authService.getAllUsers();
	}
}
