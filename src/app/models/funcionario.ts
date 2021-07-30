export interface Funcionario{
  name: string;
  phone: string;
  cnpj: string;
  adress: string;
  houseNumber: string;
  birthday: string;
  district: string;
  complement?: string;
  profilePicture?: any;
  sector: string;
  function: string;
  email: string;
  documents: File[];
}