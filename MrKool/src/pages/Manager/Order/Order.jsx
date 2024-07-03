import React, { useEffect } from 'react';
import { Button, Table, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, deleteOrder, clearError } from '../../redux/slice/orderSlice';
const ViewOrderPage = () => {
  const dispatch = useDispatch();
  const { data: orders, loading, error } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id)).then(() => {
      dispatch(getOrder());
    });
  };

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
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

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/order/new">Add New Order</Link>
      </Button>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default ViewOrderPage;
