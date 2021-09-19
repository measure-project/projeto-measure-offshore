import { LoadinfoService } from './../../../services/loadinfo.service';
import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ver-perfil',
	templateUrl: './ver-perfil.component.html',
	styleUrls: ['./ver-perfil.component.scss'],
})
export class VerPerfilComponent implements OnInit {
	defaultImage = '../../../../assets/manutencao.jpg';
	user!: User;

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

	constructor(private authService: AuthService, private router: Router, private loadinfoService: LoadinfoService) {}

	ngOnInit(): void {
		this.authService.afAuth.onAuthStateChanged(async (user) => {
			if (user) {
				this.loadinfoService.loadInfoFromPageCache().then((user) => {
					this.user = user;
				})
			} else this.router.navigate(['/login']);
		});
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
