import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "@/utils";
import {Avatar, Button, Dropdown, MenuProps} from "antd";
import {UserInfo} from "@/api/user";
import styles from "@/pages/layout/index.module.scss";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {toggle} from "@/store/modules/collapsed.ts"
import {useDispatch, useSelector} from "react-redux";

export default function Header() {
    const [name, setName] = useState();
    const navigate = useNavigate();
    const value = useSelector((state:any) => state.collapsed.value)
    const dispatch = useDispatch()

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
                icon={value ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => (dispatch(toggle()))}
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