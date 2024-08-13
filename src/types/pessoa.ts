import { Model } from "./model"

export interface Pessoa extends Model {
  nome: string,
  apelido: string,
  pessoaJuridica: boolean,
  idCidade?: string,
  cnpj?: string,
  cpf?: string,
  rg?: string,
  ie?: string,
  im?: string, // Inscrição municipal (PJ)
  suframa?: string, // (PJ)
  cartorio?: string,
  crc?: string, // Conselho Regional de Contabilidade (PF)
  icmsContribuinte?: boolean, // (PJ)
  aniversario?: string,
  nomePai?: string,
  nomeMae?: string,
  email?: string,
  celular?: string,
  telefone?: string,
  telefoneTrabalho?: string,
  endereco?: string,
  enderecoNumero?: string,
  enderecoComplemento?: string,
  bairro?: string,
  cep?: string,
  observacoes?: string,
}
