import React, { useEffect } from 'react';
import { Button, Col, Row, Card, Table } from 'antd';
import "../../styles/home.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchService } from '../../redux/slice/serviceSlice';
import { fetchModels } from '../../redux/slice/modelSlice';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const serviceTableColumns = [
  {
    title: 'Service',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector(state => state.service.data);
  const serviceLoading = useSelector(state => state.service.loading);
  const serviceError = useSelector(state => state.service.error);
  const models = useSelector(state => state.model.models);
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
  const handleBooking = (model) => {
    localStorage.setItem('selectedModel', JSON.stringify(model));
    navigate('/booking');
  };
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

      {/* Models Section */}
      <div className="models-section">
        <Row justify="center" align="middle">
          <Col xs={24} className="text-center">
            <h2 className="section-title">Các loại model máy lạnh</h2>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center">
          {models.slice(0, 5).map((model, index) => (
            <Col xs={24} sm={12} md={6} key={index} className="model-col">
              <Card
                className="model-card"
                hoverable
                style={{ width: '100%' }}
                cover={<img alt={model.title} src={model.image} style={{ height: '150px', objectFit: 'cover' }} />}
                actions={[
                  <Button key="detail" type="primary" size="small" onClick={() => handleBooking(model)}>
                    Đặt dịch vụ
                  </Button>
                ]}
              >
                <Meta title={model.title} description={`Price: $${model.price.toFixed(2)}`} style={{ fontSize: '14px' }} />
              </Card>
            </Col>
          ))}
        </Row>
        <Button key="more" type="link" size="small" onClick={() => navigate('/model')}>
          See More
        </Button>
      </div>

      {/* Services Table Section */}
      <div className="services-table-section">
        <Row justify="center" align="middle">
          <Col xs={24} className="text-center">
            <h2 className="section-title">Bảng các loại dịch vụ</h2>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} md={18}>
            <Table
              columns={serviceTableColumns}
              dataSource={services}
              pagination={false}
              className="services-table"
              rowKey="serviceID"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
