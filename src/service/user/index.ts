import { request } from '@/utils';
import { Response, PageData, QueryParam } from '@/service/type.ts';

export const Api = {
  PAGE: '/user/page',
  USERINFO: '/user/info',
  SAVE: '/user/save',
  MODIFY: '/user/update',
  DELETE: '/user/delete',
};

export async function Page(param: QueryParam): Promise<Response<PageData>> {
  return await request.post(Api.PAGE, param);
}

export async function UserInfo(): Promise<Response<PageData>> {
  return await request.get(Api.USERINFO);
}

export async function Save(formData: any): Promise<Response<any>> {
  return await request.post(Api.SAVE, formData);
}

export async function Modify(formData: any): Promise<Response<any>> {
  return await request.post(Api.MODIFY + '?id=' + formData.id, formData);
}

export async function Delete(id: number): Promise<Response<PageData>> {
  return await request.get(Api.DELETE + '?id=' + id);
}
