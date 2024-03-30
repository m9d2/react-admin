import {request} from "@/utils";

const Api = {
    PAGE: '/user/page',
    USERINFO: '/user/info'
}

async function Page(param: QueryParam): Promise<Response> {
    return await request.post(Api.PAGE, param)
}

async function UserInfo(): Promise<Response> {
    return await request.get(Api.USERINFO)
}

export {Page, UserInfo, Api}