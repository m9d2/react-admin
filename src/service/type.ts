export type QueryParam<T = object> = {
  condition?: string;
  page?: number;
  size?: number;
} & T;

export type Response<T = object> = {
  data?: T | undefined;
  code?: number;
  msg?: string;
};

export type PageData = {
  content: any[];
  totalElements: number;
  number: number;
};
