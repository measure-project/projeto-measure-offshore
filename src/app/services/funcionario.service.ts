import { AngularFireStorage } from '@angular/fire/storage';
import { Funcionario } from './../models/funcionario';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class FuncionarioService {
	Funcionario!: Funcionario;

	constructor(
		private afs: AngularFirestore,
		private afStorage: AngularFireStorage
	) {}

	setFuncionario(funcionario: Funcionario) {
		//Ainda não testei
		const docRef: AngularFirestoreDocument<any> = this.afs.doc(
			`funcionarios/${funcionario.uid}`
		);
		const funcionarioState: Funcionario = {
			uid: funcionario.uid,
			name: funcionario.name,
			phone: funcionario.phone,
			cnpj: funcionario.cnpj,
			adress: funcionario.adress,
			houseNumber: funcionario.houseNumber,
			birthday: funcionario.birthday,
			district: funcionario.district,
			complement: funcionario.complement,
			profilePicture: funcionario.profilePicture,
			sector: funcionario.sector,
			func: funcionario.func,
			email: funcionario.email,
			documents: funcionario.documents,
		};
		return docRef.set(funcionarioState, {
			merge: true,
		});
	}

	getFuncionario() {}

	uploadFiles(profilePic: File, documents: Array<File>, uid: string) {
		this.afStorage
			.ref(`funcionario/${uid}/profile.jpg`)
			.put(profilePic)
			.then(() => {
				console.log('Imagem upada!');
			})
			.catch((err) => {
				console.log(`Houve um erro: ${err}`);
			});

		this.afStorage
			.ref(`funcionario/${uid}/document.pdf`)
			.put(documents)
			.then(() => {
				console.log('Documentos upados!');
			})
			.catch((err) => {
				console.log(`Houve um erro: ${err}`);
			});
	}

	downloadFiles(uid: string) {
		return [
			this.afStorage
				.ref(`funcionario/${uid}/profile.jpg`)
				.getDownloadURL(),
			this.afStorage.ref(`funcionario/${uid}/document.pdf`),
		];
	}
}
