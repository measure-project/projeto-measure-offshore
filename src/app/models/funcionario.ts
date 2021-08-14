export interface Funcionario {
	uid: string;
	name: string;
	phone: string;
	adress: string;
	houseNumber: string;
	birthday: string;
	district: string;
	complement?: string;
	profilePicture?: any;
	sector: string;
	func: string;
	email: string;
	documents: Array<File>;
}
