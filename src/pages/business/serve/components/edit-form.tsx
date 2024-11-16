import { Role, User } from '@/service';
import { Form, FormItem, Modal } from '@/components';
import { constant } from '@/utils';
import { App, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Response } from '@/service/type.ts';

const { TextArea } = Input;

export type Action = 'add' | 'modify' | 'resetPassword';

interface Props {
  open: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  action?: Action;
  row?: any;
}

export default function ModifyForm(props: Props) {
  const { open, onOk, onCancel, action, row } = props;
  const { message } = App.useApp();
  const [roles, setRoles] = useState<any[]>([]);

  const save = async (values: any) => {
    const resp = await User.Save(values);
    if (resp.code === constant.SUCCESS_CODE) {
      message.success('操作成功');
      onOk();
      return true;
    }
    return false;
  };

  const modify = async (values: any) => {
    const resp = await User.Modify(values);
    if (resp.code === constant.SUCCESS_CODE) {
      message.success('操作成功');
      onOk();
      return true;
    }
    return false;
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (action === 'add' || action === 'modify') {
      const fetchRoles = async () => {
        if (roles.length === 0) {
          const resp: Response<any[]> = await Role.All();
          if (resp.data) {
            setRoles(resp.data);
          }
        }
      };
      if (open) {
        (async () => {
          await fetchRoles();
        })();
      }
    }
  }, [open]);

  const addFormItems: FormItem[] = [
    {
      label: 'id',
      name: 'id',
      child: <Input />,
      rules: [{ required: true }],
      hidden: true,
    },
    {
      label: '服务器IP',
      name: 'host',
      child: <Input disabled />,
      rules: [{ required: true }],
    },
    {
      label: '用户名',
      name: 'username',
      child: <Input />,
      rules: [{ required: true }],
    },
    {
      label: '密钥路径',
      name: 'privateKeyPath',
      child: <Input />,
    },
    {
      label: '指令',
      name: 'command',
      child: <Input />,
    },
    {
      label: '指令参数',
      name: 'commandArgs',
      child: <TextArea />,
    },
  ];

  const modifyFormItems: FormItem[] = [
    {
      label: 'id',
      name: 'id',
      child: <Input />,
      rules: [{ required: true }],
      hidden: true,
    },
    {
      label: '服务器IP',
      name: 'host',
      child: <Input disabled />,
      rules: [{ required: true }],
    },
    {
      label: '用户名',
      name: 'username',
      child: <Input />,
      rules: [{ required: true }],
    },
    {
      label: '密钥路径',
      name: 'privateKeyPath',
      child: <Input />,
    },
    {
      label: '指令',
      name: 'command',
      child: <Input />,
    },
    {
      label: '指令参数',
      name: 'commandArgs',
      child: <TextArea />,
    },
  ];

  if (action === 'add') {
    return (
      <Modal open={open} title={'添加'} onCancel={onCancel}>
        <Form
          onFinish={save}
          onCancel={handleCancel}
          items={addFormItems}
        ></Form>
      </Modal>
    );
  }
  if (action === 'modify') {
    return (
      <Modal open={open} title={'编辑'} onCancel={onCancel}>
        <Form
          onFinish={modify}
          onCancel={handleCancel}
          items={modifyFormItems}
          initialValues={row}
        ></Form>
      </Modal>
    );
  }
}
