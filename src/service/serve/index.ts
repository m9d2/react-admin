import { request } from '@/utils';
import { Response } from '@/service/type.ts';

export const Api = {
  ALL: '/serve/all',
  EXEC: '/serve/exec',
  LOGS: '/serve/logs',
};

export async function All(): Promise<Response<any[]>> {
  return await request.get(Api.ALL);
}

export async function Exec(id: number): Promise<Response<any[]>> {
  return await request.get(Api.EXEC + '/' + id);
}

export async function Logs(id: number): Promise<Response<any[]>> {
  return await request.get(Api.LOGS + '/' + id);
}
