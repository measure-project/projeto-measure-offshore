import { TelaCadastroComponent } from "./components/tela-cadastro/tela-cadastro.component";
import { TelaLoginComponent } from "./components/tela-login/tela-login.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		component: TelaLoginComponent,
	},
	{
		path: "signup",
		component: TelaCadastroComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
