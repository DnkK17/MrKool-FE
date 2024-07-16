import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, List, Descriptions, Row, Col, Radio, Button, message, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createPayment } from '../../redux/slice/paymentSlice';
import "../../styles/checkout.css";

const CheckoutPage = () => {
  const location = useLocation();
  const bookingData = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentStatus = useSelector(state => state.payment.paymentStatus);
  const [orderInfo, setOrderInfo] = React.useState("");

  const handlePayment = () => {
    dispatch(createPayment({ ...bookingData, orderInfo }))
      .unwrap()
      .then((result) => {
        console.log('Payment successful:', result);
        message.success('Thanh toán thành công');
        navigate('/success');
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const validationErrors = error.response.data.errors;
          if (validationErrors && validationErrors.OrderInfo) {
            message.error(validationErrors.OrderInfo[0]);
          } else {
            message.error('Đã xảy ra lỗi khi thanh toán');
          }
        } else {
          console.error('Payment failed:', error);
          message.error('Đã xảy ra lỗi khi thanh toán');
        }
      });
  };

  const handleBack = () => {
    navigate('/booking', { state: bookingData });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleOrderInfoChange = (e) => {
    setOrderInfo(e.target.value);
  };

  return (
    <div className="checkout-page">
      <h2 className='title'>Xác nhận thanh toán</h2>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Loại máy lạnh">
            <List
              bordered
              dataSource={[bookingData.selectedModel]}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={item.title}
                    description={<img src={item.image} alt={item.title} style={{ width: '50px' }} />}
                  />
                </List.Item>
              )}
            />
          </Card>
          <Card title="Dịch vụ đã chọn">
            <List
              bordered
              dataSource={bookingData.selectedServices}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={item.description}
                    description={formatPrice(item.price)}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Chi tiết thanh toán" bordered={false}>
            <Descriptions column={1} bordered={false}>
              <Descriptions.Item label="Họ tên">{bookingData.fullName}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{bookingData.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{bookingData.address}</Descriptions.Item>
              <Descriptions.Item label="Ngày làm">{bookingData.date}</Descriptions.Item>
              <Descriptions.Item label="Thời gian">{bookingData.time}</Descriptions.Item>
              <Descriptions.Item label="Khu vực">{bookingData.station}</Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">
                <Radio.Group>
                  <Radio value="vnpay">VNPAY</Radio>
                </Radio.Group>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng giá">
                {formatPrice(bookingData.totalPrice)}
              </Descriptions.Item>
            </Descriptions>
            <Form.Item
              label="Thông tin chuyển khoản"
              name="orderInfo"
              rules={[{ required: true, message: 'Nhập thông tin chuyển khoản' }]}
            >
              <Input.TextArea rows={4} placeholder="Nhập thông tin chuyển khoản" value={orderInfo} onChange={handleOrderInfoChange} />
            </Form.Item>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Button type="primary" onClick={handlePayment} style={{ marginRight: "10px" }}>
                Thanh toán
              </Button>
              <Button onClick={handleBack}>
                Quay lại
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
