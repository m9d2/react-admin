import {login} from "@/mocks/login.js"
import {menus} from "@/mocks/menus.ts";
import {users} from "@/mocks/users.ts";
import {roles} from "@/mocks/role.ts";

export const handlers = [...login, ...menus, ...users, ...roles]