import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Layout/SideBar/Sidebar';
import AdminHeader from '../components/Layout/Header/AdminHeader'
import { Content } from 'antd/es/layout/layout';
const AdminLayout = () => {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <AdminHeader />
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div >
  );
};

export default AdminLayout;
