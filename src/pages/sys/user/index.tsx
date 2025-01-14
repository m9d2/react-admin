import { User } from '@/service';
import { Table } from '@/components';
import EditForm from './components/edit-form';
import { common } from '@/utils';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { MenuProps, TableProps } from 'antd';
import {
  App,
  Badge,
  Button,
  Card,
  Divider,
  Dropdown,
  Form,
  FormProps,
  Input,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Response, PageData, QueryParam } from '@/service/type.ts';
import { ActionType } from '@/pages/type.ts';

type UserQueryParam = QueryParam;
const Index: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageData>();
  const [queryParam, setQueryParam] = useState<UserQueryParam>({
    page: 0,
    size: 10,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [row, setRow] = useState<any>();
  const [action, setAction] = useState<ActionType>();
  const { message, modal } = App.useApp();

  const getMoreItems = (record: any) => {
    const moreItems: MenuProps['items'] = [
      {
        label: '重置密码',
        key: '1',
      },
      {
        label: record.status === 1 ? '启用' : '禁用',
        key: '2',
      },
      {
        label: '删除',
        key: '3',
      },
    ];
    return moreItems;
  };

  const columns: TableProps['columns'] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      width: 120,
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
      title: '性别',
      dataIndex: 'gender',
      width: 120,
      render: (value) => {
        return common.getGender(value);
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      ellipsis: true,
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      render: (value) => {
        return value === 0 ? (
          <Badge status="processing" text="启用" />
        ) : (
          <Badge status="default" text="禁用" />
        );
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
      render: (_, record) => {
        return (
          <>
            <a onClick={() => handleAction('modify', record)}>
              编辑
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <Dropdown
              menu={{
                items: getMoreItems(record),
                onClick: ({ key }) => handleMore(key, record),
              }}
            >
              <a>
                更多
                <DownOutlined />
              </a>
            </Dropdown>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    function page() {
      return User.Page(queryParam);
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
        case '1':
          handleAction('resetPassword', record);
          break;
        case '2':
          await User.Modify({
            id: record.id,
            status: record.status === 0 ? 1 : 0,
          });
          message.success('禁用成功-id:' + record.id);
          setQueryParam({ ...queryParam });
          break;
        case '3':
          await User.Delete(record.id);
          message.success('删除成功');
          setQueryParam({ ...queryParam });
          break;
        default:
          break;
      }
    })();
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish: FormProps['onFinish'] = (values) => {
    setQueryParam({
      ...queryParam,
      condition: values.condition,
      page: data?.number,
    });
  };

  const handleOnOk = () => {
    setOpen(false);
    setQueryParam({ ...queryParam });
  };

  const handleAction = (actionType: ActionType, record?: any) => {
    setAction(actionType);
    setRow(record || null);
    setOpen(true);
  };

  const handleBatchOption = ({ key }: { key: string }) => {
    if (key === '1') {
      modal.confirm({
        title: '注意',
        content: '请确认是否批量删除?',
        okText: '确认',
        cancelText: '取消',
        closable: true,
        onOk: () => {
          message.success('删除成功');
        },
      });
    }
    if (key === '2') {
      setSelectedRowKeys([]);
    }
  };

  const Header = () => {
    const items: MenuProps['items'] = [
      { key: 1, label: '删除', icon: <DeleteOutlined /> },
      { key: 2, label: '取消', icon: <MinusCircleOutlined /> },
    ];
    return (
      <div className="flex-space">
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAction('add')}
          >
            添加
          </Button>
          {selectedRowKeys.length > 0 && (
            <>
              <Dropdown
                menu={{ items, onClick: handleBatchOption }}
                trigger={['click']}
              >
                <Button icon={<DownOutlined />}>批量操作</Button>
              </Dropdown>
              <span style={{ fontWeight: 'normal', fontSize: 12 }}>
                已选{selectedRowKeys.length}条数据
              </span>
            </>
          )}
        </Space>
      </div>
    );
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Form
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
          layout="inline"
        >
          <Form.Item label="用户名/姓名" name="condition" className="form-item">
            <Input placeholder="请输入用户名或姓名" allowClear />
          </Form.Item>
          <Form.Item className="form-item">
            <Space size={8}>
              <Button
                icon={<SearchOutlined />}
                type="primary"
                htmlType="submit"
              >
                查询
              </Button>
              <Button icon={<RedoOutlined />} htmlType="reset">
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <Table
          data={data && data.content}
          header={<Header />}
          columns={columns}
          loading={loading}
          total={data && data.totalElements}
          onChange={(page, pageSize) =>
            setQueryParam({
              ...queryParam,
              page: page - 1,
              size: pageSize,
            })
          }
          current={data && data.number + 1}
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
        />
      </Card>
      <EditForm
        row={row}
        action={action}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleOnOk}
      />
    </Space>
  );
};

export default Index;
