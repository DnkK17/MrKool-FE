import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, List, Descriptions, Row, Col, Radio, Button } from 'antd';
import "../../styles/checkout.css"
const CheckoutPage = () => {
  const location = useLocation();
  const bookingData = location.state;
  const navigate = useNavigate();

  const handlePayment = () => {
    // Add your payment handling logic here
    console.log('Processing payment...');
  };
  const handleBack = () => {
    navigate('/booking', { state: bookingData });
  };
  return (
    <div className="checkout-page">
      <h2 className='title'>Xác nhận thanh toán</h2>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Loại máy lạnh">
            <List
              bordered
              dataSource={bookingData.selectedModels}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <img src={item.conditionerModelImage} alt={item.title} style={{ width: '50px' }} />
                    }
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
              <Descriptions.Item label="Khu vực">
                {bookingData.station}
              </Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">
                <Radio.Group>
                  <Radio value="vnpay">VNPAY</Radio>
                </Radio.Group>
              </Descriptions.Item>
            </Descriptions>
            <div style={{ textAlign: 'center', marginTop: '16px'}}>
              <Button type="primary" onClick={handlePayment} style={{ marginRight: "10px"}}>
                Thanh toán
              </Button>
              <Button onClick={handleBack}>
                Back
              </Button>
            </div>
          </Card>
        </Col>

      </Row>
    </div>

  );
};

export default CheckoutPage;
