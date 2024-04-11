import request from "@/utils/request.ts";
import { constant } from "@/utils/constant.ts";
import { getToken, clearUserInfo, getUserInfo, setUserInfo } from "@/utils/auth";
import * as common from './common.ts'

const auth = {
    getToken,
    getUserInfo,
    setUserInfo,
    clearUserInfo,
}

export { request, constant, auth, common }