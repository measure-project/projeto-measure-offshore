import { Admin } from './../../models/admin';
import { AdminService } from './../../services/admin.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';
import { Location } from '@angular/common';

@Component({
	selector: 'app-membros-atuais',
	templateUrl: './membros-atuais.component.html',
	styleUrls: ['./membros-atuais.component.scss'],
})
export class MembrosAtuaisComponent implements OnInit {
	funcionarios!: Array<Funcionario>;
	clientes!: Array<User>;
	admins!: Array<Admin>;
	filterText!: string;

	constructor(
		private router: Router,
		private funcionarioService: FuncionarioService,
		private adminService: AdminService,
		private authService: AuthService,
		private location: Location
	) {}

	return() {
		this.location.back();
	}

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
		this.clientes = this.authService.getAllUsers();
		this.admins = this.adminService.getAllAdmin();
	}

	verMembro(membro: User) {
		this.router.navigate([`/verPerfil`, membro.uid]);
	}
}
