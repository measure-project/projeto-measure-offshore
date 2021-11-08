import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | boolean {
		if (this.authService.loggedIn()) {
			const user = JSON.parse(
				localStorage.getItem('currentUser') || '{ }'
			);
			if (user.isAdmin)
				this.router.navigate([`/verPerfilAdm/${user.uid}`]);
			else this.router.navigate([`/verPerfil/${user.uid}`]);
			return false;
		}
		return true;
	}
}
