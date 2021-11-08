import { ServicosService } from './../../../../services/servicos.service';
import { Equipamento } from './../../../../models/equipamento';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-criar-equipamento',
	templateUrl: './criar-equipamento.component.html',
	styleUrls: ['./criar-equipamento.component.scss'],
})
export class CriarEquipamentoComponent implements OnInit {
	constructor(private servicoService: ServicosService) {}

	ngOnInit(): void {}

	createEquipment(equipment: Equipamento) {
		this.servicoService.setEquipment(equipment);
	}
}
