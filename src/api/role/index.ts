import {request} from "@/utils";

export const Api = {
    ALL: '/role/findAll',
    PAGE: '/role/page',
    SAVE: '/role/save',
    UPDATE: '/role/update',
}

export async function All(): Promise<Response<any[]>> {
    return await request.post(Api.ALL)
}

export async function Page(param: QueryParam): Promise<Response<PageData>> {
    return await request.post(Api.PAGE, param)
}

export async function Save(param: any): Promise<Response<PageData>> {
    return await request.post(Api.SAVE, param)
}

export async function Update(param: any): Promise<Response<PageData>> {
    return await request.post(Api.UPDATE + '?id=' + param.id, param)
}