import { Card, Col, Row } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Row gutter={[15, 15]}>
    {new Array(4).fill(0).map((_, index) => {
      const key = `col-${index}`;
      return (
        <Col
          key={key}
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '50%' }}
          lg={{ flex: '25%' }}
          xl={{ flex: '25%' }}
        >
          <Card>Col {index}</Card>
        </Col>
      );
    })}
  </Row>
);

export default App;
