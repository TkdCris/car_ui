export interface CompanyEntity extends CommonEntity  {
  idEmpresa?: string;
}

export interface CommonEntity  {
  id?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}
