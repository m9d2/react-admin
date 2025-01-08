import { DynamicsIconSvg } from '@/components';
import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '@/utils';

type MenuItem = {
  key: string;
  children: MenuItem[];
};

export default function Menus(props: { collapsed: boolean }) {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  function createMenus(data: any[]): MenuItem[] {
    return data.map((item) => {
      return {
        key: item.url,
        label: item.name,
        icon: item.icon ? <DynamicsIconSvg iconName={item.icon} /> : null,
        onClick: item.type === 'MENU' ? () => ({}) : () => ({}),
        children:
          item.type === 'DIRECTORY' &&
          item.child.map((child: any) => {
            return {
              key: child.url,
              label: child.name,
              path: child.url,
              icon: child.icon ? (
                <DynamicsIconSvg iconName={child.icon} />
              ) : null,
            };
          }),
      };
    });
  }

  useEffect(() => {
    const menus = auth.getUserMenus();
    setMenus(createMenus(menus));
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, []);

  useEffect(() => {
    menus?.forEach((menu: MenuItem) => {
      if (menu.children) {
        menu.children.forEach((child: MenuItem) => {
          if (child.key === location.pathname) {
            setOpenKeys([menu.key]);
            setSelectKeys([child.key]);
          }
        });
      }
    });
  }, [menus, props.collapsed]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
    localStorage.setItem('openKeys', JSON.stringify(keys));
  };
  const onClick = (router: any) => {
    navigate(router.key);
    setSelectKeys(router.key);
  };

  return (
    <div>
      <Menu
        mode="inline"
        // theme='dark'
        style={{ fontSize: 13 }}
        defaultSelectedKeys={selectKeys}
        defaultOpenKeys={openKeys}
        selectedKeys={selectKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        items={menus}
      />
    </div>
  );
}
