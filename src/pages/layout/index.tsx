import {Layout} from "antd";
import {CSSProperties} from "react";
import styles from "./index.module.scss"
import Menus from "@/pages/layout/components/menus.tsx";
import {Outlet} from "react-router-dom";
import AuthRouter from "@/pages/layout/components/auth-router.tsx";
import Header from "@/pages/layout/components/header.tsx";
import {useSelector} from "react-redux";


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


const Navigation = () => {
    const value = useSelector((state:any) => state.collapsed.value)
    return (
        <Layout.Sider width={256} trigger={null} collapsible collapsed={value} className={styles.navigation}>
            <Logo collapsed={value}/>
            <Menus collapsed={value}/>
        </Layout.Sider>
    )
}

const Index = () => {
    return (
        <AuthRouter>
            <Layout style={{height: '100%', overflow: 'auto'}}>
                <Navigation/>
                <Layout style={{height: '100%', overflowY: 'auto'}}>
                    <Header/>
                    <div className="container">
                        <Outlet/>
                    </div>
                </Layout>
            </Layout>
        </AuthRouter>
    )
}

export default Index