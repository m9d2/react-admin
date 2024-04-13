import React, {useEffect, useState} from "react";
import type {MenuProps, TableProps} from "antd";
import {App, Button, Card, Divider, Dropdown, Form, FormProps, Input, Space,} from "antd";
import Table from "@/components/table";
import {DownOutlined, EditOutlined, PlusOutlined, RedoOutlined, SearchOutlined,} from "@ant-design/icons";
import {Role, User} from "@/api";
import EditForm from "@/pages/sys/role/components/edit-form";

const Index: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<PageData>();
    const [queryParam, setQueryParam] = useState<QueryParam>({
        page: 0,
        size: 10,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [row, setRow] = useState<any>();
    const [action, setAction] = useState("add");
    const {message} = App.useApp();

    const getMoreItems = (record: any) => {
        const moreItems: MenuProps["items"] = [
            {
                label: record.status === 1 ? '启用' : '禁用',
                key: "1",
            },
            {
                label: "删除",
                key: "2",
            },
        ];
        return moreItems
    }

    const columns: TableProps["columns"] = [
        {
            title: "角色ID",
            dataIndex: "id",
            width: 80,
        },
        {
            title: "角色名称",
            dataIndex: "name",
            width: 120,
        },
        {
            title: "角色类型",
            dataIndex: "type",
            width: 120,
            ellipsis: true,
        },
        {
            title: "备注",
            dataIndex: "remark",
            width: 120,
            ellipsis: true,
        },
        {
            title: "操作",
            dataIndex: "option",
            width: 180,
            render: (_, record) => {
                return (
                    <>

                        <a onClick={() => modify(record)}>编辑
                            <EditOutlined/>
                        </a>
                        <Divider type="vertical"/>
                        <Dropdown
                            menu={{
                                items: getMoreItems(record),
                                onClick: ({key}) => handleMore(key, record),
                            }}
                        >
                            <a>
                                更多
                                <DownOutlined/>
                            </a>
                        </Dropdown>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        function page() {
            return Role.Page(queryParam);
        }

        (async () => {
            setLoading(true);
            const response: Response<PageData> = await page();
            if (response.data) {
                setData(response.data);
            }
            setLoading(false);
        })();
    }, [queryParam]);

    const handleMore = (key: string, record: any) => {
        (async () => {
            switch (key) {
                case "1":
                    await User.Modify({id: record.id, status: record.status === 0 ? 1 : 0})
                    message.success("禁用成功-id:" + record.id);
                    break;
                case "2":
                    await User.Delete(record.id)
                    message.success("删除成功");
                    break;
                default:
                    break;
            }
            setQueryParam({...queryParam})
        })()
    };

    const onFinish: FormProps["onFinish"] = (values) => {
        setQueryParam({
            ...queryParam,
            condition: values.condition,
            page: data?.number,
        });
    };

    const add = () => {
        setAction("add");
        setOpen(true);
    };

    const modify = (record: any) => {
        setRow(record);
        setAction("modify");
        setOpen(true);
    };

    const handleOnOk = () => {
        setOpen(false)
        setQueryParam({...queryParam})
    }

    const Title = () => {
        return (
            <div className="flex-space">
                <Space className="table-title">
                    <Button type="primary" icon={<PlusOutlined/>} onClick={add}>
                        新增角色
                    </Button>
                </Space>
            </div>
        );
    };

    return (
        <>
            <Card style={{marginBottom: 16}}>
                <Form
                    name="basic"
                    autoComplete="off"
                    onFinish={onFinish}
                    layout="inline"
                >
                    <Form.Item label="角色名称" name="condition" className="form-item">
                        <Input placeholder="请输入用户名或姓名" allowClear/>
                    </Form.Item>
                    <Form.Item className="form-item">
                        <Space size={8}>
                            <Button
                                icon={<SearchOutlined/>}
                                type="primary"
                                htmlType="submit"
                            >
                                查询
                            </Button>
                            <Button icon={<RedoOutlined/>} htmlType="reset">
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>

            <Card>
                <Table
                    data={data && data.content}
                    title={<Title/>}
                    columns={columns}
                    loading={loading}
                    total={data && data.totalElements}
                    onChange={(page, pageSize) =>
                        setQueryParam({...queryParam, page: page - 1, size: pageSize})
                    }
                    current={data && data.number + 1}
                    rowKey={(record) => record.id}
                    bordered
                />
            </Card>
            <EditForm
                row={row}
                action={action}
                open={open}
                onCancel={() => setOpen(false)}
                onOk={handleOnOk}
            />
        </>
    );
};

export default Index;
