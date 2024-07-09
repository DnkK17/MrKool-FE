import React, { useEffect } from 'react';
import { Button, Col, Row, Card, Table } from 'antd';
import "../../styles/home.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchService } from '../../redux/slice/serviceSlice';
import { fetchModels } from '../../redux/slice/modelSlice';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const priceTableColumns = [
  {
    title: 'Model',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Price',
    dataIndex: `price`,
    key: 'price',
    render: (text) => `$${text}`,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.service.data);
  const serviceLoading = useSelector(state => state.service.loading);
  const serviceError = useSelector(state => state.service.error);
  const models = useSelector(state => state.model.models); // Access models from Redux store
  const modelLoading = useSelector(state => state.model.loading);
  const modelError = useSelector(state => state.model.error);

  useEffect(() => {
    dispatch(fetchService());
    dispatch(fetchModels());
  }, [dispatch]);

  useEffect(() => {
    console.log('Models:', models); 
  }, [models]); 

  if (serviceLoading || modelLoading) {
    return <div>Loading...</div>;
  }

  if (serviceError || modelError) {
    return <div>Error: {serviceError || modelError}</div>;
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Row align="middle" className="hero-content">
          <Col xs={24} md={12}>
            <h1 className="hero-title">Dịch Vụ Sửa Chữa và Bảo Trì Máy Lạnh Chuyên Nghiệp</h1>
            <p className="hero-subtitle">Nhanh chóng, Đáng tin cậy và Chi phí Hợp lý</p>
            <Button type="primary" size="large" className="hero-btn">Đặt Lịch Dịch Vụ Ngay Hôm Nay</Button>
            <Button type="default" size="large" className="hero-btn">Nhận Báo Giá Miễn Phí</Button>
          </Col>
        </Row>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <Row justify="center" align="middle">
          <Col xs={24} className="text-center">
            <h2 className="section-title">Các loại dịch vụ</h2>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center">
          {data.slice(0, 5).map((service, index) => (
            <Col xs={24} sm={12} md={6} key={index} className="service-col">
              <Card
                className="service-card"
                hoverable
                style={{ width: '100%' }}
                cover={<img alt={service.title} src={service.imageUrl} style={{ height: '150px', objectFit: 'cover' }} />}
                actions={[
                  <Button key="detail" type="primary" size="small" onClick={() => navigate(`/service/${service.serviceID}`)}>
                    Xem chi tiết
                  </Button>
                ]}
              >
                <Meta title={service.title} description={service.description} style={{ fontSize: '14px' }} />
              </Card>
            </Col>
          ))}
        </Row>
        <Button key="more" type="link" size="small" onClick={() => navigate('/service')}>
          See More
        </Button>
      </div>
      <div className="price-table-section">
        <Row justify="center" align="middle">
          <Col xs={24} className="text-center">
            <h2 className="section-title">Bảng giá</h2>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} md={18}>
            <Table
              columns={priceTableColumns}
              dataSource={models}
              pagination={false}
              className="price-table"
              rowKey="serviceID" 
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
