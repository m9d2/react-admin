import {request} from "@/utils";

const Api = {
    PAGE: '/user/page',
    USERINFO: '/user/info',
    SAVE: '/user/save'
}

async function Page(param: QueryParam): Promise<Response> {
    return await request.post(Api.PAGE, param)
}

async function UserInfo(): Promise<Response> {
    return await request.get(Api.USERINFO)
}

async function Save(formData: any): Promise<Response> {
    return await request.post(Api.SAVE, formData)
}

export {Page, UserInfo, Save, Api}