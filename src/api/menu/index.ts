import { request } from '@/utils';

export const Api = {
    LIST: '/menu/tree',
    MY: '/menu/current/tree',
};

export async function List(): Promise<Response<any>> {
    return await request.get(Api.LIST);
}

export async function MyMenus(): Promise<Response<any>> {
    return await request.get(Api.MY);
}
