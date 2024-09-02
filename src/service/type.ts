export interface QueryParam {
  condition?: string;
  page?: number;
  size?: number;
}

export interface Response<T> {
  data?: T | undefined;
  code?: number;
  msg?: string;
}

export interface PageData {
  content: any[];
  totalElements: number;
  number: number;
}
