import { Menu, Role } from '@/service';
import { Form, FormItem, Modal } from '@/components';
import { constant } from '@/utils';
import { App, Input, Select, Tree, TreeProps } from 'antd';
import { useEffect, useState } from 'react';
import { Response } from '@/service/type.ts';

const { TextArea } = Input;

export type Action = 'add' | 'modify';
export default function ModifyForm(props: {
  open: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  action?: Action;
  row?: any;
}) {
  const { open, onOk, onCancel, action = 'add', row } = props;
  const { message } = App.useApp();
  const [menus, setMenus] = useState<any[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [parents, setParents] = useState<any[]>([]);

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
    values = { ...values, menuIds: [...checkedKeys, ...parents] };
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
    console.log('edit useEffect');
    if (open) {
      let menus: any[] = [];
      const fetchMenus = async () => {
        const resp: Response<any[]> = await Menu.MyMenus();
        if (resp.data) {
          menus = resp.data.map((menu) => {
            return {
              title: menu.name,
              key: menu.id,
              children: menu.child.map((child: any) => {
                return { title: child.name, key: child.id };
              }),
            };
          });
          setMenus(menus);
        }
      };

      (async () => {
        await fetchMenus();
        if (row) {
          const ids = row.menuIds.filter(
            (menuId: any) => !menus.find((menu) => menu.key === menuId),
          );
          setCheckedKeys(ids);
        }
      })();

      return () => {
        setParents([]);
      };
    }
  }, [open]);

  const onCheck: TreeProps['onCheck'] = (keys, info) => {
    if (Array.isArray(keys)) {
      const data: any[] = keys.map((key) => {
        return key;
      });
      if (info.halfCheckedKeys) {
        setParents(info.halfCheckedKeys);
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
            checkedKeys={checkedKeys}
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
