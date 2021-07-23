<<<<<<< HEAD
import { AdmEditarPerfilComponent } from './components/Perfil-Components/adm-editar-perfil/adm-editar-perfil.component';
=======
>>>>>>> 60d176d4bdcacb6c1c8a631f5d9c821d5174ae1e
import { AdmVerPerfilComponent } from './components/Perfil-Components/adm-ver-perfil/adm-ver-perfil.component';
import { EditarPerfilComponent } from './components/Perfil-Components/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './components/Perfil-Components/ver-perfil/ver-perfil.component';
import { HomePageComponent } from './components/home-components/home-page/home-page.component';
import { TelaCadastroComponent } from './components/Login-Components/tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './components/Login-Components/tela-login/tela-login.component';
import { TelaRecuperarSenhaComponent } from './components/Login-Components/tela-recuperar-senha/tela-recuperar-senha.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: TelaLoginComponent,
  },
  {
    path: 'signup',
    component: TelaCadastroComponent,
  },
  {
    path: 'passwordRecovery',
    component: TelaRecuperarSenhaComponent,
  },
  {
    path: 'verPerfil',
    component: VerPerfilComponent,
  },
  {
    path: 'editarPerfil',
    component: EditarPerfilComponent,
  },
  {
    path: 'verPerfilAdm',
    component: AdmVerPerfilComponent,
  },
  {
    path: 'editarPerfilAdm',
    component: AdmEditarPerfilComponent,
  },
=======
	{
		path: '',
		component: HomePageComponent,
	},
	{
		path: 'login',
		component: TelaLoginComponent,
	},
	{
		path: 'signup',
		component: TelaCadastroComponent,
	},
	{
		path: 'passwordRecovery',
		component: TelaRecuperarSenhaComponent,
	},
	{
		path: 'verPerfil',
		component: VerPerfilComponent,
	},
	{
		path: 'editarPerfil',
		component: EditarPerfilComponent,
	},
	{
		path: 'verPerfilAdm',
		component: AdmVerPerfilComponent,
	},
>>>>>>> 60d176d4bdcacb6c1c8a631f5d9c821d5174ae1e
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
