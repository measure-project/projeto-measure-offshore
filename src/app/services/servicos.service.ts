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

	uploadFiles() {}
	downloadFiles() {}
}
