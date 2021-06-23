import { AuthService } from "./../../services/auth.service";
import { User } from "./../../models/user";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-tela-cadastro",
	templateUrl: "./tela-cadastro.component.html",
	styleUrls: ["./tela-cadastro.component.scss"],
})
export class TelaCadastroComponent implements OnInit {
	CELULAR = "(00) 0 0000-0000"; //Mask para celular
	TELEFONE = "(00) 0000-0000"; //Mask para telefone
	phoneMask = this.TELEFONE;
	phoneLength = "";
	previousLength = 0;

	constructor(private authService: AuthService) {}

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
		console.log(user);

		this.authService.signUp(user, "senha"); // Depois eu mudo pra senha do form
	}
}
