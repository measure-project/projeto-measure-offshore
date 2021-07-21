export interface User {
	uid?: string;

	name: string;
	phone: string;
	cnpj: string;
	inscricaoEstadual?: string;
	adress: string;
	houseNumber: string;
	birthday: string;
	district: string;
	complement?: string;
	profilePicture?: any;

	email: string;
	emailVerified: boolean;
}
