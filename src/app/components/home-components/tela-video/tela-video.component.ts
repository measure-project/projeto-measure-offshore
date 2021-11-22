import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-tela-video',
	templateUrl: './tela-video.component.html',
	styleUrls: ['./tela-video.component.scss'],
})
export class TelaVideoComponent implements OnInit {
	user: User = {} as User;

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit(): void {}

	toLogin() {
		this.router.navigate(['/login']);
	}

	@HostListener('window:scroll', ['$event']) // Mudar cor da nav bar ao descer o scroll
	onWindowScroll() {
		let element = document.querySelector('.toolBar') as HTMLElement; // Pega o elemento hmtl pela classe

		if (window.pageYOffset > element.clientHeight)
			//Se o offset, ou seja, a posição atual do scroll for maior que a altura da tela
			element.classList.add('toolBar-color', 'mat-elevation-z4');
		// Adiciona essas classes à nav bar
		else element.classList.remove('toolBar-color', 'mat-elevation-z4'); // Remove essas classes da nav bar
	}

	goToTop() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}
}
