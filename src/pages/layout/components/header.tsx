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
    Avatar,
    Badge,
    Button,
    ConfigProvider,
    Dropdown,
    Layout,
    List,
    MenuProps,
    Popover,
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

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    const NoticeContent = (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                            />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    );

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
                    <Popover
                        overlayStyle={{ width: 600 }}
                        overlayInnerStyle={{ marginRight: 8 }}
                        placement="bottom"
                        content={NoticeContent}
                        trigger="click"
                    >
                        <Button type="text">
                            <Badge dot={true}>
                                <BellOutlined />
                            </Badge>
                        </Button>
                    </Popover>
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
