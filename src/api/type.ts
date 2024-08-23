// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface QueryParam {
  condition?: string;
  page?: number;
  size?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
interface Response<T> {
  data?: T | undefined;
  code?: number;
  msg?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PageData {
  content: any[];
  totalElements: number;
  number: number;
}
