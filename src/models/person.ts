import { CommonEntity } from "./basicEntitys";

export interface Location {
  street?: string; /** Endereço completo (tag: <ender>) */
  city?: string; /** Nome da cidade (tag: <xMun>) */
  number?: string;
  complement?: string;
  state?: string; // Sigla do estado (UF) (tag: <UF>)
  zipcode?: string; // (tag: <CEP>)
  neighborhood?: string;
}

export interface AbstractPerson extends CommonEntity {
  legalEntity: boolean;
  idCompany: string;
  name: string; // (tag: <xNome>)
  nickname?: string;
  email?: string;
  phone?: string; // (tag: <fone>)
  cellphone?: string;
  notary?: string; // Cartório
  location: Location;
  observation?: string;
}

export interface LegalEntity extends AbstractPerson {
  cnpj?: string; // (tag: <CNPJ>)
  ie?: string; // (tag: <IE>) Inscrição estadual
  im?: string; // Inscrição Municipal
  /** Regime tributário (Ex: 1 para Simples Nacional, 2 para Regime Normal) */
  taxRegime?: string; // (tag: <CRT>)
  suframa?: string; // SUFRAMA
  icmsTaxPayer?: boolean; // Contribuinte ICMS
}

export interface NaturalPerson extends AbstractPerson {
  cpf: string; // (tag: <CPF>)
  rg?: string;
  birthdate?: string;
  fatherName?: string;
  motherName?: string;
  crc?: string; // Conselho Regional de Contabilidade
}


// Um cliente pode ser tanto uma pessoa física quanto uma pessoa jurídica
export type Client = NaturalPerson | LegalEntity;

export interface Logged {
  id: string;
  fullName: string;
  role: string;
  token: string;
}

export interface PersonToTableList extends Pick<Client, "id" | "name" | "email" | "legalEntity"> {}
