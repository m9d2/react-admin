import { Space } from 'antd';
import { Button } from '@/components';
import Card from '@/components/card';
import { EditOutlined } from '@ant-design/icons';

const Index = () => {
  const title = <span>标题</span>;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title={title} style={{ height: 300 }}>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
      </Card>
      <Button
        icon={<EditOutlined />}
        type="secondary"
        onClick={() => alert('Primary Button')}
      >
        Primary Button
      </Button>
    </Space>
  );
};

export default Index;
