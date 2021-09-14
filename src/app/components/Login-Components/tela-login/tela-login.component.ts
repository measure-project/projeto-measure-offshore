import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';

@Component({
	selector: 'app-tela-login',
	templateUrl: './tela-login.component.html',
	styleUrls: ['./tela-login.component.scss'],
})
export class TelaLoginComponent implements OnInit {
	username: string;
	password: string;

	constructor(private authService: AuthService, private router: Router) {
		this.username = '';
		this.password = '';
	}

	ngOnInit(): void {
		console.log(this.authService.loggedIn());
	}

	logar(): void {
		this.authService.singIn(this.username, this.password);
	}

	logarGoogle(): void {
		this.authService.GoogleAuth();
	}

	forgotPassword() {
		this.router.navigate(['/passwordRecovery']);
	}

	returnToHome() {
		this.router.navigate(['/']);
	}
}
