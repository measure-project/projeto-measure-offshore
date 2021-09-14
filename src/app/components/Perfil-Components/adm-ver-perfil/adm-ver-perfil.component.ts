import { Admin } from './../../../models/admin';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-adm-ver-perfil',
	templateUrl: './adm-ver-perfil.component.html',
	styleUrls: ['./adm-ver-perfil.component.scss'],
})
export class AdmVerPerfilComponent implements OnInit {
	admin!: Admin;
	defaultImage = '../../../../assets/manutencao.jpg';

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.afAuth.onAuthStateChanged((user) => {
			if (user)
				this.admin = JSON.parse(
					localStorage.getItem('currentUser') || '{}'
				);
			else this.router.navigate(['/login']);
		});
	}

	// Por alguma razão, essa função não funciona e retorna um erro de "não é possível ler name de undefined no console". Precisamos checar depois

	toMembers() {
		this.router.navigate(['/membros']);
	}

	signOut() {
		this.authService.SignOut();
		this.router.navigate(['/login']);
	}
}
