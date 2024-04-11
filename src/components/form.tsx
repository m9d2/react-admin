import {Button, Form as AForm, FormProps, Space} from "antd";
import React, {useEffect, useState} from "react";

export interface FormItem {
    label: string,
    name: string,
    rules?: any[],
    child: React.ReactElement,
    initialValue?: any,
    hidden?: boolean,
}


interface Props {
    onCancel?: () => void,
    onFinish?: (values: any) => Promise<boolean>,
    items: FormItem[],
}


const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12}
}


const Form = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const {onCancel, onFinish, items} = props
    const [form] = AForm.useForm()

    useEffect(() => {
        form.resetFields()
    }, [form])

    
    const handleOnCancel = () => {
        if (onCancel) {
            onCancel()
        }
        form.resetFields()
    }

    const handleOnFinish: FormProps["onFinish"] = async (values) => {
        setLoading(true)
        if (onFinish) {
            const success = await onFinish(values)
            if (success) {
                form.resetFields()
            }
        }
        setLoading(false)
    }
    return (
        <AForm form={form} {...layout} onFinish={handleOnFinish}>
            {items.map((item, index) => {
                return (
                    <AForm.Item key={index} label={item.label} name={item.name} rules={item.rules} initialValue={item.initialValue} hidden={item.hidden}>
                        {item.child}
                    </AForm.Item>
                )
            })}
            <Space className='flex-end'>
                <Button type="default" onClick={handleOnCancel}>
                    取消
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                    确定
                </Button>
            </Space>
        </AForm>
    )
}

export default Form