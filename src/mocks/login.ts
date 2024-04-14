import { delay, http, HttpResponse } from 'msw';

export const login = [
  http.post('/api/login', async ({ request }) => {
    await delay(200);
    const data: any = await request.json();
    if (data.username === 'admin' && data.password === 'admin') {
      return HttpResponse.json({
        code: 200,
        msg: '操作成功',
        data: {
          id: 1,
          username: 'gy',
          name: '高阳',
          phone: null,
          token:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJneSIsImlhdCI6MTcxMTc2OTE5NiwiZXhwIjoxNzExNzcyNzk2fQ.fXY-Ip7KvShDHJl5rWnRI8w2o-HoD5P0pV4bL7g5S8c',
          roleType: 'ADMIN',
          roleName: '管理员',
          firstLogin: false,
        },
      });
    }
    return HttpResponse.json({
      code: 400,
      msg: '用户名或密码错误',
      data: null,
      timestamp: 1711769197162,
      success: false,
    });
  }),
];
