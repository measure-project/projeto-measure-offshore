import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';

@Component({
	selector: 'app-membros-atuais',
	templateUrl: './membros-atuais.component.html',
	styleUrls: ['./membros-atuais.component.scss'],
})
export class MembrosAtuaisComponent implements OnInit {
	funcionarios!: Array<Funcionario>;

	constructor(private funcionarioService: FuncionarioService) {}

	ngOnInit(): void {
		this.funcionarios = this.funcionarioService.getFuncionarios();
	}
}
