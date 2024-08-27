import { Menu } from '@/api';
import { DynamicsIconSvg, Table } from '@/components';
import EditForm from './components/edit-form';
import {
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { MenuProps, TableProps } from 'antd';
import {
  App,
  Button,
  Card,
  Divider,
  Dropdown,
  Form,
  FormProps,
  Input,
  Space,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>();
  const [queryParam, setQueryParam] = useState<QueryParam>({
    page: 0,
    size: 10,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [row, setRow] = useState<any>();
  const [action, setAction] = useState<string>('add');
  const { message } = App.useApp();
  const [editFormVisible, setEditFormVisible] = useState(false);

  const getMoreItems = () => {
    const moreItems: MenuProps['items'] = [
      {
        label: '删除',
        key: '1',
      },
    ];
    return moreItems;
  };

  const columns: TableProps['columns'] = [
    {
      title: '菜单ID',
      dataIndex: 'id',
      width: 120,
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '菜单类型',
      dataIndex: 'type',
      width: 120,
      render: (_, record) => {
        if (record.type === 'DIRECTORY') {
          return <Tag>目录</Tag>;
        } else {
          return <Tag color="blue">菜单</Tag>;
        }
      },
    },
    {
      title: 'url',
      dataIndex: 'url',
      width: 120,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      ellipsis: true,
      width: 120,
      render: (_, record) => {
        if (record.icon) {
          return <DynamicsIconSvg iconName={record.icon} />;
        }
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 180,
      render: (_, record) => {
        return (
          <>
            <a onClick={() => modify(record)}>
              编辑
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <Dropdown
              menu={{
                items: getMoreItems(),
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
    function list() {
      return Menu.List();
    }

    (async () => {
      setLoading(true);
      const response: Response<any[]> = await list();
      if (response.data) {
        response.data.map((item) => {
          if (item.child) {
            item.hasChildren = true;
            item.children = item.child;
          }
        });
        setData(response.data);
      }

      setEditFormVisible(true);
      setLoading(false);
    })();
  }, [queryParam]);

  const handleMore = (key: string, record: any) => {
    (async () => {
      switch (key) {
        case '1':
          resetPassword(record);
          break;
        case '2':
          // await User.Modify({
          //     id: record.id,
          //     status: record.status === 0 ? 1 : 0,
          // });
          message.success('禁用成功-id:' + record.id);
          setQueryParam({ ...queryParam });
          break;
        case '3':
          // await User.Delete(record.id);
          message.success('删除成功');
          setQueryParam({ ...queryParam });
          break;
        default:
          break;
      }
    })();
  };

  const onFinish: FormProps['onFinish'] = (values) => {
    setQueryParam({
      ...queryParam,
      condition: values.condition,
    });
  };

  const add = () => {
    setAction('add');
    setOpen(true);
  };

  const modify = (record: any) => {
    setRow(record);
    setAction('modify');
    setOpen(true);
  };

  const handleOnOk = () => {
    setOpen(false);
    setQueryParam({ ...queryParam });
  };

  const resetPassword = (record: any) => {
    setAction('resetPassword');
    setOpen(true);
    setRow(record);
  };

  const Title = () => {
    return (
      <div className="flex-space">
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={add}>
            添加
          </Button>
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
          <Form.Item label="菜单名称" name="name" className="form-item">
            <Input placeholder="请输入菜单名称" allowClear />
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
          title={<Title />}
          data={data}
          columns={columns}
          loading={loading}
          pagination={false}
          rowKey={(record) => record.id}
        />
      </Card>
      {editFormVisible && (
        <EditForm
          row={row}
          action={action}
          open={open}
          onCancel={() => setOpen(false)}
          onOk={handleOnOk}
          menus={data}
        />
      )}
    </Space>
  );
};

export default Index;
