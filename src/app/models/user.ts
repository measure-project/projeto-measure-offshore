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

  branches: Array<any>;

  services: Array<any>;

  email: string;
  emailVerified: boolean;

  isAdmin: boolean;
}
