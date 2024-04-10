import React from "react";
import { Form, Input, Modal, Switch, } from "antd";

export default function AddForm(props: {
    open: boolean | undefined,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOk: () => void,
}) {
    const { open, setOpen } = props

    const handleOk = () => {
        setOpen(false)
    }
    return (
        <Modal
            open={open}
            title="Title"
            onOk={handleOk}
            onCancel={() => setOpen(false)}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
            )}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
            >

                <Form.Item label="用户名">
                    <Input />
                </Form.Item>
                <Form.Item label="姓名">
                    <Input />
                </Form.Item>
                <Form.Item label="密码">
                    <Input />
                </Form.Item>
                <Form.Item label="手机号">
                    <Input />
                </Form.Item>
                <Form.Item label="邮箱">
                    <Input />
                </Form.Item>
                <Form.Item label="启用">
                    <Switch defaultChecked />
                </Form.Item>
            </Form>
        </Modal>
    )
}