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
	profilePic: any;
	phoneMask: string = '(00) 0 0000-0000';
	constructor(private adminService: AdminService, private router: Router) {
		this.profilePic =
			this.admin.profilePicture || '../../../../assets/perfil-padrao.jpg';
	}

	ngOnInit(): void {}

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

	addDocument(event: any) {}

	returnToProfile(): void {
		this.router.navigate(['/verPerfilAdmin']);
	}
}
