import { Role } from '@/api';
import { fakerZH_CN as faker } from '@faker-js/faker';
import { delay, http, HttpResponse } from 'msw';

function createRandomRole(): any {
    return {
        id: faker.number.int(100000),
        name: faker.person.fullName(),
        type: 'ADMIN',
        status: 0,
        remark: null,
    };
}

export const roles = [
    http.post(`/api${Role.Api.PAGE}`, async () => {
        await delay(500);
        const total = 10;
        const content = faker.helpers.multiple(createRandomRole, {
            count: total,
        });
        return HttpResponse.json({
            code: 200,
            msg: '操作成功',
            data: {
                content: content,
                totalElements: total,
                totalPages: 2,
                size: 10,
                number: 0,
                first: true,
                numberOfElements: 10,
                empty: false,
            },
            timestamp: 1711769197162,
            success: true,
        });
    }),
];
