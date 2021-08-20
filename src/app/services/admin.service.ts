import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Admin } from './../models/admin';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	admin = {} as Admin;
	constructor(
		private afs: AngularFirestore,
		private asfStorage: AngularFireStorage,
		private auth: AuthService
	) {}

	setAdmin(admin: Admin): any {
		const docRef: AngularFirestoreDocument<any> = this.afs.doc(
			`admins/${admin.uid}`
		);
		let id: string;
		admin.uid != undefined ? (id = admin.uid) : (id = docRef.ref.id);
		const adminState: Admin = {
			uid: id,

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

			funcao: admin.funcao,

			documents: admin.documents,
		};

		return docRef.set(adminState, {
			merge: true,
		});
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

	singUpAdmin(admin: Admin, password: string) {
		try {
			this.setAdmin(admin);
			this.auth.signUp(admin, password);
			this.auth.displayMessage('Cadastro efetuado com sucesso!', false);
		} catch (error: any) {
			this.auth.displayMessage(
				`Erro ao cadastrar administrador: ${error}`,
				true
			);
			console.log(error);
		}
	}
}
