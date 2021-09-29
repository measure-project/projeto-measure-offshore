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
		private location: Location
	) {}

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('currentUser') || '{ }');

		if (this.user.isAdmin) {
			this.admin = JSON.parse(
				localStorage.getItem('currentUser') || '{ }'
			);
			this.adminService
				.consultClient(
					this.currentRoute.snapshot.paramMap.get('uid') ?? ''
				)
				.then((users) => {
					users.forEach((user: any) => {
						this.user = user.data();
					});
				});
		}
	}

	signOut() {
		if (this.admin) this.location.back();
		else this.authService.SignOut();
	}

	toAdicionarServico() {
		this.router.navigate([`${this.location.path()}/cadastroServico`]);
	}

	filialDialog() {}
}
