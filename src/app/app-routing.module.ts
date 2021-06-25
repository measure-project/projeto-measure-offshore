import { TelaRecuperarSenhaComponent } from './components/tela-recuperar-senha/tela-recuperar-senha.component';
import { TelaCadastroComponent } from './components/tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
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
