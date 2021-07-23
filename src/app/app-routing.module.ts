import { AdmEditarPerfilComponent } from './components/Perfil-Components/adm-editar-perfil/adm-editar-perfil.component';
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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
