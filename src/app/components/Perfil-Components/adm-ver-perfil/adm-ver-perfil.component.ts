import { Location } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from './../../../models/admin';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-adm-ver-perfil',
	templateUrl: './adm-ver-perfil.component.html',
	styleUrls: ['./adm-ver-perfil.component.scss'],
})
export class AdmVerPerfilComponent implements OnInit {
	admin!: Admin;
	readOnly: Boolean = false;
	defaultImage = '../../../../assets/perfil-padrao.jpg';

	constructor(
		private router: Router,
		private authService: AuthService,
		private currentRoute: ActivatedRoute,
		private adminService: AdminService,
		private location: Location
	) {}

	ngOnInit(): void {
		const id = this.currentRoute.snapshot.paramMap.get('uid');
		this.admin = JSON.parse(localStorage.getItem('currentUser') || '{ }');

		console.log(id);
		console.log(this.admin.uid);

		if (this.admin.uid !== id) {
			this.readOnly = true;

			this.adminService.getAdmin(id ?? '').then((admins) => {
				admins.forEach((admin: any) => {
					this.admin = admin.data();
				});
			});
		}
	}

	toMembers() {
		this.router.navigate([`/verPerfilAdm/${this.admin.uid}/membros`]);
	}

	signOut() {
		if (!this.readOnly) this.authService.SignOut();

		this.location.back();
	}
}
