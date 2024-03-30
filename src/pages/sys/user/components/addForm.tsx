import React from "react";
import {Button, Drawer, Form, Input, Space, Switch,} from "antd";

export default function AddForm(props: {
    open: boolean | undefined,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const extraRender = (
        <Space>
            <Button onClick={() => props.setOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => props.setOpen(false)}>
                保存
            </Button>
        </Space>
    )

    return (
        <Drawer
            width={580}
            title="新增用户"
            open={props.open}
            onClose={() => props.setOpen(false)}
            maskClosable={false}
            extra={extraRender}
        >
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 12}}
            >

                <Form.Item label="用户名">
                    <Input/>
                </Form.Item>
                <Form.Item label="姓名">
                    <Input/>
                </Form.Item>
                <Form.Item label="密码">
                    <Input.Password/>
                </Form.Item>
                <Form.Item label="手机号">
                    <Input/>
                </Form.Item>
                <Form.Item label="邮箱">
                    <Input/>
                </Form.Item>
                <Form.Item label="启用">
                    <Switch defaultChecked/>
                </Form.Item>
            </Form>
        </Drawer>
    )
}