export interface ResponseBase<T> {
  idCodigo: number;
  message: string;
  data: T;
}
