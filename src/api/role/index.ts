import {request} from "@/utils";

const Api = {
    ALL: '/role/findAll',
}

async function All(): Promise<Response> {
    return await request.post(Api.ALL)
}

export {All, Api}