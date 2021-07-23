import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import '@angular/compiler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelaLoginComponent } from './components/Login-Components/tela-login/tela-login.component';
import { TelaCadastroComponent } from './components/Login-Components/tela-cadastro/tela-cadastro.component';
import { TelaRecuperarSenhaComponent } from './components/Login-Components/tela-recuperar-senha/tela-recuperar-senha.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { NgxMaskModule } from 'ngx-mask';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { IvyCarouselModule } from 'angular-responsive-carousel';

import { HomePageComponent } from './components/home-components/home-page/home-page.component';
import { TelaVideoComponent } from './components/home-components/tela-video/tela-video.component';
import { PrestacaoServicosComponent } from './components/home-components/prestacao-servicos/prestacao-servicos.component';
import { TelaBottomComponent } from './components/home-components/tela-bottom/tela-bottom.component';
import { VerPerfilComponent } from './components/Perfil-Components/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './components/Perfil-Components/editar-perfil/editar-perfil.component';
import { AdmVerPerfilComponent } from './components/Perfil-Components/adm-ver-perfil/adm-ver-perfil.component';

@NgModule({
	declarations: [
		AppComponent,
		TelaLoginComponent,
		TelaCadastroComponent,
		TelaRecuperarSenhaComponent,
		HomePageComponent,
		PrestacaoServicosComponent,
		TelaVideoComponent,
		TelaBottomComponent,
		VerPerfilComponent,
		EditarPerfilComponent,
		AdmVerPerfilComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireStorageModule,
		AngularFireDatabaseModule,
		BrowserAnimationsModule,
		MatCardModule,
		MatFormFieldModule,
		MatButtonModule,
		FormsModule,
		NgxMaskModule.forRoot(),
		ShowHidePasswordModule,
		MatInputModule,
		MatSnackBarModule,
		MatToolbarModule,
		IvyCarouselModule,
		MatExpansionModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
