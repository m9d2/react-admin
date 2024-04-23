import {
    clearUserInfo,
    getToken,
    getUserInfo,
    setUserInfo,
} from '@/utils/auth';
import { constant } from '@/utils/constant.ts';
import request from '@/utils/request.ts';
import * as common from './common.ts';

const auth = {
    getToken,
    getUserInfo,
    setUserInfo,
    clearUserInfo,
};

export { auth, common, constant, request };
