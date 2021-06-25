import { Router } from '@angular/router';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

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

	ngOnInit(): void {}

	logar(): void {
		this.authService.singIn(this.username, this.password);
	}

	logarGoogle(): void {
		this.authService.GoogleAuth();
	}

	navigateToCreateNewAccount(): void {
		this.router.navigate(['/signup']);
		console.log(this.username, this.password);
	}

	forgotPassword() {
		this.router.navigate(['/passwordRecovery']);
	}
}
