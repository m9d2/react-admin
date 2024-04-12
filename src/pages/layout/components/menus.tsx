import {useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {Menu as MenuApi} from "@/api";
import {DynamicsSvgIcon} from "@/components/svg-icon.tsx";


type MenuItem = {
    key: string,
    children: MenuItem[]
}

export default function Menus(props: { collapsed: boolean }) {
    const [menus, setMenus] = useState<MenuItem[]>([])
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const [selectKeys, setSelectKeys] = useState<string[]>([])
    const navigate = useNavigate();
    const location = useLocation()

    function createMenus(data: any[]): MenuItem[] {

        return data.map((item) => {
            return {
                key: item.url,
                label: item.name,
                icon: item.icon ?
                    <DynamicsSvgIcon iconName={item.icon}/> : null,
                onClick: item.type === 'MENU' ? () => ({}) : () => ({}),
                children: item.type === 'DIRECTORY' && item.child.map((child: any) => {
                    return {
                        key: child.url,
                        label: child.name,
                        path: child.url,
                        icon: child.icon ?
                            <DynamicsSvgIcon iconName={child.icon} /> : null
                    }
                })
            }
        })
    }

    useEffect(() => {
        (async () => {
            const res = await MenuApi.MyMenus()
            if (Array.isArray(res.data)) {
                setMenus(createMenus(res.data))
            }
        })()
    }, [])

    useEffect(() => {
        if (location.pathname === '/') {
            navigate("/dashboard")
        }
    }, []);

    useEffect(() => {
        menus?.forEach((menu: MenuItem) => {
            if (menu.children) {
                menu.children.forEach((child: MenuItem) => {
                    if (child.key === location.pathname) {
                        setOpenKeys([menu.key])
                        setSelectKeys([child.key])
                    }
                })
            }
        })
    }, [menus, props.collapsed]);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys(keys);
        } else {
            setOpenKeys([]);
        }
    };
    const onClick = (router: any) => {
        navigate(router.key)
        setSelectKeys(router.key)
    };

    return (
        <div style={{padding: '0 8px'}}>
            <Menu
                theme="dark"
                mode="inline"
                style={{fontSize: 13}}
                defaultSelectedKeys={selectKeys}
                defaultOpenKeys={openKeys}
                selectedKeys={selectKeys}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={onClick}
                items={menus}
            />
        </div>
    )
}