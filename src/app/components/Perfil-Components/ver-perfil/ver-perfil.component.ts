import { ServicosService } from './../../../services/servicos.service';
import { Servico } from './../../../models/servico';
import { Location } from '@angular/common';
import { Admin } from 'src/app/models/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
	selector: 'app-ver-perfil',
	templateUrl: './ver-perfil.component.html',
	styleUrls: ['./ver-perfil.component.scss'],
})
export class VerPerfilComponent implements OnInit {
	defaultImage = '../../../../assets/perfil-padrao.jpg';
	user!: User;
	admin!: Admin;
	services!: Array<Servico>;
	hasServices: boolean = false;

	filiais: Array<any> = [
		{
			name: 'Filial 1 - MG',
		},
		{
			name: 'Filial 1 - MG',
		},
		{
			name: 'Filial 1 - MG',
		},
		{
			name: 'Filial 1 - MG',
		},
		{
			name: 'Filial 1 - MG',
		},
		{
			name: 'Filial 1 - MG',
		},
	];

	constructor(
		private authService: AuthService,
		private router: Router,
		private currentRoute: ActivatedRoute,
		private adminService: AdminService,
		private location: Location,
		private servicoService: ServicosService
	) {}

	async ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('currentUser') || '{ }');

		if (this.user.isAdmin) {
			this.admin = JSON.parse(localStorage.getItem('currentUser') || '{ }');
			await this.adminService
				.consultClient(this.currentRoute.snapshot.paramMap.get('uid') ?? '')
				.then(users => {
					users.forEach((user: any) => {
						this.user = user.data();
						console.log(this.user);
					});
				});
		}

		this.hasServices = this.user.services!?.length > 0 || false;
	}

	signOut() {
		if (this.admin) this.location.back();
		else this.authService.SignOut();
	}

	async deleteService(id: string) {
		console.log('Excluindo ' + id);
		this.servicoService.deleteService(id).then(() => {
			this.user.services = this.user.services?.filter(
				service => service.uid !== id
			);
			this.authService.SetUserData(this.user);
		});
	}

	toAdicionarServico() {
		this.router.navigate([`${this.location.path()}/cadastroServico`]);
	}

	filialDialog() {}
}
