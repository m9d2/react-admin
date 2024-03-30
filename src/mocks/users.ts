import {delay, http, HttpResponse} from 'msw';
import {fakerZH_CN as faker} from '@faker-js/faker';
import {User} from "@/api";

function createRandomUser(): any {
    return {
        id: faker.number.int(100),
        createdDate: faker.date.recent().toDateString(),
        lastModifiedDate: faker.date.recent().toTimeString(),
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        phone: faker.phone.number(),
        gender: 1,
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        status: 1,
        statusDesc: "正常",
        remark: null,
        roleId: 1,
        roleName: "管理员"
    }
}

export const users = [
    http.post(`/api${User.Api.PAGE}`, async () => {
        await delay(500)
        const total = 10;
        const content = faker.helpers.multiple(createRandomUser, {
            count: total,
        });
        return HttpResponse.json({
            code: 200,
            msg: "操作成功",
            data: {
                content: content,
                totalElements: total,
                totalPages: 2,
                size: 10,
                number: 0,
                first: true,
                numberOfElements: 10,
                empty: false
            },
            timestamp: 1711769197162,
            success: true
        })
    }),

    http.get(`/api${User.Api.USERINFO}`, async () => {
        await delay(500)
        return HttpResponse.json({
            code: 200,
            msg: "操作成功",
            data: {
                id: 1,
                createdDate: "2021-09-15",
                lastModifiedDate: "2021-09-15",
                name: "管理员",
                username: "admin",
                phone: "18888888888"
            }
        })
    })
]