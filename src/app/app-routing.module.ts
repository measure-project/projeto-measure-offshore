import { CadastroAdmComponent } from './components/cadastro-components/cadastro-adm/cadastro-adm.component';
import { CadastroFuncionarioComponent } from './components/cadastro-components/cadastro-funcionario/cadastro-funcionario.component';
import { AdmEditarPerfilComponent } from './components/Perfil-Components/adm-editar-perfil/adm-editar-perfil.component';
import { AdmVerPerfilComponent } from './components/Perfil-Components/adm-ver-perfil/adm-ver-perfil.component';
import { EditarPerfilComponent } from './components/Perfil-Components/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './components/Perfil-Components/ver-perfil/ver-perfil.component';
import { HomePageComponent } from './components/home-components/home-page/home-page.component';
import { TelaCadastroComponent } from './components/cadastro-components/tela-cadastro-cliente/tela-cadastro.component';
import { TelaLoginComponent } from './components/Login-Components/tela-login/tela-login.component';
import { TelaRecuperarSenhaComponent } from './components/Login-Components/tela-recuperar-senha/tela-recuperar-senha.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembrosAtuaisComponent } from './components/membros-atuais/membros-atuais.component';

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
		path: 'cadastroCliente',
		component: TelaCadastroComponent,
	},
	{
		path: 'cadastroFuncionario',
		component: CadastroFuncionarioComponent,
	},
	{
		path: 'cadastroAdmin',
		component: CadastroAdmComponent,
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
		path: 'membros',
		component: MembrosAtuaisComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
