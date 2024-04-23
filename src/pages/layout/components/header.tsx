import { useAppDispatch, useAppSelector } from '@/hooks';
import styles from '@/pages/layout/index.module.scss';
import { toggle } from '@/store/modules/collapsed.ts';
import { auth } from '@/utils';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [name, setName] = useState();
    const navigate = useNavigate();
    const value = useAppSelector((state) => state.collapsed.value);
    const dispatch = useAppDispatch();
    const { Header } = Layout;

    const logout = () => {
        auth.clearUserInfo();
        navigate('/login');
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '退出登录',
            onClick: logout,
        },
    ];
    const avatar =
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';

    useEffect(() => {
        const user = auth.getUserInfo();
        if (user) {
            setName(user.name);
        }
    }, []);

    return (
        <Header className={styles.header}>
            <Button
                type="text"
                icon={value ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(toggle())}
                style={{ fontSize: '16px', width: '48px', height: '48px' }}
            />
            <Dropdown menu={{ items }} placement="bottom" arrow>
                <Button type="text" className="flex" style={{ height: '48px' }}>
                    <Avatar size={32} src={avatar} />
                    <span style={{ marginLeft: '8px' }}>{name}</span>
                </Button>
            </Dropdown>
        </Header>
    );
}
