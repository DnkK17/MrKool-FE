import React from 'react';
import { Layout, Menu, Avatar, Typography, Divider } from 'antd';
import { TruckOutlined, MailOutlined, DollarOutlined, SettingOutlined, BellOutlined, LogoutOutlined, BuildOutlined, CloudOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleMenuClick = ({ key }) => {
    if (key === '/logout') {
      console.log('Logging out...');
      localStorage.removeItem('user'); // Clear user from localStorage
      navigate('/');
    } else {
      navigate(key);
    }
  };

  return (
    <Sider collapsible>
      <div className="dashboard-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        {user && (
          <div className="user-info">
            <Avatar size={64} src={user.avatar} />
            <div className="user-info" style={{ marginLeft: '16px' }}>
              <Title level={4} style={{ color: 'white', textAlign: 'center' }}>{user.name}</Title>
              <Text className="white-text" style={{ textAlign: 'center' }}>{user.role}</Text>
            </div>
          </div>
        )}

      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['/admin-dashboard']}
        mode="inline"
        onClick={handleMenuClick}
        style={{ fontSize: '16px' }}
      >
        <Menu.Item key="/admin-dashboard" icon={<DollarOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="/serviceList" icon={<TruckOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Manage Service
        </Menu.Item>
        <Menu.Item key="/account" icon={<MailOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Manage Account
        </Menu.Item>
        <Menu.Item key="/modelList" icon={<BuildOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Manage Model
        </Menu.Item>
        <Menu.Item key="/area" icon={<CloudOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Manage Area
        </Menu.Item>
        <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu.Item key="/noti" icon={<BellOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
          Notifications
        </Menu.Item>
        <Menu.Item key="/setting" icon={<SettingOutlined style={{ fontSize: '18px', marginRight: '8px' }} />} style={{ padding: '8px 16px', marginBottom: '8px' }}>
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

export default Sidebar;
