import React from 'react';
import {Spin} from 'antd';

const loading = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
};
const App: React.FC = () => {
    return (
        <div style={loading}>
            <Spin size="large" delay={200}/>
        </div>
    );
};

export default App;