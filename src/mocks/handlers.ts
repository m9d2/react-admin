import {login} from "@/mocks/login.js"
import {menus} from "@/mocks/menus.ts";
import {users} from "@/mocks/users.ts";

export const handlers = [...login, ...menus, ...users]