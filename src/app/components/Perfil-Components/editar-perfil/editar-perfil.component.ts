import { LoadinfoService } from './../../../services/loadinfo.service';
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
	defaultImage: any = '../../../../assets/perfil-padrao.jpg';
	newImage: any;

	profilePicEdited: boolean;

	CELULAR = '(00) 0 0000-0000'; //Mask para celular
	TELEFONE = '(00) 0000-0000'; //Mask para telefone
	phoneMask = this.TELEFONE;
	phoneLength = '';
	previousLength = 0;

	constructor(
		private authService: AuthService,
		private router: Router,
		private loadinfoService: LoadinfoService
	) {
		this.profilePicEdited = false;
	}

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

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('currentUser') || '{ }');
	}

	async editUserData() {
		if (this.profilePicEdited) {
			this.authService.uploadProfilePicture(this.user.uid, this.newImage);
			this.authService
				.downloadProfilePicture(this.user.uid)
				.subscribe(async (imgUrl: string) => {
					this.user.profilePicture = imgUrl;
				});
		}
		await this.authService.SetUserData(this.user);
		this.router.navigate(['/verPerfil']);
		this.authService.displayMessage('Perfil Atualizado!', false);
	}

	returnToProfile() {
		this.router.navigate([`/verPerfil/${this.user.uid}`]);
	}

	editPhoto(event: any) {
		if (event.target.files && event.target.files[0]) {
			let fileReader = new FileReader();
			this.newImage = event.target.files[0];
			fileReader.readAsDataURL(event.target.files[0]);

			fileReader.onload = (e) => {
				if (e) {
					this.user.profilePicture = e.target?.result;
				}
			};
		}
		this.profilePicEdited = true;
	}
}
