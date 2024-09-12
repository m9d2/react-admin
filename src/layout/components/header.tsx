import { useAppDispatch, useAppSelector } from '@/hooks';
import styles from '@/layout/index.module.scss';
import { toggle } from '@/store/modules/collapsed.ts';
import { auth } from '@/utils';
import {
  BellOutlined,
  CompressOutlined,
  DownOutlined,
  ExpandOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import {
  App,
  Badge,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  List,
  MenuProps,
  Popover,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;
const messages = [
  {
    title: '消息1',
    message: '这个是测试消1',
    hasRead: false,
  },
  {
    title: '消息2',
    message: '这个是测试消2',
    hasRead: false,
  },
  {
    title: '消息3',
    message: '这个是测试消3',
    hasRead: false,
  },
  {
    title: '消息4',
    message: '这个是测试消4',
    hasRead: false,
  },
  {
    title: '消息5',
    message: '这个是测试消5',
    hasRead: false,
  },
];

export default function Header() {
  const [name, setName] = useState();
  const navigate = useNavigate();
  const value = useAppSelector((state) => state.collapsed.value);
  const dispatch = useAppDispatch();
  const { Header } = Layout;
  const { token } = useToken();
  const [showDot, setShowDot] = useState(false);
  const { modal } = App.useApp();
  const [fullScreen, setFullScreen] = useState(false);

  const logout = () => {
    modal.confirm({
      title: '提示',
      content: '此操作将退出登录, 是否继续?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        auth.clearUserInfo();
        navigate('/login');
      },
    });
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
    messages.forEach((item) => {
      if (!item.hasRead) {
        setShowDot(true);
        return;
      }
    });
  }, []);

  const readMessage = (message: any) => {
    message.hasRead = true;
  };

  const isFullScreen = () => {
    return document.fullscreenElement;
  };

  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (isFullScreen()) {
      document.exitFullscreen().then(() => {
        setFullScreen(false);
      });
    } else {
      element.requestFullscreen().then(() => {
        setFullScreen(true);
      });
    }
  };

  const NoticeContent = (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Badge dot={!item.hasRead}>
                  <MessageOutlined style={{ color: token.colorPrimary }} />
                </Badge>
              }
              title={<a onClick={() => readMessage(item)}>item.title</a>}
              description={item.message}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            paddingInline: 8,
            paddingBlock: 0,
          },
          Layout: {
            headerPadding: 20,
            headerHeight: 10,
          },
        },
      }}
    >
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <Button
            type="text"
            icon={value ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
            <Button className="scale-animated-wrapper" type="text">
              <Badge dot={showDot}>
                <BellOutlined className="scale-animated" />
              </Badge>
            </Button>
          </Popover>
          <Button
            className="scale-animated-wrapper"
            type="text"
            onClick={toggleFullScreen}
          >
            {fullScreen ? (
              <CompressOutlined className="scale-animated" />
            ) : (
              <ExpandOutlined className="scale-animated" />
            )}
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
