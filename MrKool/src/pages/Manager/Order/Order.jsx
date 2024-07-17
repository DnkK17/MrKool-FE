import React, { useEffect } from 'react';
import { Button, Table, Spin, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrderAsync } from '../../../redux/slice/orderSlice';
import { format } from 'date-fns'; // Import format from date-fns

// Import locale data for Vietnamese
import vi from 'date-fns/locale/vi';

const ViewOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteOrderAsync(id));
  };

  const columns = [
    { title: 'Index', render: (text, record, index) => index + 1 },
    { title: 'Customer', dataIndex: 'customerID', key: 'customerID' },
    { title: 'Detail', dataIndex: 'detail', key: 'detail' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time',
      render: (time) => (
        <span>{format(new Date(time), 'HH:mm', { locale: vi })}</span>
      ),
    },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusText = status === 0 ? 'In Progress' : status === 1 ? 'Completed' : 'Unknown';
        const statusColor = status === 1 ? 'green' : 'blue';
        return <Tag color={statusColor}>{statusText}</Tag>
      },
    },
    {
      title: 'Technician',
      dataIndex: 'technician',
      key: 'technician',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Link to={`/order/${record.id}`}>View Details</Link>
          <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const pagination = {
    pageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '15', '20'],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/order/new">Add New Order</Link>
      </Button>
      <Table dataSource={orders} columns={columns} rowKey="id" pagination={pagination} />
    </div>
  );
};

export default ViewOrderPage;
