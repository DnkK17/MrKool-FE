import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '../../../assets/images/Logo2.png';
import '../../../styles/header.css';


const Header = () => {
  return (
    <header className="header">
      <div className="nav_wrapper">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <Menu mode="horizontal" className="navigation">
          <Menu.Item key="home" style={{color: ' #020286'}} >
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="services"  style={{color: ' #020286'}}>
            <Link to="/service">Các dịch vụ</Link>
          </Menu.Item>
          <Menu.Item key="contact"  style={{color: ' #020286'}}>
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
          <Button type="link" size="large" className="user">
            <Link to="/login">
              <UserOutlined />
            </Link>
          </Button>
  
        </div>
      </div>
    </header>
  );
};

export default Header;