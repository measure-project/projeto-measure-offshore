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

	// Array para teste
	services: Array<any> = [
		{
			name: 'Jardinagem especializada',
			description:
				'Serviço contratado por 6 meses. O trabalho contará com 16 funcionarios especializados da Measure Company e terá serviço de consultoria 24 horas. Disponibilização de equipamentos',
			date: '25/04/2020',
		},
		{
			name: 'Pintura Residencial',
			description:
				'Serviço contratado por 6 meses. O trabalho contará com 16 funcionarios especializados da Measure Company e terá serviço de consultoria 24 horas. Disponibilização de equipamentos',
			date: '15/04/2020',
		},
	];

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
		private adminService: AdminService
	) {}

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('currentUser') || '{ }');

		if (this.user.isAdmin) {
			this.admin = JSON.parse(
				localStorage.getItem('currentUser') || '{ }'
			);
			this.adminService
				.consultClient(
					this.currentRoute.snapshot.paramMap.get('uid') || ''
				)
				.then((users) => {
					users.forEach((user: any) => {
						this.user = user.data();
					});
				});
		}
	}


	signOut() {
		this.authService.SignOut();
	}

	toAdicionarServico() {
		this.router.navigate(['/cadastroServico']);
	}

	filialDialog() {
		// Mat dialog para as filiais
	}
}
