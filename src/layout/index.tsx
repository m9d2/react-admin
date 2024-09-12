import { DynamicsIconSvg } from '@/components';
import AuthRouter from '@/layout/components/auth-router.tsx';
import Header from '@/layout/components/header.tsx';
import Menus from '@/layout/components/menus.tsx';
import { Layout } from 'antd';
import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const { Footer, Content } = Layout;

function Logo(props: { collapsed: boolean; style?: CSSProperties }) {
  return (
    <div className={styles.logo} style={props.style}>
      <a>
        <DynamicsIconSvg iconName="logo" />
        {!props.collapsed && <div className={styles.logoText}>管理系统</div>}
      </a>
    </div>
  );
}

const Navigation = () => {
  const value = useSelector((state: any) => state.collapsed.value);
  return (
    <Layout.Sider
      width={256}
      trigger={null}
      collapsible
      collapsed={value}
      className={styles.navigation}
    >
      <Logo collapsed={value} />
      <Menus collapsed={value} />
    </Layout.Sider>
  );
};

const MainLayout = () => {
  const year = new Date().getFullYear();
  return (
    <AuthRouter>
      <Layout>
        <Navigation />
        <Layout>
          <Header />
          <Content
            style={{
              padding: 16,
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ padding: 8 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 12 }}>Copyright &copy; {year}</span>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </AuthRouter>
  );
};

export default MainLayout;
