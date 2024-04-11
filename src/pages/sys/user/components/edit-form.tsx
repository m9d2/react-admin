import { useEffect, useState } from "react";
import { App, Input, Radio, Select } from "antd";
import Modal from "@/components/modal.tsx";
import { Role, User } from "@/api";
import { constant } from "@/utils";
import Form, { FormItem } from "@/components/form.tsx";

export default function ModifyForm(props: {
  open: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  action?: string | "add" | "modify";
  row?: any;
}) {
  const { open, onOk, onCancel, action = "add", row } = props;
  const { message } = App.useApp();
  const [roles, setRoles] = useState<any[]>([]);

  const save = async (values: any) => {
    const resp = await User.Save(values);
    if (resp.code === constant.SUCCESS_CODE) {
      message.success("操作成功");
      onOk();
      return true;
    }
    return false;
  };

  const modify = async (values: any) => {
    const resp = await User.Modify(values);
    if (resp.code === constant.SUCCESS_CODE) {
      message.success("操作成功");
      onOk();
      return true;
    }
    return false;
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    const fetchRoles = async () => {
      if (roles.length === 0) {
        const resp: Response<any[]> = await Role.All();
        if (resp.data) {
            setRoles(resp.data);
        }
      }
    };
    fetchRoles();
  }, []);

  const addFormItems: FormItem[] = [
    {
      label: "用户名",
      name: "username",
      child: <Input />,
      rules: [{ required: true }],
    },
    {
      label: "姓名",
      name: "name",
      child: <Input />,
      rules: [{ required: true }],
    },
    {
      label: "密码",
      name: "password",
      child: <Input type="password" />,
      rules: [{ required: true }],
    },
    {
      label: "角色",
      name: "roleId",
      child: (
        <Select
          placeholder="请选择"
          style={{ width: 120 }}
          options={roles.map(role => ({ label: role.name, value: role.id }))}
        />
      ),
      rules: [{ required: true }],
    },
    {
      label: "手机号",
      name: "phone",
      child: <Input />,
    },
    {
      label: "性别",
      name: "gender",
      child: (
        <Radio.Group defaultValue={1}>
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
      ),
    },
  ];

  const modifyFormItems: FormItem[] = [
    {
        label: "id",
        name: "id",
        child: <Input />,
        rules: [{ required: true }],
        initialValue: row?.id,
        hidden: true,
      },
    {
      label: "用户名",
      name: "username",
      child: <Input />,
      rules: [{ required: true }],
      initialValue: row?.username,
    },
    {
      label: "姓名",
      name: "name",
      child: <Input />,
      rules: [{ required: true }],
      initialValue: row?.name,
    },
    {
      label: "角色",
      name: "roleId",
      child: (
        <Select
          placeholder="请选择"
          style={{ width: 120 }}
          options={roles.map(role => ({ label: role.name, value: role.id }))}
        />
      ),
      rules: [{ required: true }],
      initialValue: row?.roleId,
    },
    {
      label: "手机号",
      name: "phone",
      child: <Input />,
      initialValue: row?.phone,
    },
    {
      label: "性别",
      name: "gender",
      child: (
        <Radio.Group>
          <Radio value={"1"}>男</Radio>
          <Radio value={"2"}>女</Radio>
        </Radio.Group>
      ),
      initialValue: row?.gender,
    },
  ];

  if (action === "add") {
    return (
      <Modal open={open} title={"新增用户"} onCancel={onCancel}>
        <Form
          onFinish={save}
          onCancel={handleCancel}
          items={addFormItems}
        ></Form>
      </Modal>
    );
  }
  if (action === "modify") {
    return (
      <Modal open={open} title={"更新用户"} onCancel={onCancel} >
        <Form
          onFinish={modify}
          onCancel={handleCancel}
          items={modifyFormItems}
        ></Form>
      </Modal>
    );
  }
}
