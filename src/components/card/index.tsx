import { Card } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';

interface CardProps {
  title?: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

const Index: React.FC<CardProps> = ({ title, children, extra, style }) => {
  const titleElement = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '4px',
          height: '14px',
          backgroundColor: '#1890ff',
          marginRight: '8px',
          borderRadius: '2px',
        }}
      />
      {title}
    </div>
  );
  return (
    <Card title={titleElement} extra={extra} style={style}>
      {children}
    </Card>
  );
};

export default Index;
