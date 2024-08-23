import { useAppDispatch } from '@/hooks';
import { login } from '@/store/modules/user.ts';
import { auth } from '@/utils';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Alert,
  App,
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  theme,
} from 'antd';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const { useToken } = theme;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Page() {
  const { token } = useToken();
  const [textMessage, setTextMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const initialValues = {
    username: 'admin',
    password: 'admin',
    remember: true,
  };

  if (auth.getToken()) {
    return <Navigate to={import.meta.env.VITE_APP_HOMEPAGE} replace />;
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    try {
      const msg = await dispatch(login(values));
      setTimeout(() => {
        if (msg) {
          setTextMessage(msg);
        } else {
          message.success('登录成功');
          navigate(import.meta.env.VITE_APP_HOMEPAGE);
        }
        setLoading(false);
      }, 200);
    } catch (e) {
      setLoading(false);
    }
  };

  const passwordOnFocus = () => {
    setTextMessage('');
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loginForm}>
          <Form
            style={{
              width: '328px',
              maxWidth: '328px',
              minWidth: '280px',
            }}
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            name="normal_login"
            initialValues={initialValues}
          >
            <Form.Item>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <img
                  width="auto"
                  height="48"
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  alt="logo"
                />
                <div className={styles.logoText}>Ant Design</div>
              </div>
            </Form.Item>
            {textMessage && (
              <Form.Item>
                <Alert message={textMessage} type="error" showIcon />
              </Form.Item>
            )}
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                allowClear
                prefix={
                  <UserOutlined
                    style={{
                      color: token.colorTextDescription,
                    }}
                  />
                }
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    style={{
                      color: token.colorTextDescription,
                    }}
                  />
                }
                type="password"
                onFocus={passwordOnFocus}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
