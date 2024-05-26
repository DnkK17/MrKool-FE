// src/Dashboard.js
import React from 'react';
import { Layout, Menu, Card, Row, Col, Avatar, Button, List, Progress, Typography } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, DollarOutlined, LineChartOutlined, DownloadOutlined } from '@ant-design/icons';
import '../../styles/dashboard.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const data = [
  { id: '01e4dsa', name: 'johndoe', date: '2021-09-01', amount: '$43.95' },
  { id: '0315dsaa', name: 'jackdower', date: '2022-04-01', amount: '$133.45' },
  { id: '01e4dsa', name: 'aberdjohnny', date: '2021-09-01', amount: '$43.95' }
];

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo">
          <Avatar size="large" src="https://i.pravatar.cc/150?img=3" />
          <div className="user-info">
            <Title level={4} style={{color: 'white'}}>Ed Roh</Title>
            <Text className="white-text">VP Fancy Admin</Text>
          </div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            Manage Team
          </Menu.Item>
          <Menu.Item key="3" icon={<MailOutlined />}>
            Contacts Information
          </Menu.Item>
          <Menu.Item key="4" icon={<DollarOutlined />}>
            Invoices Balances
          </Menu.Item>
          <Menu.Item key="5" icon={<LineChartOutlined />}>
            Profile Form
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="header-content">
            <Title level={2} style={{ margin: '16px 24px', color: 'white' }}>Dashboard</Title>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card title={<span className="card-title">Emails Sent</span>} bordered={false}>
                  <p>12,361</p>
                  <Progress percent={14} status="active" />
                </Card>
              </Col>
              <Col span={6}>
                <Card title={<span className="card-title">Sales Obtained</span>} bordered={false}>
                  <p>431,225</p>
                  <Progress percent={21} status="active" />
                </Card>
              </Col>
              <Col span={6}>
                <Card title={<span className="card-title">New Clients</span>} bordered={false}>
                  <p>32,441</p>
                  <Progress percent={5} status="active" />
                </Card>
              </Col>
              <Col span={6}>
                <Card title={<span className="card-title">Traffic Received</span>} bordered={false}>
                  <p>1,325,134</p>
                  <Progress percent={43} status="active" />
                </Card>
              </Col>
            </Row>
            <Card title={<span className="card-title">Revenue Generated</span>} bordered={false} style={{ marginTop: 16 }}>
              <p>$59,342.32</p>
              {/* A placeholder for a potential chart */}
              <div className="revenue-chart-placeholder">
                <p>Chart Placeholder</p>
              </div>
            </Card>
            <Button type="primary" style={{ marginTop: 16 }} icon={<DownloadOutlined />}>
              Download Reports
            </Button>
            <Card title={<span className="card-title">Recent Transactions</span>} bordered={false} style={{ marginTop: 16 }}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.id}</a>}
                      description={`${item.name} - ${item.date}`}
                    />
                    <div>{item.amount}</div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
