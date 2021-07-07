import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
	CollectionReference,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userLogado = {} as User;

	userState: any;
	afAuthcurrentUser: any;
	dadosUser!: AngularFirestoreCollection<User>;

	constructor(
		public ngZone: NgZone,
		public afAuth: AngularFireAuth,
		public router: Router,
		public afs: AngularFirestore,
		private snackBar: MatSnackBar
	) {
		this.afAuth.authState.subscribe((user: any) => {
			if (user) {
				this.getUserData(user.email);
				this.userState = user;
				localStorage.setItem('user', JSON.stringify(this.userState));
				JSON.parse(localStorage.getItem('user') || '{ }');
			} else {
				localStorage.setItem('user', '');
				JSON.parse(localStorage.getItem('user') || '{ }');
			}
		});
	}

	// Para usar a função de displayMessage, passar true para o segundo argumento mostra fundo vermelho e false fundo verde.
	displayMessage(msg: string, isError: boolean = false): void {
		this.snackBar.open(msg, 'x', {
			duration: 3000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
			panelClass: isError ? ['msg-error'] : ['msg-success'],
		});
	}

	SetUserData(user: any): any {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		);
		const userState: User = {
			uid: user.uid,

			name: user.name,
			phone: user.phone,
			birthday: user.birthday,

			cnpj: user.cnpj,
			inscricaoEstadual: user.inscricaoEstadual,

			adress: user.adress,
			houseNumber: user.houseNumber,
			district: user.district,
			complement: user.complement,

			email: user.email,
			emailVerified: user.emailVerified,
		};
		return userRef.set(userState, {
			merge: true,
		});
	}

	getUserData(email: string): User {
		const userLogadoCollection: AngularFirestoreCollection<User> =
			this.afs.collection<User>('/users', (ref: CollectionReference) =>
				ref.where('email', '==', email)
			);
		const userLogadoCollection$: Observable<User[]> =
			userLogadoCollection.valueChanges({ idField: 'uid' });
		userLogadoCollection$.subscribe((user) => {
			this.userLogado = user[0];
		});
		return this.userLogado;
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('users') || '{}');
		return user !== null && user.emailVerified !== false ? true : false;
	}

	singIn(email: string, password: string): any {
		return this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then((result: any) => {
				this.ngZone.run(
					() => {
						this.router.navigate(['/verPerfil']);
					},
					() => this.SetUserData(result.user)
				);
			})
			.catch((error: any) =>
				this.displayMessage('Usuário ou senha incorretos', true)
			);
	}

	signUp(user: User, password: string): any {
		return this.afAuth
			.createUserWithEmailAndPassword(user.email, password)
			.then((result: any) => {
				this.SendVerificationMail();
				user.uid = result.user.uid;
				user.emailVerified = result.user.emailVerified;
				this.SetUserData(user);
			})
			.catch((error: any) => {
				window.alert(error.message);
			});
	}

	SignOut(): any {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem('user');
			this.router.navigate(['sign-in']);
		});
	}

	async SendVerificationMail() {
		return await this.afAuth.currentUser
			.then((u) => u?.sendEmailVerification())
			.then(() => {
				this.router.navigate(['email-verification']);
			});
	}

	ForgotPassword(passwordResetEmail: any): any {
		return this.afAuth
			.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				window.alert(
					'E-mail de recuperação de senha enviado, cheque seu e-mail.'
				);
			})
			.catch((error: any) => {
				window.alert(error);
			});
	}

	AuthLogin(provider: any): any {
		return this.afAuth.signInWithPopup(provider).then((result) => {
			this.ngZone.run(() => {
				this.router.navigate(['/signup']);
			});

			this.SetUserData(result.user);
		});
	}

	// Sign in with Google
	GoogleAuth() {
		return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
	}
}
