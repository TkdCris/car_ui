import { CommonEntity } from "./basicEntitys";

export interface Vehicle extends CommonEntity {
  id: string;
  idCompany: string;
  /** Chassi do veículo */
  chassis: string; // (tag: <chassi>)
  /** Código RENAVAM do veículo */
  renavam: string; // (tag: <cMT>)
  /** Código da cor do veículo */
  colorCode: string; // (tag: <cor>)
  /** Descrição da cor do veículo */
  colorDescription: string; // (tag: <xCor>)
  /** Potência do motor (em CV) */
  enginePower: number; // (tag: <pot>)
  /** Capacidade do motor (em cilindradas) */
  cylinderCapacity: number; // (tag: <cil>)
  /** Peso bruto do veículo */
  grossWeight: number; // (tag: <pesoB>)
  /** Peso líquido do veículo */
  netWeight: number; // (tag: <pesoL>)
  /** Ano do modelo */
  modelYear: number; // (tag: <anoMod>)
  /** Ano de fabricação */
  manufactureYear: number; // (tag: <anoFab>)
  /** Tipo de combustível (Ex: "G" para gasolina, "A" para álcool) */
  fuelType: string; // (tag: <comb>)
  /** Placa do veículo */
  licensePlate: string; // (tag: <placa>)
  /** Código do modelo (RENAVAM) */
  modelCode: string; // (tag: <cMod>)
  /** Condição do veículo (Ex: "1" para novo, "2" para usado) */
  condition: string; // (tag: <condVeic>)
}
