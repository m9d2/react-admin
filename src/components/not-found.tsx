import { Result } from 'antd';

const NotFound = () => {
  return (
    <Result status="404" title="404" subTitle="抱歉，您访问的页面不存在." />
  );
};

export default NotFound;
