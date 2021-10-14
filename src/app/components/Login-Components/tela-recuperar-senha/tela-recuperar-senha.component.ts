import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tela-recuperar-senha',
	templateUrl: './tela-recuperar-senha.component.html',
	styleUrls: ['./tela-recuperar-senha.component.scss'],
})
export class TelaRecuperarSenhaComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	recuperarSenha(email: string) {
		console.log(email);

		this.authService.ForgotPassword(email);

		this.router.navigate(['/login']);
	}

	cancel() {
		this.router.navigate(['/login']);
	}
}
