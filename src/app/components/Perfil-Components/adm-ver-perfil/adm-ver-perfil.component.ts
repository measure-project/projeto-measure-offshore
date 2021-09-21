import { Admin } from './../../../models/admin';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-adm-ver-perfil',
	templateUrl: './adm-ver-perfil.component.html',
	styleUrls: ['./adm-ver-perfil.component.scss'],
})
export class AdmVerPerfilComponent implements OnInit {
	admin!: Admin;
	defaultImage = '../../../../assets/perfil-padrao.jpg';

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit(): void {
		this.admin = JSON.parse(localStorage.getItem('currentUser') || '{ }');
	}

	// Por alguma razão, essa função não funciona e retorna um erro de "não é possível ler name de undefined no console". Precisamos checar depois

	toMembers() {
		this.router.navigate([`/verPerfilAdm/${this.admin.uid}/membros`]);
	}

	signOut() {
		this.authService.SignOut();
	}
}
