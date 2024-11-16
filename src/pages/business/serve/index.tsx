import { Serve } from '@/service';
import { Table } from '@/components';
import EditForm, { Action } from './components/edit-form';
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
import { Response, QueryParam } from '@/service/type.ts';

const Index: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [queryParam, setQueryParam] = useState<QueryParam>({
    page: 0,
    size: 10,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [row, setRow] = useState<any>();
  const [action, setAction] = useState<Action>();
  const { message, modal } = App.useApp();

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 120,
    },
    {
      title: '服务器IP',
      dataIndex: 'host',
      width: 120,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 120,
      ellipsis: true,
    },
    {
      title: '密钥路径',
      dataIndex: 'privateKeyPath',
      width: 120,
    },
    {
      title: '指令',
      dataIndex: 'command',
      ellipsis: true,
      width: 120,
    },
    {
      title: '指令参数',
      dataIndex: 'commandArgs',
      width: 200,
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
            <a onClick={() => exec(record.id)}>
              执行
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a onClick={() => logs(record.id)}>
              日志
              <EditOutlined />
            </a>
          </>
        );
      },
    },
  ];

  const exec = (id: number) => {
    Serve.Exec(id).then((res) => {
      if (res.code === 200) {
        message.success('执行成功');
      } else {
        message.error(res.msg);
      }
    });
  };

  const logs = (id: number) => {
    Serve.Logs(id).then((res) => {
      if (res.code === 200) {
        message.success('执行成功');
      } else {
        message.error(res.msg);
      }
    });
  };

  useEffect(() => {
    function all() {
      return Serve.All();
    }

    (async () => {
      setLoading(true);
      const response: Response<any> = await all();
      if (response.data) {
        console.log(response.data);
        setData(response.data);
      }
      setLoading(false);
    })();
  }, []);

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

  const handleAction = (actionType: Action, record?: any) => {
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
          <Form.Item label="查询" name="condition" className="form-item">
            <Input placeholder="" allowClear />
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
          data={data}
          header={<Header />}
          columns={columns}
          loading={loading}
          total={data}
          pagination={false}
          rowKey={(record) => record.id}
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
