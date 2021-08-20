export interface Admin {
	uid: string;

	name: string;
	phone: string;
	//cpf: string;
	adress: string;
	houseNumber: string;
	birthday: string;
	district: string;
	complement?: string;
	profilePicture?: any;

	email: string;

	isAdmin: boolean;

	funcao: string;

	documents: Array<File>;
}
