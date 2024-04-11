import {request} from "@/utils";

const Api = {
    PAGE: '/user/page',
    USERINFO: '/user/info',
    SAVE: '/user/save',
    MODIFY: '/user/update'
}

async function Page(param: QueryParam): Promise<Response<PageData>> {
    return await request.post(Api.PAGE, param)
}

async function UserInfo(): Promise<Response<PageData>> {
    return await request.get(Api.USERINFO)
}

async function Save(formData: any): Promise<Response<PageData>> {
    return await request.post(Api.SAVE, formData)
}

async function Modify(formData: any): Promise<Response<PageData>> {
    return await request.post(Api.MODIFY + '?id=' + formData.id, formData)
}

export {Page, UserInfo, Save, Modify, Api}