import {http, HttpResponse} from 'msw';

export const menus = [
    http.get('/api/menu/tree', () => {
        return HttpResponse.json({
            "code": 200,
            "msg": "操作成功",
            "data": [
                {
                    "id": 1000,
                    "name": "Dashboard",
                    "url": "/",
                    "type": "DIRECTORY",
                    "icon": "home",
                    "sort": 1000,
                    "child": [
                        {
                            "child": null,
                            "id": 1001,
                            "name": "首页",
                            "url": "/dashboard",
                            "type": "MENU",
                            "icon": null,
                            "sort": 1001
                        }
                    ],

                },
                {

                    "id": 9000,
                    "name": "系统设置",
                    "url": "/sys",
                    "type": "DIRECTORY",
                    "icon": "setting",
                    "sort": 9000,
                    "child": [
                        {
                            "child": null,
                            "id": 9001,
                            "name": "账号管理",
                            "url": "/sys/user",
                            "type": "MENU",
                            "sort": 9001
                        },
                        {
                            "child": null,
                            "id": 9002,
                            "name": "角色管理",
                            "url": "/sys/role",
                            "type": "MENU",
                            "icon": null,
                            "sort": 9002
                        },
                        {
                            "child": null,
                            "id": 9003,
                            "name": "菜单管理",
                            "url": "/sys/menu",
                            "type": "MENU",
                            "icon": null,
                            "sort": 9003
                        },
                        {
                            "child": null,
                            "id": 9004,
                            "name": "系统日志",
                            "url": "/sys/log",
                            "type": "MENU",
                            "icon": null,
                            "sort": 9004
                        }
                    ],
                }
            ],
            "timestamp": 1711769238056,
            "success": true
        })
    })
]