import React, {useEffect, useState} from 'react';
import type {TableProps} from 'antd';
import {Button, Divider, Form, FormProps, Input,} from 'antd';
import {ContentBox, SearchBox} from '@/components/ui'
import Table from "@/components/table";
import {PlusOutlined, RedoOutlined, SearchOutlined} from "@ant-design/icons";
import {User} from "@/api";
import AddForm from "@/pages/sys/user/components/addForm.tsx";

const App: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data>()
    const [queryParam, setQueryParam] = useState<QueryParam>({page: 0, size: 10})
    const [open, setOpen] = useState<boolean>(false);
    const columns: TableProps['columns'] = [
        {
            title: '用户ID',
            dataIndex: 'id',
            width: 100,

        },
        {
            title: '登录名称',
            dataIndex: 'username',
            width: 120,
        },
        {
            title: '用户名称',
            dataIndex: 'name',
            width: 120,
            ellipsis: true,
        },
        {
            title: '部门',
            dataIndex: 'department',
            width: 180,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            ellipsis: true,
            width: 180,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: 180,
        },
        {
            title: '用户状态',
            dataIndex: 'status',
            render: value => {
                return (
                    value === 1 ? "正常" : "禁用"
                )
            },
            width: 100,
        },
        {
            title: '最后登录时间',
            dataIndex: 'lastModifiedDate',
            width: 180,
        },
        {
            title: '操作',
            dataIndex: 'option',
            width: 180,
            render: (record) => {
                return (
                    <>
                        <a>编辑</a>
                        <Divider type="vertical"/>
                        <a onClick={() => remove(record)}>删除</a>
                    </>
                )
            }
        }
    ];

    useEffect(() => {
        function page() {
            return User.Page(queryParam)
        }

        (async () => {
            setLoading(true)
            const response: Response = await page()
            setData(response?.data)
            setLoading(false)
        })()
    }, [queryParam])

    const remove = (record: any) => {
        console.log('remove', record)
    }
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onFinish: FormProps["onFinish"] = (values) => {
        setQueryParam({...queryParam, condition: values.condition, page: data?.number})
    };

    const Title = () => {
        return (
            <div className="flex-space">
                <span className="table-title">用户列表</span>
                <div className="table-title-menus">
                    <Button type="primary" icon={<PlusOutlined/>} onClick={() => (setOpen(true))}>新增用户</Button>
                    <Button type="text" icon={<RedoOutlined/>}></Button>
                </div>
            </div>
        )
    }

    return (
        <div style={{overflow: 'auto',}}>
            <div style={{margin: '12px'}}>
                <SearchBox>
                    <Form
                        name="basic"
                        className="search-form"
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <div className="flex">
                            <Form.Item label="用户名/姓名" name="condition">
                                <Input placeholder="请输入用户名或姓名" allowClear/>
                            </Form.Item>
                            <Button icon={<SearchOutlined/>} type="primary" htmlType="submit"
                                    style={{marginLeft: '8px'}}>
                                查询
                            </Button>
                            <Button icon={<RedoOutlined/>} style={{marginLeft: '8px'}}>
                                重置
                            </Button>
                        </div>

                    </Form>
                </SearchBox>

                <ContentBox>
                    <Table data={data && data.content}
                           title={<Title/>}
                           columns={columns} loading={loading}
                           total={data && data.totalElements}
                           onChange={(page, pageSize) => setQueryParam({...queryParam, page: page - 1, size: pageSize})}
                           current={data && data.number + 1}
                           rowKey={(record) => (record.id)}
                           bordered
                           rowSelection={rowSelection}/>
                </ContentBox>
                {open && <AddForm open={open} setOpen={setOpen}/>}
            </div>
        </div>
    )
}

export default App;