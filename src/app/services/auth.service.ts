import { User } from './../models/user';
import { Admin } from './../models/admin';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
	CollectionReference,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userLogado = {} as User;
	adminLogado = {} as Admin;
	userState: any;
	currentUserEmail!: string;
	dadosUser!: AngularFirestoreCollection<User>;

	secondaryFbApp = firebase.initializeApp(environment.firebase, 'Secondary');

	constructor(
		public ngZone: NgZone,
		public afAuth: AngularFireAuth,
		public router: Router,
		public afs: AngularFirestore,
		public afStorage: AngularFireStorage,
		private snackBar: MatSnackBar
	) {}

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

		console.log('Passei no service 1');

		const userState: any = {
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
			profilePicture: user.profilePicture ?? '',

			email: user.email,
			emailVerified: user.emailVerified,

			isAdmin: false,

			branches: user.branches ?? '',

			services: user.services ?? [],
		};

		console.log('Passei no service 2');

		if (!this.adminLogado)
			localStorage.setItem('currentUser', JSON.stringify(userState));

		console.log('Passei no service 3');
		console.log(userState);

		userRef.set(userState, {
			merge: true,
		});

		console.log('Passe aqui 4');
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
			localStorage.setItem(
				'currentUser',
				JSON.stringify(this.userLogado)
			);
		});

		return this.userLogado;
	}

	// função análoga para pegar dados do admin

	getAdminData(email: string) {
		const adminLogadoCollection: AngularFirestoreCollection<Admin> =
			this.afs.collection<Admin>('/admins', (ref: CollectionReference) =>
				ref.where('email', '==', email)
			);

		const adminLogadoCollection$: Observable<Admin[]> =
			adminLogadoCollection.valueChanges({ idField: 'uid' });

		adminLogadoCollection$.subscribe((admin) => {
			this.adminLogado = admin[0];
			if (this.adminLogado) {
				localStorage.setItem(
					'currentUser',
					JSON.stringify(this.adminLogado)
				);
			}
		});

		return this.adminLogado;
	}

	getAllUsers() {
		const ref = this.afs.collection('users');
		let clienteList = Array<User>();

		ref.get().subscribe((snapShot) => {
			snapShot.forEach((doc: any) => {
				clienteList.push(doc.data());
			});
		});

		return clienteList;
	}

	async deleteUserById(uid: string) {
		return await this.afs
			.collection('users')
			.doc(uid)
			.delete()
			.then(() => {
				console.log('Usuário deletado!');
			})
			.catch((err) => {
				console.log(`Houve um erro: ${err}`);
			});
	}

	loggedIn(): boolean {
		if (localStorage.getItem('currentUser') ?? false) {
			return true;
		}
		return false;
	}

	singIn(email: string, password: string): any {
		// Chamando ambas para garantir
		this.getUserData(email);
		this.getAdminData(email);

		this.afAuth
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				return this.afAuth
					.signInWithEmailAndPassword(email, password)
					.then((result: any) => {
						this.ngZone.run(() => {
							// Tem que trocar para this.adminLogado para funcionar como admin
							if (this.adminLogado)
								this.router.navigate([
									`/verPerfilAdm/${this.adminLogado.uid}`,
								]);
							else
								this.router.navigate([
									`/verPerfil/${this.userLogado.uid}`,
								]);
						});
					});
			})
			.catch((error: any) => {
				this.displayMessage('Usuário ou senha incorretos', true);
				console.log(error);
			});
	}

	signUp(user: User, password: string): any {
		this.secondaryFbApp
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.NONE);

		this.secondaryFbApp
			.auth()
			.createUserWithEmailAndPassword(user.email, password)
			.then((result: any) => {
				this.SendVerificationMail();
				user.uid = result.user.uid;
				user.emailVerified = result.user.emailVerified;

				this.SetUserData(user);
			})
			.catch((error: any) => {
				window.alert(error.message);
				console.log(error.message);
			});
	}

	async SignOut(): Promise<any> {
		return await this.afAuth
			.signOut()
			.then(() => {
				localStorage.removeItem('currentUser');
			})
			.finally(() => {
				this.router.navigate(['/login']);
			});
	}

	async SendVerificationMail() {
		return await this.afAuth.currentUser.then((u) =>
			u?.sendEmailVerification()
		);
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

	uploadProfilePicture(uid: string, file: File) {
		this.afStorage
			.ref(`users/${uid}/profile.jpg`)
			.put(file)
			.then(() => {
				console.log('Imagem upada!');
			})
			.catch((err) => {
				console.log(`Houve um erro: ${err}`);
			});
	}

	downloadProfilePicture(uid: string) {
		return this.afStorage.ref(`users/${uid}/profile.jpg`).getDownloadURL();
	}
}
