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

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.user = this.authService.getUserData('joogui2010@gmail.com');
		console.log(this.user); // Pra funcionar tem que fazer o login
	}
}
