import {request} from "@/utils";

const Api = {
    LIST: '/menu/tree'
}

async function List(): Promise<Response<any>> {
    return await request.get(Api.LIST)
}

export {List, Api}