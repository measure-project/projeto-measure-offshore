import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tela-cadastro',
	templateUrl: './tela-cadastro.component.html',
	styleUrls: ['./tela-cadastro.component.scss'],
})
export class TelaCadastroComponent implements OnInit {
	CELULAR = '(00) 0 0000-0000'; //Mask para celular
	TELEFONE = '(00) 0000-0000'; //Mask para telefone
	phoneMask = this.TELEFONE;
	phoneLength = '';
	previousLength = 0;

	password!: string;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onPhoneChanged() {
		//Função que checa o tamanho do numero, se for maior que 10 é telefone, senão é celular
		if (this.phoneLength.length <= 10 && this.phoneMask === this.CELULAR) {
			this.phoneMask = this.TELEFONE;
		} else if (
			this.phoneLength.length === 10 &&
			this.phoneMask === this.TELEFONE &&
			this.previousLength === 10
		) {
			this.phoneMask = this.CELULAR;
		}

		this.previousLength = this.phoneLength.length;
	}

	userSignUp(user: User) {
		try {
			this.authService.signUp(user, this.password);
			this.authService.displayMessage(
				'Conta criada com sucesso! Acesse seu e-mail para confirmar o cadastro.',
				false
			);
		} catch (err) {
			this.authService.displayMessage(
				'Ocorreu um erro, não foi possível criar a conta. Erro: ' + err,
				true
			);
		}

		this.router.navigate(['/login']);
	}

	cancel() {
		this.router.navigate(['/verPerfilAdm']);
	}
}
