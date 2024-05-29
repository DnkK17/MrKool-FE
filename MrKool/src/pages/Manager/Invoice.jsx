import React, { useState } from 'react';
import { Layout, Typography, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/dashboard.css';

const { Content } = Layout;
const { Title } = Typography;

const OrderSummary = () => {
  const [orderData, setOrderData] = useState([
    { month: 'January', orders: 30 },
    { month: 'February', orders: 20 },
    { month: 'March', orders: 27 },
    { month: 'April', orders: 24 },
    { month: 'May', orders: 35 },
    { month: 'June', orders: 40 },
    { month: 'July', orders: 28 },
    { month: 'August', orders: 32 },
    { month: 'September', orders: 30 },
    { month: 'October', orders: 25 },
    { month: 'November', orders: 29 },
    { month: 'December', orders: 33 },
  ]);

  return (
    <Content style={{ padding: '24px', minHeight: '360px' }}>
      <Title level={2}>Order Summary by Month</Title>
      <Card>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Content>
  );
};

export default OrderSummary;
