import { Space } from 'antd';
import { Button } from '@/components';
import Card from '@/components/card';

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
      <Button title="hello"></Button>
    </Space>
  );
};

export default Index;
