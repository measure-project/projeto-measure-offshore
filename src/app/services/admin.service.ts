import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Admin } from './../models/admin';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	admin = {} as Admin;
	constructor(
		private afs: AngularFirestore,
		private asfStorage: AngularFireStorage,
		private auth: AuthService,
		private afAuth: AngularFireAuth
	) {}

	setAdmin(admin: Admin): any {
		const docRef: AngularFirestoreDocument<any> = this.afs.doc(
			`admins/${admin.uid}`
		);
		const adminState: Admin = {
			uid: admin.uid,

			name: admin.name,
			phone: admin.phone,
			//cpf: admin.cpf,
			adress: admin.adress,
			houseNumber: admin.houseNumber,
			birthday: admin.birthday,
			district: admin.district,
			complement: admin.complement,
			profilePicture: admin.profilePicture,

			isAdmin: true,

			email: admin.email,
			emailVerified: admin.emailVerified,

			funcao: admin.funcao,

			documents: admin.documents,
		};

		return docRef.set(adminState, {
			merge: true,
		});
	}

	getAllAdmin() {
		const ref = this.afs.collection('admins');
		let adminList = Array<Admin>();

		ref.get().subscribe((snapShot) => {
			snapShot.forEach((doc: any) => {
				adminList.push(doc.data());
			});
		});

		return adminList;
	}

	uploadProfilePic(profilePic: File, admin: Admin): void {
		this.asfStorage
			.ref(`admins/${admin.uid}/profile.jpg`)
			.put(profilePic)
			.then(() => {
				console.log('Deu certo');
			})
			.catch((error: any) => console.log(`Erro: ${error}`));
	}

	uploadFile(file: File, admin: Admin): void {
		this.asfStorage
			.ref(`admins/${admin.uid}/documents.pdf`)
			.put(admin.documents)
			.then(() => console.log(`Arquivo ${file.name} upado`))
			.catch(() => console.log(`Falha ao upar ${file.name}`));
	}

	signUpAdmin(admin: Admin, password: string): any {
		return this.afAuth
			.createUserWithEmailAndPassword(admin.email, password)
			.then((result: any) => {
				this.auth.SendVerificationMail();
				admin.uid = result.user.uid;
				admin.emailVerified = result.user.emailVerified;

				this.setAdmin(admin);
			})
			.catch((error: any) => {
				window.alert(error.message);
				console.log(error.message);
			});
	}
}
