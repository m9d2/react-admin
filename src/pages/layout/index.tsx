import {Avatar, Button, Dropdown, Layout, MenuProps} from "antd";
import React, {CSSProperties, useEffect, useState} from "react";
import styles from "./index.module.scss"
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Navigation from "@/pages/layout/components/navigation.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {auth} from "@/utils";
import AuthRouter from "@/pages/layout/components/auth-router.tsx";
import {UserInfo} from '@/api/user/index.ts'


function Logo(props: { collapsed: boolean, style?: CSSProperties }) {
    return (
        <div className={styles.logo} style={props.style}>
            <a>
                <img width="auto" height="22"
                     src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"/>
                {!props.collapsed && <div className={styles.logoText}>Ant Design</div>}
            </a>
        </div>
    )
}

function Header(props: {
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>,

}) {
    const [name, setName] = useState();
    const navigate = useNavigate();
    const logout = () => {
        auth.removeToken();
        navigate("/login")
    }
    const items: MenuProps['items'] = [
        {
            key: "1",
            label: "退出登录",
            onClick: logout
        }
    ]
    const avatar = "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png";

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const json = JSON.parse(user)
            setName(json.name)
        }

        async function getUserInfo() {
            const response: any = await UserInfo();
            console.log(response)
            return response.data;
        }

        getUserInfo().then((res) => {
            setName(res.name)
        })

    }, []);
    return (
        <div className={styles.header}>
            <Button
                type="text"
                icon={props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => props.setCollapsed(!props.collapsed)}
                style={{fontSize: '16px', width: '48px', height: '48px'}}
            />
            <Dropdown menu={{items}} placement="bottom" arrow>
                <Button type="text" className="flex" style={{height: '48px'}}>
                    <Avatar size={32} src={avatar}/>
                    <span style={{color: 'rgba(0, 0, 0, 0.45)', marginLeft: '8px'}}>{name}</span>
                </Button>
            </Dropdown>
        </div>
    )
}

const Index = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <AuthRouter>
            <Layout style={{height: '100%', overflow: 'auto'}}>
                <Layout.Sider width={256} trigger={null} collapsible collapsed={collapsed}>
                    <Logo collapsed={collapsed}/>
                    <Navigation collapsed={collapsed}/>
                </Layout.Sider>
                <Layout>
                    <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
                    <div className="container">
                        <Outlet/>
                    </div>
                </Layout>
            </Layout>
        </AuthRouter>
    )
}

export default Index