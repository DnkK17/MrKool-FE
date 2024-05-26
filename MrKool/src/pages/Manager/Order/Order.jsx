import React from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';

const ViewOrderPage = () => {
  const data = [
    { id: 1, customer: 'John Doe', total: 100 },
    { id: 2, customer: 'Jane Smith', total: 150 },
  ];

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link to={`/order/${record.id}`}>View Details</Link>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/order/new">Add New Order</Link>
      </Button>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default ViewOrderPage;
