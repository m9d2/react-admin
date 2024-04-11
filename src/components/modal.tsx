import {Button, Modal as AModal} from 'antd';
import React from "react";

interface Props {
    open: boolean | undefined,
    title: string,
    children: React.ReactNode,
    onOk?: (value: any) => void,
    onCancel?: () => void,
    hasFooter?: boolean
}

const Modal = (props: Props) => {
    const {open, title, children, onOk, onCancel, hasFooter = false} = props

    const Title = () => {
        return (
            <>
                <div>
                    <span>{title}</span>
                </div>
            </>
        )
    }

    const Footer = () => {
        return (
            <>
                <Button type='default' htmlType='reset' onClick={onCancel}>取消</Button>
                <Button type='primary' htmlType='submit' onClick={onOk}>确定</Button>
            </>
        )
    }

    return (
        <AModal open={open} onOk={onOk} onCancel={onCancel} title={<Title/>} footer={hasFooter ? <Footer/> : null} forceRender>
            {children}
        </AModal>
    )
}

export default Modal