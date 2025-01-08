import { delay, http, HttpResponse } from 'msw';

export const login = [
  http.post('/api/login', async ({ request }) => {
    await delay(200);
    const data: any = await request.json();
    if (data.username === 'admin' && data.password === '123') {
      return HttpResponse.json({
        code: 200,
        msg: '操作成功',
        data: {
          id: 2,
          username: 'admin',
          name: '管理员',
          phone: null,
          token:
            'eyJraWQiOiIyIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJhZG1pbiJ9.4_-_4ZY7Gyw_1q3gcXRCX-yKM9kyNgvBkMIpZ9wwZsA',
          roleType: 'ADMIN',
          roleName: '管理员',
          firstLogin: false,
          menus: [
            {
              child: [
                {
                  child: null,
                  id: 1001,
                  name: '首页',
                  url: '/dashboard',
                  type: 'MENU',
                  icon: null,
                  sort: 1001,
                },
                {
                  child: null,
                  id: 1002,
                  name: '数据报表',
                  url: '/data',
                  type: 'MENU',
                  icon: null,
                  sort: 1002,
                },
              ],
              id: 1000,
              name: 'Dashboard',
              url: '/',
              type: 'DIRECTORY',
              icon: 'home',
              sort: 1000,
            },
            {
              child: [
                {
                  child: null,
                  id: 2001,
                  name: '服务器',
                  url: '/business/serve',
                  type: 'MENU',
                  icon: 'setting',
                  sort: 2001,
                },
              ],
              id: 2000,
              name: '工具',
              url: '/business',
              type: 'DIRECTORY',
              icon: 'setting',
              sort: 2000,
            },
            {
              child: [
                {
                  child: null,
                  id: 9001,
                  name: '账号管理',
                  url: '/sys/user',
                  type: 'MENU',
                  icon: null,
                  sort: 9001,
                },
                {
                  child: null,
                  id: 9002,
                  name: '角色管理',
                  url: '/sys/role',
                  type: 'MENU',
                  icon: null,
                  sort: 9002,
                },
                {
                  child: null,
                  id: 9003,
                  name: '菜单管理',
                  url: '/sys/menu',
                  type: 'MENU',
                  icon: null,
                  sort: 9003,
                },
                {
                  child: null,
                  id: 9004,
                  name: '系统日志',
                  url: '/sys/log',
                  type: 'MENU',
                  icon: null,
                  sort: 9004,
                },
                {
                  child: null,
                  id: 9005,
                  name: '系统监控',
                  url: '/sys/monitor',
                  type: 'MENU',
                  icon: null,
                  sort: 9004,
                },
              ],
              id: 9000,
              name: '系统管理',
              url: '/sys',
              type: 'DIRECTORY',
              icon: 'setting',
              sort: 9000,
            },
          ],
        },
        timestamp: 1736305652080,
        success: true,
        requestId: '1bccefd417d3425abf4644237ec96c20',
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
