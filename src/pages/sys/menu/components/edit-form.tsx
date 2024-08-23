import { Role } from '@/api';
import Form, { FormItem } from '@/components/form.tsx';
import Modal from '@/components/modal.tsx';
import { constant } from '@/utils';
import { App, Input, Select, Tree } from 'antd';
import { useEffect } from 'react';

export default function ModifyForm(props: {
  open: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  action?: string | 'add' | 'modify';
  row?: any;
  menus?: any[];
}) {
  const { open, onOk, onCancel, action = 'add', row, menus } = props;
  const { message } = App.useApp();

  const save = async (values: any) => {
    const resp = await Role.Save(values);
    if (resp.code === constant.SUCCESS_CODE) {
      message.success('操作成功');
      onOk();
      return true;
    }
    return false;
  };

  const modify = async (values: any) => {
    const resp = await Role.Update(values);
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
    menus?.forEach((value) => {
      value.title = value.name;
      value.key = value.id;
      value.child.forEach((child: any) => {
        child.title = child.name;
        child.key = child.id;
      });
      value.children = value.child;
    });
  }, [open, row, menus]);

  const addFormItems: FormItem[] = [
    {
      label: '菜单名称',
      name: 'name',
      child: <Input placeholder="请输入角色名称" />,
      rules: [{ required: true }],
    },
    {
      label: '父节点',
      name: 'parentId',
      child: (
        <Select
          style={{ width: '100%' }}
          placeholder="请选择"
          dropdownRender={() => {
            return <Tree treeData={menus} />;
          }}
        />
      ),
    },
    {
      label: '菜单类型',
      name: 'type',
      child: (
        <Select
          placeholder="请选择"
          style={{ width: 120 }}
          options={[
            { label: '目录', value: 'DIRECTORY' },
            { label: '菜单', value: 'MENU' },
          ]}
        />
      ),
      rules: [{ required: true }],
    },
    {
      label: 'url',
      name: 'url',
      child: <Input placeholder="请输入url" />,
      rules: [{ required: true }],
    },
    {
      label: 'Icon',
      name: 'icon',
      child: <Input placeholder="请输入Icon" />,
      rules: [{ required: true }],
    },
    {
      label: '排序',
      name: 'sort',
      child: <Input type="number" placeholder="请输入序号" />,
      rules: [{ required: true }],
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
      label: '菜单名称',
      name: 'name',
      child: <Input placeholder="请输入角色名称" />,
      rules: [{ required: true }],
    },
    {
      label: '菜单类型',
      name: 'type',
      child: (
        <Select
          placeholder="请选择"
          style={{ width: 120 }}
          options={[
            { label: '目录', value: 'DIRECTORY' },
            { label: '菜单', value: 'MENU' },
          ]}
        />
      ),
      rules: [{ required: true }],
    },
    {
      label: 'url',
      name: 'url',
      child: <Input placeholder="请输入url" />,
      rules: [{ required: true }],
    },
    {
      label: 'Icon',
      name: 'icon',
      child: <Input placeholder="请输入Icon" />,
      rules: [{ required: true }],
    },
    {
      label: '排序',
      name: 'sort',
      child: <Input type="number" placeholder="请输入序号" />,
      rules: [{ required: true }],
    },
  ];

  if (action === 'add') {
    return (
      <Modal open={open} title={'新增菜单'} onCancel={onCancel}>
        <Form
          style={{ height: '420px', overflow: 'auto' }}
          onFinish={save}
          onCancel={handleCancel}
          items={addFormItems}
        ></Form>
      </Modal>
    );
  }
  if (action === 'modify') {
    return (
      <Modal open={open} title={'更新菜单'} onCancel={onCancel}>
        <Form
          style={{ height: '420px', overflow: 'auto' }}
          onFinish={modify}
          onCancel={handleCancel}
          items={modifyFormItems}
          initialValues={row}
        ></Form>
      </Modal>
    );
  }
}
