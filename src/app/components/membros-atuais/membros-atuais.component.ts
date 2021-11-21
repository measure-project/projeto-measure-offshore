import { Admin } from './../../models/admin';
import { AdminService } from './../../services/admin.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExcluirModalComponent } from '../modals/excluir-modal/excluir-modal.component';

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
		private location: Location,
		private dialog: MatDialog
	) {}

	return() {
		this.location.back();
	}

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getAllFuncionarios();
		this.clientes = this.authService.getAllUsers();
		this.admins = this.adminService.getAllAdmin();
	}

	verCliente(cliente: User) {
		this.router.navigate([`/verPerfil`, cliente.uid]);
	}

	verFuncionario(funcionario: Funcionario) {
		this.router.navigate([
			`/${this.location.path()}/funcionarios/`,
			funcionario.uid,
		]);
	}

	verAdmin(admin: Admin) {
		this.router.navigate(['/verPerfilAdm', admin.uid]);
	}

	deletarFuncionario(funcionario: Funcionario) {
		const config: MatDialogConfig<any> = {
			data: {
				user: funcionario,
				service: {},
				tipo: 'funcionario',
			},
		};

		this.dialog
			.open(ExcluirModalComponent, config)
			.afterClosed()
			.subscribe((res) => {
				if (res)
					this.funcionarios = this.funcionarios.filter((deletado) => {
						return funcionario.uid !== deletado.uid;
					});
			});
	}

	deletarCliente(cliente: User) {
		const config: MatDialogConfig<any> = {
			data: {
				user: cliente,
				service: {},
				tipo: 'cliente',
			},
		};

		this.dialog
			.open(ExcluirModalComponent, config)
			.afterClosed()
			.subscribe((res) => {
				if (res)
					this.clientes = this.clientes.filter((deletado) => {
						return cliente.uid !== deletado.uid;
					});
			});
	}

	deletarAdmin(admin: Admin) {
		const config: MatDialogConfig<any> = {
			data: {
				user: admin,
				service: {},
				tipo: 'administrador',
			},
		};

		this.dialog
			.open(ExcluirModalComponent, config)
			.afterClosed()
			.subscribe((res) => {
				if (res)
					this.admins = this.admins.filter((deletado) => {
						return admin.uid !== deletado.uid;
					});
			});
	}
}
