import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/Layout/Header/AdminHeader'
import { Content } from 'antd/es/layout/layout';
import TechinicianSidebar from '../components/Layout/SideBar/TechinicianSidebar';
const TechinicianLayout = () => {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <TechinicianSidebar />
        <Layout className="site-layout">
          <AdminHeader/>
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div >
  );
};

export default TechinicianLayout;
