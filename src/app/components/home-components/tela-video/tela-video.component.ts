import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tela-video',
	templateUrl: './tela-video.component.html',
	styleUrls: ['./tela-video.component.scss'],
})
export class TelaVideoComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	toLogin() {
		this.router.navigate(['/login']);
	}
}
