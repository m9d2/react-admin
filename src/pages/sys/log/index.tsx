import { Space } from 'antd';
import { Button } from '@/components';
import Card from '@/components/card';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Index = () => {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const title = <span>标题</span>;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title={title} style={{ height: 300 }}>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <Space direction="horizontal" style={{ width: '100%' }}>
          <Button
            loading={loading}
            icon={<EditOutlined />}
            type="primary"
            onClick={onClick}
          >
            Primary Button
          </Button>
          <Button
            loading={loading}
            icon={<EditOutlined />}
            type="secondary"
            onClick={onClick}
          >
            Secondary Button
          </Button>
          <Button
            loading={loading}
            icon={<EditOutlined />}
            type="danger"
            onClick={onClick}
          >
            Danger Button
          </Button>
        </Space>
      </Card>
    </Space>
  );
};

export default Index;
