import request from "@/utils/request.ts";
import {constant} from "@/utils/constant.ts";
import {getToken, removeToken, setToken} from "@/utils/token.ts";

const auth = {
    getToken,
    removeToken,
    setToken,
}

export {request, constant, auth}