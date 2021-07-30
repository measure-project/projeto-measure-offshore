import { Funcionario } from './../../../models/funcionario';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.scss']
})
export class CadastroFuncionarioComponent implements OnInit {
  
  funcionario!: Funcionario;
	defaultImage: any = '../../../../assets/manutencao.jpg';
	newImage: any;

	CELULAR = '(00) 0 0000-0000'; //Mask para celular
	TELEFONE = '(00) 0000-0000'; //Mask para telefone
	phoneMask = this.TELEFONE;
	phoneLength = '';
	previousLength = 0;

  
  constructor(private authService: AuthService, private router: Router) { }
  
  onPhoneChanged() {
		//Função que checa o tamanho do numero, se for maior que 10 é telefone, senão é celular
		if (this.phoneLength.length <= 10 && this.phoneMask === this.CELULAR) {
			this.phoneMask = this.TELEFONE;
		} else if (
			this.phoneLength.length === 10 &&
			this.phoneMask === this.TELEFONE &&
			this.previousLength === 10
		) {
			this.phoneMask = this.CELULAR;
		}

		this.previousLength = this.phoneLength.length;
	}

  ngOnInit(): void {
		
  }

  setFuncionarioData(funcionario: Funcionario){
    console.log(funcionario)
  }

  returnToProfile() {
		this.router.navigate(['/verPerfilAdm']);
	}

	editPhoto(event: any) {
		if (event.target.files && event.target.files[0]) {
			let fileReader = new FileReader();
			this.newImage = event.target.files[0];
			fileReader.readAsDataURL(event.target.files[0]);

			fileReader.onload = (e) => {
				if (e) {
					this.funcionario.profilePicture = e.target?.result;
				}
			};
		}
	}

}
