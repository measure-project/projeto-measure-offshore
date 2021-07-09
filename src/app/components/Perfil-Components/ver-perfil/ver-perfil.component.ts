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
		this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
	}
}
