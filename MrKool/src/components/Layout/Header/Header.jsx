import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined, DownOutlined } from '@ant-design/icons';
import Logo from '../../../assets/images/Logo2.png';
import '../../../styles/header.css';
import { useSelector} from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const handleLogout = () => {
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Dịch vụ đã đặt
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="nav_wrapper">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <Menu mode="horizontal" className="navigation">
          <Menu.Item key="home" style={{ color: '#020286' }}>
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="services" style={{ color: '#020286' }}>
            <Link to="/service">Các dịch vụ</Link>
          </Menu.Item>
          <Menu.Item key="contact" style={{ color: '#020286' }}>
            <Link to="/contact">Liên hệ</Link>
          </Menu.Item>
        </Menu>
        <div className="nav_right">
          {/* <Badge count={2} className="cart_icon">
            <Button type="link" size="large">
              <Link to="/cart">
                <ShoppingCartOutlined />
              </Link>
            </Button>
          </Badge> */}
          {auth.user ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="link" size="large" className="user">
                {auth.user.name} <DownOutlined />
              </Button>
            </Dropdown>
          ) : (
            <Button type="link" size="large" className="user">
              <Link to="/login">
                <UserOutlined />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
