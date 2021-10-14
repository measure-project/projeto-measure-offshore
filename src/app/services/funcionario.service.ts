import { AngularFireStorage } from '@angular/fire/storage';
import { Funcionario } from './../models/funcionario';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreDocument,
	DocumentData,
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
		const docRef: AngularFirestoreDocument<DocumentData> = this.afs
			.collection(`funcionarios`)
			.doc();
		let id: string;
		funcionario.uid != undefined
			? (id = funcionario.uid)
			: (id = docRef.ref.id);
		const funcionarioState: Funcionario = {
			uid: id,
			name: funcionario.name,
			phone: funcionario.phone,
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

	getAllFuncionarios() {
		const ref = this.afs.collection('funcionarios');
		let funcionarioList = Array<Funcionario>();

		ref.get().subscribe((snapShot) => {
			snapShot.forEach((doc: any) => {
				funcionarioList.push(doc.data());
			});
		});

		return funcionarioList;
	}

	getFuncionarioById() {}

	uploadFiles(profilePic: File, documents: Array<File>, email: string) {
		this.afStorage
			.ref(`funcionarios/${email}/profileImage/profile.jpg`)
			.put(profilePic)
			.then(() => {
				console.log('Imagem upada!');
			})
			.catch((err) => {
				console.log(`Houve um erro: ${err}`);
			});

		documents.forEach((file) => {
			this.afStorage
				.ref(`funcionarios/${email}/documents/${file.name}`)
				.put(file)
				.then(() => {
					console.log('Documentos upados!');
				})
				.catch((err) => {
					console.log(`Houve um erro: ${err}`);
				});
		});
	}

	downloadFiles(email: string, path: string) {
		return [
			this.afStorage
				.ref(`funcionarios/${email}/profile.jpg`)
				.getDownloadURL(),
			this.afStorage
				.ref(`funcionarios/${email}/documents/`)
				.getDownloadURL(),
		];
	}
}
