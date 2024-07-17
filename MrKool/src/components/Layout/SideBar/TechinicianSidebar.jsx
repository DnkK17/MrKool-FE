import React from 'react';
import { Layout, Menu, Avatar, Typography, Divider } from 'antd';
import {  CalendarOutlined, SettingOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { Title, Text } = Typography;

const TechinicianSidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));


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
        <Avatar size={64} src={user.avatar} />
        <div className="user-info" style={{ marginLeft: '16px' }}>
          <Title level={4} style={{ color: 'white', textAlign: 'center' }}>{user.name}</Title>
          <Text className="white-text" style={{ textAlign: 'center' }}>{user.role}</Text>
        </div>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['/dashboard']}
        mode="inline"
        onClick={handleMenuClick}
        style={{ fontSize: '16px' }}
      >
        <Menu.Item key="/calendar" icon={<CalendarOutlined  style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Calendar
        </Menu.Item>
        <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu.Item key="/rer" icon={<BellOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Notifications
        </Menu.Item>
        <Menu.Item key="/rer" icon={<SettingOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
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

export default TechinicianSidebar;
