export interface Model extends AbstractModel {
  idEmpresa?: string;
}

export interface AbstractModel {
  id?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}