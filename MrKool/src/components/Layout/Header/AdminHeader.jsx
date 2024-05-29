import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const HeaderComponent = () => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="header-content">
        <Title level={2} style={{ margin: '16px 24px', color: 'white' }}>Dashboard</Title>
      </div>
    </Header>
  );
};

export default HeaderComponent;