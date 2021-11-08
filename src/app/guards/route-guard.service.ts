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
export class RouteGuardService implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | boolean {
		if (this.authService.loggedIn()) return true;
		this.router.navigate(['/login']);
		return false;
	}
}
