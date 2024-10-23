import { CommonEntity } from "./basicEntitys";

export interface AbstractPerson extends CommonEntity {
  id: string;
  idCompany: string;

  name: string; // (tag: <xNome>)
  email: string;
  legalEntity: boolean,
  observation?: string;

  /** Endereço completo */
  address?: string; // (tag: <ender>)
  /** Código IBGE do município */
  cityCode?: string; // (tag: <cMun>)
  /** Nome da cidade */
  city?: string; // (tag: <xMun>)
  /** Sigla do estado (UF) */
  state?: string; // (tag: <UF>)
  /** Código postal (CEP) */
  postalCode?: string; // (tag: <CEP>)
  /** Telefone de contato */
  phone?: string; // (tag: <fone>)
  cellphone?: string;
}

export interface NaturalPerson extends AbstractPerson {
  nickname?: string;
  cpf?: string; // (tag: <CPF>)
  /** Situação tributária (Ex: 1 para contribuinte ICMS, 2 para isento) */
  taxStatus?: string; // (tag: <indIEDest>)
  rg?: string;
  birthday?: string;
  fatherName?: string;
  motherName?: string;
  crc?: string; // Conselho Regional de Contabilidade
}

export interface LegalEntity extends AbstractPerson {
  fantasyName?: string; // (tag: <xFant>)
  cnpj?: string; // (tag: <CNPJ>)
  ie?: string; // (tag: <IE>) Inscrição estadual
  /** Regime tributário (Ex: 1 para Simples Nacional, 2 para Regime Normal) */
  taxRegime?: string; // (tag: <CRT>)
  im?: string; // Inscrição Municipal
  suframa?: string; // SUFRAMA
  /** Registration in the notary's office */
  notaryOfficeRegistration?: string; // Cartório
  /** Indicates if the company is an ICMS taxpayer */
  icmsTaxpayer?: boolean; // Contribuinte ICMS
}

export type Client = NaturalPerson | LegalEntity; // Um cliente pode ser tanto uma pessoa física quanto uma pessoa jurídica

export interface Authenticated {
  id: string;
  fullName: string;
  role: string;
  token: string;
}

export interface PersonToTableList extends Pick<Client, "id" | "name" | "email" | "legalEntity"> {}
