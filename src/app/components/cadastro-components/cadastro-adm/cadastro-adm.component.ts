import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cadastro-adm',
	templateUrl: './cadastro-adm.component.html',
	styleUrls: ['./cadastro-adm.component.scss'],
})
export class CadastroAdmComponent implements OnInit {
	admin = {} as Admin;
	password: string;
	confirmPassword: string;
	profilePic: any;
	documentSelected: any;
	phoneMask: string = '(00) 0 0000-0000';
	constructor(private adminService: AdminService, private router: Router) {
		this.profilePic =
			this.admin.profilePicture || '../../../../assets/perfil-padrao.jpg';
		this.password = '';
		this.confirmPassword = '';
	}

	ngOnInit(): void {
		this.documentSelected = document.querySelector('#documentList');
	}

	setAdmin(admin: Admin): void {
		try {
			this.adminService.setAdmin(admin);
		} catch (e) {
			console.log(`Erro: ${e}`);
		}
	}

	editPhoto(event: any) {
		if (event.target.files && event.target.files[0]) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(event.target.files[0]);

			fileReader.onload = (e) => {
				if (e) {
					this.admin.profilePicture = e.target?.result;
					this.profilePic = this.admin.profilePicture;
				}
			};
		}
	}

	addDocument(event: any) {
		if (!this.admin.documents) this.admin.documents = [];

		if (event.target.files && event.target.files[0]) {
			for (let i = 0; i < event.target.files.length; i++) {
				this.admin.documents.push(event.target.files[i]);
			}
		}
	}

	returnToProfile(): void {
		this.router.navigate(['/verPerfilAdm']);
	}

	cadastrarAdmin(adminData: Admin, password: string) {
		adminData.profilePicture = '';
		adminData.documents = [];
		adminData.isAdmin = true;

		this.adminService.singUpAdmin(adminData, password);
		//this.router.navigate(['/verPerfilAdm']);
	}
}
