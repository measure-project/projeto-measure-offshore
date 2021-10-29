import { Observable } from 'rxjs';
import { Servico } from './../models/servico';
import { Equipamento } from './../models/equipamento';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreDocument,
	DocumentData,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root',
})
export class ServicosService {
	constructor(
		private afs: AngularFirestore,
		private afStorage: AngularFireStorage
	) {}

	setService(service: Servico) {
		const docRef: AngularFirestoreDocument<DocumentData> = this.afs
			.collection(`servicos`)
			.doc();

		const id = service.uid != undefined ? service.uid : docRef.ref.id;

		const serviceState: Servico = {
			title: service.title,
			description: service.description,
			equipamentos: service.equipamentos,
			funcionarios: service.funcionarios,
			uid: id,
			documentos: service.documentos.slice(),
		};

		return docRef.set(serviceState, {
			merge: true,
		});
	}

	setEquipment(equipment: Equipamento) {
		const docRef: AngularFirestoreDocument<DocumentData> = this.afs
			.collection(`equipamentos`)
			.doc();

		const equipmentState: Equipamento = {
			name: equipment.name,
			code: equipment.code,
			brand: equipment.brand,
			description: equipment.description,
		};

		return docRef.set(equipmentState, {
			merge: true,
		});
	}

	getAllEquipments() {
		const ref = this.afs.collection('equipamentos');
		let equipamentList = Array<Equipamento>();

		ref.get().subscribe((snapShot) => {
			snapShot.forEach((doc: any) => {
				equipamentList.push(doc.data());
			});
		});

		return equipamentList;
	}

	getAllServices() {
		const ref = this.afs.collection('servicos');
		let serviceList = Array<Servico>();

		ref.get().subscribe((snapShot) => {
			snapShot.forEach((doc: any) => {
				serviceList.push(doc.data());
			});
		});

		return serviceList;
	}

	async getServiceFromClient(uid: string) {
		const ref = this.afs.collection('users').ref;

		return await ref.where('uid', '==', uid).get();
	}

	uploadFiles(files: Array<any>, id: string) {
		files.forEach((file) => {
			this.afStorage
				.ref(`servicos/${id}/documents/${file.categoria}/${file.nome}`)
				.put(file.documento)
				.then(() => {
					console.log('Documentos Upados!');
				})
				.catch((err) => {
					console.log(`Houve um erro: ${err}`);
				});
		});
	}
	downloadFiles(id: string, paths: Array<any>) {
		paths.forEach((path) => {
			this.afStorage
				.ref(`servicos/${id}/documents/${path.categoria}/${path.nome}`)
				.getDownloadURL()
				.subscribe((url) => {
					// Não consegui dessa forma por erro de cors, da pra arrumar mas é um trampinho
					// var xhr = new XMLHttpRequest();
					// xhr.responseType = 'blob';
					// xhr.onload = (event) => {
					// 	var blob = xhr.response;
					// };
					// xhr.open('GET', url);
					// xhr.send();

					var a = document.getElementById(`${path.nome}`); // Não funciona qnd tem documento de nome repetido

					a?.setAttribute('href', url);
				});
		});
	}
}
