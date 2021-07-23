import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-editar-perfil',
  templateUrl: './adm-editar-perfil.component.html',
  styleUrls: ['./adm-editar-perfil.component.scss'],
})
export class AdmEditarPerfilComponent implements OnInit {
  user!: User;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.afAuth.onAuthStateChanged((user) => {
      if (user)
        this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      else this.router.navigate(['/login']);
    });
  }

  defaultImage: any = '../../../../assets/manutencao.jpg';

  CELULAR = '(00) 0 0000-0000'; //Mask para celular
  TELEFONE = '(00) 0000-0000'; //Mask para telefone
  phoneMask = this.TELEFONE;
  phoneLength = '';
  previousLength = 0;

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

  returnToProfile() {
    this.router.navigate(['']);
  }

  editPhoto(event: any) {}

  editUserData() {
    this.authService.SetUserData(this.user);
    this.returnToProfile();
    this.authService.displayMessage('Perfil Atualizado!', false);
  }
}
