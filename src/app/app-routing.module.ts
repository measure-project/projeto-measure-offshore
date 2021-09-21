import { RoleGuardService } from './guards/role-guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import { RouteGuardService } from './guards/route-guard.service';
import { CadastroServicosComponent } from './components/cadastro-components/cadastro-servicos/cadastro-servicos.component';
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
		canActivate: [LoginGuardService],
	},
	{
		path: 'verPerfilAdm/:uid/cadastroCliente',
		component: TelaCadastroComponent,
		canActivate: [RouteGuardService, RoleGuardService],
	},
	{
		path: 'verPerfilAdm/:uid/cadastroFuncionario',
		component: CadastroFuncionarioComponent,
		canActivate: [RouteGuardService, RoleGuardService],
	},
	{
		path: 'verPerfilAdm/:uid/cadastroAdmin',
		component: CadastroAdmComponent,
		canActivate: [RouteGuardService, RoleGuardService],
	},
	{
		path: 'verPerfil/:uid/cadastroServico',
		component: CadastroServicosComponent,
		canActivate: [RouteGuardService, RoleGuardService],
	},
	{
		path: 'passwordRecovery',
		component: TelaRecuperarSenhaComponent,
	},
	{
		path: 'verPerfil/:uid',
		component: VerPerfilComponent,
		canActivate: [RouteGuardService],
	},
	{
		path: 'verPerfil/:uid/editarPerfil',
		component: EditarPerfilComponent,
		canActivate: [RouteGuardService],
	},
	{
		path: 'verPerfilAdm/:uid',
		component: AdmVerPerfilComponent,
		canActivate: [RouteGuardService, RoleGuardService],
	},
	{
		path: 'verPerfilAdm/:uid/editarPerfil',
		component: AdmEditarPerfilComponent,
		canActivate: [RouteGuardService, RoleGuardService],
	},
	{
		path: 'verPerfilAdm/:uid/membros',
		component: MembrosAtuaisComponent,
		canActivate: [RouteGuardService, RoleGuardService],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
