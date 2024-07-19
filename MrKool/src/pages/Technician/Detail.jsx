import React from 'react';
import { Descriptions, Tag } from 'antd';

const OrderDetailPage = ({ order }) => {
  if (!order) return null;

  return (
    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
      <h1>{order.title}</h1>
      <p><strong>Detail:</strong> {order.detail}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Status:</strong> {order.status === true ? 'Not yet' : 'Payment Already'}</p>
      <img src={order.image} alt="Order Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
    </div>
  );
};

export default OrderDetailPage;
