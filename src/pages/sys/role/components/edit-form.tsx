import { Menu, Role } from '@/api';
import Form, { FormItem } from '@/components/form.tsx';
import Modal from '@/components/modal.tsx';
import { constant } from '@/utils';
import { App, Input, Select, Tree, TreeProps } from 'antd';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

export default function ModifyForm(props: {
  open: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  action?: string | 'add' | 'modify';
  row?: any;
}) {
  const { open, onOk, onCancel, action = 'add', row } = props;
  const { message } = App.useApp();
  const [menus, setMenus] = useState<any[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);

  const save = async (values: any) => {
    values = { ...values, menuIds: checkedKeys };
    const resp = await Role.Save(values);
    if (resp.code === constant.SUCCESS_CODE) {
      message.success('操作成功');
      onOk();
      return true;
    }
    return false;
  };

  const modify = async (values: any) => {
    console.log(checkedKeys);
    values = { ...values, menuIds: checkedKeys };
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
    const fetchMenus = async () => {
      if (menus.length === 0) {
        const resp: Response<any[]> = await Menu.MyMenus();
        if (resp.data) {
          const data = resp.data.map((menu) => {
            return {
              title: menu.name,
              key: menu.id,
              children: menu.child.map((child: any) => {
                return { title: child.name, key: child.id };
              }),
            };
          });
          setMenus(data);
        }
      }
    };

    if (open) {
      (async () => {
        await fetchMenus();
      })();
    }
  }, [open]);

  useEffect(() => {
    if (row) {
      setCheckedKeys(row.menuIds || []);
    }
  }, [row]);

  const onCheck: TreeProps['onCheck'] = (keys, info) => {
    if (Array.isArray(keys)) {
      const data: any[] = keys.map((key) => {
        return key;
      });
      if (info.halfCheckedKeys) {
        info.halfCheckedKeys.forEach((key) => {
          data.push(key);
        });
      }
      setCheckedKeys(data);
    }
  };

  const addFormItems: FormItem[] = [
    {
      label: '角色名称',
      name: 'name',
      child: <Input placeholder="请输入角色名称" />,
      rules: [{ required: true }],
    },
    {
      label: '角色类型',
      name: 'type',
      child: (
        <Select
          placeholder="请选择"
          style={{ width: 120 }}
          options={[
            { label: '管理员', value: 'ADMIN' },
            { label: '业务员', value: 'USER' },
          ]}
        />
      ),
      rules: [{ required: true }],
    },
    {
      label: '菜单',
      name: 'menus',
      child: (
        <div className="role-tree">
          <Tree
            showLine
            selectable={false}
            checkable
            onCheck={onCheck}
            treeData={menus}
          />
        </div>
      ),
    },
    {
      label: '备注',
      name: 'remark',
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
      label: '角色名称',
      name: 'name',
      child: <Input placeholder="请输入角色名称" />,
      rules: [{ required: true }],
    },
    {
      label: '角色类型',
      name: 'type',
      child: (
        <Select
          placeholder="请选择"
          style={{ width: 120 }}
          options={[
            { label: '管理员', value: 'ADMIN' },
            { label: '业务员', value: 'USER' },
          ]}
        />
      ),
      rules: [{ required: true }],
    },
    {
      label: '菜单',
      name: 'menus',
      child: (
        <div className="role-tree">
          <Tree
            showLine
            selectable={false}
            checkable
            onCheck={onCheck}
            defaultCheckedKeys={checkedKeys}
            treeData={menus}
          />
        </div>
      ),
    },
    {
      label: '备注',
      name: 'remark',
      child: <TextArea />,
    },
  ];

  if (action === 'add') {
    return (
      <Modal open={open} title={'新增角色'} onCancel={onCancel}>
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
      <Modal open={open} title={'更新角色'} onCancel={onCancel}>
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
