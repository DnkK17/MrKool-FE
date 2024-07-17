import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, assignTechnician, selectOrders } from '../../redux/slice/orderSlice';
import { Card, Button, Space, Divider, message, Pagination, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

const OrdersList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const user = JSON.parse(localStorage.getItem('user'));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleAssignTechnician = (orderId) => {
    if (!user) {
      message.error('Đăng nhập để nhận việc');
      return;
    }

    const order = orders.find(order => order.id === orderId);
    if (order.technician) {
      message.warning('TVị trí này đã được nhận.');
      return;
    }

    dispatch(assignTechnician({ id: orderId, technician: user.name }))
      .unwrap()
      .then((updatedOrder) => {
        message.success(`Đã gán kỹ thuật viên ${updatedOrder.technician} thành công`);
      })
      .catch(() => {
        message.error('Không thể gán kỹ thuật viên.');
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageSize = 3; // 9 cards per page (3 cards per row, 3 rows)
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="orders-list">
      <Space direction="vertical" style={{ width: '100%' , marginTop:'10px'}} size="large">
        <Row gutter={[16, 16]}>
          {currentOrders.map(order => (
            <Col span={8} key={order.id}>
              <Card>
                <Meta
                  title={`Đơn hàng: ${order.id}`}
                  description={
                    <div>
                      <p><strong>Trạng thái:</strong> {order.status === 0 ? 'Pending' : 'Completed'}</p>
                      <p><strong>Vấn đề:</strong> {order.request.description}</p>
                      <p><strong>Địa chỉ:</strong> {order.request.requestAddress}</p>
                      <p><strong>Ngày:</strong> {order.request.date}</p>
                      <p><strong>Thông tin khách hàng:</strong> {order.request.Customer.name}</p>
                      <Divider />
                      <h4>Chi tiết:</h4>
                      <p><strong>Loại máy:</strong> {order.orderDetail.Model.title}</p>
                      <p><strong>Công suất làm lạnh:</strong> {order.orderDetail.Model.capacity}</p>
                      <p><strong>Công suất điện:</strong> {order.orderDetail.Model.power}</p>
                      <p><strong>Trạm dịch vụ:</strong> {order.orderDetail.Station}</p>
                      <Divider />
                      <h4>Dịch vụ:</h4>
                      <ul>
                        {order.orderDetail.Service.map((service, index) => (
                          <li key={index}>
                            <strong>{service.title}</strong>: {service.description}
                          </li>
                        ))}
                      </ul>
                      <Divider />
                      {!order.technician && (
                        <Button
                          type="primary"
                          onClick={() => handleAssignTechnician(order.id)}
                          icon={<UserOutlined />}
                        >
                         Gán công việc cho {user.name}
                        </Button>
                      )}
                      {order.technician && (
                        <p><strong>Đã gán cho</strong> {order.technician}</p>
                      )}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={orders.length}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </Space>
    </div>
  );
};

export default OrdersList;
