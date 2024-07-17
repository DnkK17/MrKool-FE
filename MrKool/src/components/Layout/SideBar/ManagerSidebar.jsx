import React from 'react';
import { Layout, Menu, Avatar, Typography, Divider } from 'antd';
import {FormOutlined, ContainerOutlined, DollarOutlined, SettingOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { Title, Text } = Typography;

const ManagerSidebar = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === '/logout') {
      console.log('Logging out...');
      sessionStorage.clear();
      navigate('/');
    } else {
      navigate(key);
    }
  };

  return (
    <Sider collapsible>
      <div className="dashboard-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <Avatar size={64} src="https://static.vecteezy.com/system/resources/previews/004/607/791/non_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg" />
        <div className="user-info" style={{ marginLeft: '16px' }}>
          <Title level={4} style={{ color: 'white', textAlign: 'center' }}>Manager</Title>
          <Text className="white-text" style={{ textAlign: 'center' }}>Manager</Text>
        </div>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['/dashboard']}
        mode="inline"
        onClick={handleMenuClick}
        style={{ fontSize: '16px' }}
      >
        <Menu.Item key="/station" icon={<DollarOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Stations
        </Menu.Item>
        <Menu.Item key="/requestList" icon={<FormOutlined  style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Manage Request
        </Menu.Item>
        <Menu.Item key="/order" icon={<ContainerOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Manage Order
        </Menu.Item>
        <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu.Item key="/fd" icon={<BellOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Notifications
        </Menu.Item>
        <Menu.Item key="/fdfs" icon={<SettingOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Settings
        </Menu.Item>
        <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu.Item key="/logout" icon={<LogoutOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default ManagerSidebar;
