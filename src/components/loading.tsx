import { Spin } from 'antd';
import React from 'react';

const loading = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
};
const App: React.FC = () => {
    return (
        <div style={loading}>
            <Spin size="large" delay={200} />
        </div>
    );
};

export default App;
