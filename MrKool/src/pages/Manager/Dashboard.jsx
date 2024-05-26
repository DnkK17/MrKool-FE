// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import { Layout, Menu, Card, Row, Col, Avatar, Button, List, Progress, Typography } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, DollarOutlined, LineChartOutlined, DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LineChart from '../../components/LineChart/LineChart';
import StatBox from '../../components/StatBox/StaBox';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const data = [
  { id: '01e4dsa', name: 'johndoe', date: '2021-09-01', amount: '$43.95' },
  { id: '0315dsaa', name: 'jackdower', date: '2022-04-01', amount: '$133.45' },
  { id: '01e4dsa', name: 'aberdjohnny', date: '2021-09-01', amount: '$43.95' }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo">
          <Avatar size="large" src="https://i.pravatar.cc/150?img=3" />
          <div className="user-info">
            <Title level={4} style={{ color: 'white' }}>Ed Roh</Title>
            <Text className="white-text">VP Fancy Admin</Text>
          </div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={({ key }) => navigate(key)}>
          <Menu.Item key="/dashboard" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/team" icon={<TeamOutlined />}>
            Manage Team
          </Menu.Item>
          <Menu.Item key="/contact" icon={<MailOutlined />}>
            Contacts Information
          </Menu.Item>
          <Menu.Item key="/order" icon={<DollarOutlined />}>
            Invoices Balances
          </Menu.Item>
          <Menu.Item key="/profile" icon={<LineChartOutlined />}>
            Profile Form
          </Menu.Item>
          <Menu.Item key="/orders" icon={<LineChartOutlined />}>
            View Order
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
                <StatBox
                  title="32,441"
                  subtitle="New Clients"
                  progress={0.30}
                  increase="+5%"
                />            </Col>
              <Col span={6}>
                <StatBox
                  title="32,441"
                  subtitle="New Clients"
                  progress={0.30}
                  increase="+5%"
                />              </Col>
              <Col span={6}>
                <StatBox
                  title="32,441"
                  subtitle="New Clients"
                  progress={0.30}
                  increase="+5%"
                />              </Col>
              <Col span={6}>
                <StatBox
                  title="32,441"
                  subtitle="New Clients"
                  progress={0.30}
                  increase="+5%"
                />
              </Col>
              <Col span={14}>
                <Card title={'Revenue Generated'} bordered={false} style={{ marginTop: 16 }}>
                  <LineChart isDashboard={true} />
                  <Button type="primary" style={{ marginTop: 16 }} icon={<DownloadOutlined />}>
                Download Reports
              </Button>
                </Card></Col>

            
              <Col span={10}>
                <Card title="Recent Transactions" bordered={false} style={{ marginTop: 16 }}>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={<a href="https://ant.design">{item.id}</a>}
                          description={`${item.name} - ${item.date}`}
                        />
                        <div className='color'>{item.amount}</div>
                      </List.Item>
                    )}
                  />
                </Card></Col>

            </Row>


          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
