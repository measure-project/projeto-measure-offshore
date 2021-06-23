import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import "@angular/compiler";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "src/environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TelaLoginComponent } from "./components/tela-login/tela-login.component";
import { TelaCadastroComponent } from "./components/tela-cadastro/tela-cadastro.component";

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

import { NgxMaskModule } from "ngx-mask";

@NgModule({
	declarations: [AppComponent, TelaLoginComponent, TelaCadastroComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		BrowserAnimationsModule,
		MatCardModule,
		MatFormFieldModule,
		MatButtonModule,
		FormsModule,
		NgxMaskModule.forRoot(),
		MatInputModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
