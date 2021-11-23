import { FuncionarioService } from './../../../services/funcionario.service';
import { AdminService } from 'src/app/services/admin.service';
import { Funcionario } from 'src/app/models/funcionario';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user';
import { Servico } from './../../../models/servico';
import { ServicosService } from './../../../services/servicos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-excluir-modal',
	templateUrl: './excluir-modal.component.html',
	styleUrls: ['./excluir-modal.component.scss'],
})
export class ExcluirModalComponent implements OnInit {
	service: Servico;
	user: any;
	tipo!: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<ExcluirModalComponent>,
		private servicoService: ServicosService,
		private authService: AuthService,
		private adminService: AdminService,
		private funcionarioService: FuncionarioService
	) {
		this.tipo = this.data.tipo;

		this.user = this.data.user;
		this.service = this.data.service;
	}

	ngOnInit(): void {
		console.log('teste');
	}

	deleteServico() {
		this.servicoService
			.deleteService(this.service)
			.then(() => {
				this.user.services = this.user.services?.filter(
					(excluido: any) => excluido.uid !== this.service.uid
				);
				this.authService.SetUserData(this.user);

				this.dialogRef.close();
				this.authService.displayMessage('Serviço excluído com sucesso!', false);
			})
			.catch((error) => {
				this.dialogRef.close();
				this.authService.displayMessage(error.message, true);
			});
	}

	deleteCliente() {
		this.authService.deleteUserById(this.user.uid);
		this.dialogRef.close();
	}

	deleteAdmin() {
		this.adminService.deleteAdminById(this.user.uid);
		this.dialogRef.close();
	}

	deleteFuncionario() {
		this.funcionarioService.deleteFuncionarioById(this.user.uid);
		this.dialogRef.close(true);
	}
}
