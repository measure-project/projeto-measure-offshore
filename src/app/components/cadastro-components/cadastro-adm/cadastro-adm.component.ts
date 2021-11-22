import { Location } from '@angular/common';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';

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
	phoneMask: string = '(00) 0 0000-0000';
	constructor(private adminService: AdminService, private location: Location) {
		this.profilePic =
			this.admin.profilePicture || '../../../../assets/perfil-padrao.jpg';
		this.password = '';
		this.confirmPassword = '';
	}

	ngOnInit(): void {}

	setAdmin(admin: Admin): void {
		try {
			this.adminService.setAdmin(admin);
		} catch (e) {}
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

	returnToProfile(): void {
		this.location.back();
	}

	cadastrarAdmin(adminData: Admin, password: string) {
		adminData.profilePicture = '';
		adminData.isAdmin = true;

		this.adminService.signUpAdmin(adminData, password);
		this.returnToProfile();
	}
}
