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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
