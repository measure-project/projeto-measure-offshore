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
			.doc(funcionario.uid);

		const funcionarioState: Funcionario = {
			uid: funcionario.uid,
			name: funcionario.name,
			phone: funcionario.phone,
			adress: funcionario.adress,
			houseNumber: funcionario.houseNumber,
			birthday: funcionario.birthday,
			district: funcionario.district,
			complement: funcionario.complement,
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

	async getFuncionarioById(fid: string) {
		const docRef = this.afs.collection('funcionarios').ref;

		return await docRef.where('uid', '==', fid).get();
	}

	async deleteFuncionarioById(fid: string) {
		return await this.afs
			.collection('funcionarios')
			.doc(fid)
			.delete()
			.then(() => {
				console.log('Documento deletado!');
			})
			.catch((err) => {
				console.log(`Houve um erro: ${err}`);
			});
	}

	uploadFiles(profilePic: File, documents: Array<any>, email: string) {
		if (profilePic)
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
				.ref(`funcionarios/${email}/documents/${file.nome}`)
				.put(file.arquivo)
				.then(() => {
					console.log('Documentos upados!');
				})
				.catch((err) => {
					console.log(`Houve um erro: ${err}`);
				});
		});
	}

	downloadFiles(
		email: string,
		docName: Array<any>,
		funcionarioIndex: number
	) {
		this.afStorage
			.ref(`funcionarios/${email}/profileImage/profile.jpg`)
			.getDownloadURL()
			.subscribe((url) => {
				const img = document.getElementById(
					`profilePic-${funcionarioIndex}`
				);

				img?.setAttribute('src', url);
			});

		docName.forEach((doc) => {
			this.afStorage
				.ref(`funcionarios/${email}/documents/${doc}`)
				.getDownloadURL()
				.subscribe((url) => {
					const a = document.getElementById(`${doc}`);

					a?.setAttribute('href', url);
				});
		});
	}
}
