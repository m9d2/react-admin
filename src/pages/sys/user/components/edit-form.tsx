import React from "react";
import { Col, Form, Input, Modal, Row, Space, Switch } from "antd";

export default function AddForm(props: {
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOk: () => void;
}) {
  const { open, setOpen } = props;

  const handleOk = () => {
    setOpen(false);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  const Title = () => {
    return (
        <div style={{borderBottom: '1px solid rgba(5, 5, 5, 0.06)', marginBottom: '20px', paddingBottom: '10px'}}>
            <span>新增用户</span>
        </div>
    )
  }
  return (
    <Modal
      open={open}
      title={<Title/>}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <Form>
        <Row>
          <Col span={10}>
            <Form.Item label="用户名">
              <Input />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="姓名">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label="用户名">
              <Input />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="姓名">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
