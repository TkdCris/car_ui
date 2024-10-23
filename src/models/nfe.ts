import { CommonEntity } from "./basicEntitys";
import { Client } from "./person";
import { Vehicle } from "./vehicle";

export interface NFe extends CommonEntity {
  /** Identificador único da NFe */
  id: string; // (tag: <infNFe>)
  idCompany: string;
  /** Data de emissão da NFe */
  issueDate: Date; // (tag: <dhEmi>)
  /** CNPJ do emitente */
  emitterCNPJ: string; // (tag: <CNPJ>)
  /** Nome do emitente */
  emitterName: string; // (tag: <xNome>)
  /** Inscrição estadual do emitente */
  emitterStateRegistration: string; // (tag: <IE>)
  /** Cliente (pode ser pessoa física ou jurídica) */
  client: Client; // (tag: <dest>)
  /** Veículo envolvido na transação */
  vehicle: Vehicle; // (tag: <veicProd>)
  /** Valor total da NFe */
  totalValue: number; // (tag: <vNF>)
  /** Base de cálculo do ICMS */
  icmsBase: number; // (tag: <vBC>)
  /** Valor do ICMS */
  icmsValue: number; // (tag: <vICMS>)
  /** Valor do IPI */
  ipiValue: number; // (tag: <vIPI>)
  /** Modalidade do frete ("0" para emitente, "1" para cliente) */
  freightModality: string; // (tag: <modFrete>)
  /** Informações adicionais */
  additionalInfo: string; // (tag: <infAdic>)
}
