import { useAppDispatch, useAppSelector } from '@/hooks';
import styles from '@/pages/layout/index.module.scss';
import { toggle } from '@/store/modules/collapsed.ts';
import { auth } from '@/utils';
import {
    BellOutlined,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
    Badge,
    Button,
    ConfigProvider,
    Dropdown,
    Layout,
    MenuProps,
} from 'antd';
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

    useEffect(() => {
        const user = auth.getUserInfo();
        if (user) {
            setName(user.name);
        }
    }, []);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        paddingInline: 8,
                        paddingBlock: 0,
                    },
                },
            }}
        >
            <Header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Button
                        type="text"
                        icon={
                            value ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => dispatch(toggle())}
                    />
                </div>
                <div className={styles.headerRight}>
                    <Button type="text">
                        <Badge dot={true}>
                            <BellOutlined />
                        </Badge>
                    </Button>
                    <Dropdown menu={{ items }}>
                        <Button type="text">
                            {name}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </Header>
        </ConfigProvider>
    );
}
