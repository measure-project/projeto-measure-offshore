import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
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
export class RoleGuardService implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | boolean {
		const user = JSON.parse(localStorage.getItem('currentUser') || '{ }');

		if (user.isAdmin) return true;
		this.router.navigate(['/verPerfil']);
		return false;
	}
}
