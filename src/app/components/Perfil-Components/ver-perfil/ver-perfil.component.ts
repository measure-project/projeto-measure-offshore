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

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.authService.afAuth.onAuthStateChanged((user) => {
			if (user && user.email) {
				console.log('CARAIO	' + user.email);
				this.user = this.authService.getUserData(user.email);
			}
		});
	}
}
