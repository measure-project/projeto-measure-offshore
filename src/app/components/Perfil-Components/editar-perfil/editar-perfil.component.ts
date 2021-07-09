import { User } from './../../../models/user';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-editar-perfil',
	templateUrl: './editar-perfil.component.html',
	styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {
	user!: User;
	defaultImage = '../../../../assets/manutencao.jpg';

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
	}
}
