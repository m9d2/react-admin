import { request } from '@/utils';
import { Response } from '@/service/type.ts';

export const Api = {
  INFO: 'host/info',
  NETWORK: 'host/network/',
};

export async function info(): Promise<Response<any>> {
  return await request.get(Api.INFO);
}

export async function network(networkName: string): Promise<Response<any>> {
  return await request.get(Api.NETWORK + networkName);
}
