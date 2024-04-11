import React, {useState} from "react";
import {App, Input, Radio, Select} from "antd";
import Modal from '@/components/modal.tsx'
import {User} from '@/api'
import {constant} from "@/utils";
import Form, {FormItem} from '@/components/form.tsx'

export default function AddForm(props: {
    open: boolean | undefined;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleOk: () => void;
}) {
    const {open, setOpen} = props;
    const {message} = App.useApp()
    const [roles, setRoles] = useState<any[]>([])
    const [roleLoading, setRoleLoading] = useState(false)

    const onFinish = async (values: any) => {
        const resp = await User.Save(values)
        if (resp.code === constant.SUCCESS_CODE) {
            message.success("操作成功")
            setOpen(false);
            return true
        }
        return false
    };

    const handleCancel = () => {
        setOpen(false)
    }

    const fetchRoles = () => {
        if (roles.length === 0) {
            setRoleLoading(true)
            setRoles([{label: '管理员', value: 1}, {label: '普通用户', value: 2}])
            setRoleLoading(false)
        }
    }

    const formItems: FormItem[] = [
        {
            label: '用户名',
            name: 'username',
            child: <Input/>,
            rules: [{required: true}]
        },
        {
            label: '姓名',
            name: 'name',
            child: <Input/>,
            rules: [{required: true}]
        },
        {
            label: '密码',
            name: 'password',
            child: <Input type='password'/>,
            rules: [{required: true}]
        },
        {
            label: '角色',
            name: 'roleId',
            child: (
                <Select
                    placeholder='请选择'
                    onFocus={fetchRoles}
                    loading={roleLoading}
                    style={{width: 120}}
                    options={roles}
                />
            ),
            rules: [{required: true}]
        },
        {
            label: '手机号',
            name: 'phone',
            child: <Input/>
        },
        {
            label: '性别',
            name: 'gender',
            child: (
                <Radio.Group defaultValue={1}>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                </Radio.Group>
            )
        }
    ]

    return (
        <Modal
            open={open}
            title='新增用户'
            onCancel={() => setOpen(false)}
        >
            <Form onFinish={onFinish} onCancel={handleCancel} items={formItems}>
            </Form>
        </Modal>
    );
}
