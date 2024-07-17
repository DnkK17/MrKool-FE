import React, { useEffect, useState } from 'react';
import { Button, Table, Spin, Tag, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrder} from '../../../redux/slice/orderSlice';
import OrderDetail from './OrderDetail'; // Import modal component

const ViewOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.order);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const handleShowDetail = (order) => {
    setSelectedOrderDetail(order);
  };

  const handleCloseModal = () => {
    setSelectedOrderDetail(null);
  };

  const columns = [
    { title: 'Index', render: (text, record, index) => index + 1 },
    {
      title: 'Vấn đề',
      dataIndex: 'request.description',
      key: 'requestDescription',
      render: (text, record) => record.request.description,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'request.requestAddress',
      key: 'requestAddress',
      render: (text, record) => record.request.requestAddress,
    },
    {
      title: 'Ngày làm việc',
      dataIndex: 'request.date',
      key: 'requestDate',
      render: (text, record) => record.request.date,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'request.Customer.name',
      key: 'customerName',
      render: (text, record) => record.request.Customer.name,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'request.Customer.phone',
      key: 'customerPhone',
      render: (text, record) => record.request.Customer.phone,
    },
    {
      title: 'Kỹ thuật viên',
      dataIndex: 'technician',
      key: 'technician',
      render: (text, record) => record.technician,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusText = status === 0 ? 'Đang tiến hành' : status === 1 ? 'Đã hoàn thành' : 'Unknown';
        const statusColor = status === 1 ? 'green' : 'blue';
        return <Tag color={statusColor}>{statusText}</Tag>;
      },
    },

    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <>
          <Button style={{ marginLeft: '8px' }} onClick={() => handleShowDetail(record)}>
            Chi tiết
          </Button>
          <Button style={{ marginLeft: '8px' }} danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
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
    <h1>Danh sách đơn hàng</h1>
    <Table dataSource={orders} columns={columns} rowKey="id" pagination={pagination} />

    <Modal

      visible={selectedOrderDetail !== null}
      onCancel={handleCloseModal}
      footer={null}
    >
      {selectedOrderDetail && <OrderDetail orderDetail={selectedOrderDetail.orderDetail} />}
    </Modal>
  </div>
  );
};

export default ViewOrderPage;

