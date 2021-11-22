import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tela-bottom',
	templateUrl: './tela-bottom.component.html',
	styleUrls: ['./tela-bottom.component.scss'],
})
export class TelaBottomComponent implements OnInit {
	images = [
		{
			path: '../../../../assets/calib-torq.png',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
		{
			path: '../../../../assets/manutencao.jpg',
		},
	];

	constructor() {}

	ngOnInit(): void {}
}
