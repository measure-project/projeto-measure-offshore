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
		private afStorage: AngularFireStorage,
		private auth: AuthService,
		private afAuth: AngularFireAuth
	) {}

	async setAdmin(admin: Admin) {
		const docRef: AngularFirestoreDocument<any> = this.afs.doc(
			`admins/${admin.uid}`
		);
		const adminState: Admin = {
			uid: admin.uid,

			name: admin.name,
			phone: admin.phone,
			cpf: admin.cpf,
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
		};

		localStorage.setItem('currentUser', JSON.stringify(adminState));

		return await docRef.set(adminState, {
			merge: true,
		});
	}

	async getAdmin(uid: string) {
		const docRef = this.afs.collection('admins').ref;

		return await docRef.where('uid', '==', uid).get();
	}

	async deleteAdminById(uid: string) {
		return await this.afs
			.collection('admins')
			.doc(uid)
			.delete()
			.then(() => {})
			.catch((err) => {});
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
		this.afStorage
			.ref(`admins/${admin.uid}/profile.jpg`)
			.put(profilePic)
			.then(() => {})
			.catch((error: any) => {
				this.auth.displayMessage(error.message, true);
			});
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
				this.auth.displayMessage(error.message, true);
			});
	}

	async downloadProfilePic(admin: Admin): Promise<any> {
		return await this.afStorage
			.ref(`admins/${admin.uid}/profile.jpg`)
			.getDownloadURL()
			.toPromise();
	}

	async consultClient(uid: string) {
		const docRef = this.afs.collection('users').ref;

		return await docRef.where('uid', '==', uid).get();
	}
}
