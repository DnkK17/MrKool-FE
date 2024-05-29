import React, { useEffect } from 'react';
import { Button, Col, Row, Card, Table } from 'antd';
import "../../styles/home.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/slice/productSlice';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const priceTableColumns = [
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
];

const priceTableData = [
  {
    key: '1',
    service: 'AC Repair',
    price: '$50 - $150',
  },
  {
    key: '2',
    service: 'AC Installation',
    price: '$300 - $700',
  },
  {
    key: '3',
    service: 'Maintenance',
    price: '$80 - $120',
  },
];


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.product);
  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch])
  console.log(data);
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Row align="middle" className="hero-content">
          <Col xs={24} md={12}>
            <h1 className="hero-title">Expert Air Conditioner Repair & Maintenance</h1>
            <p className="hero-subtitle">Fast, Reliable, and Affordable Services</p>
            <Button type="primary" size="large" className="hero-btn">Schedule Your Service Today</Button>
            <Button type="default" size="large" className="hero-btn">Get a Free Quote</Button>
          </Col>
        </Row>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <Row justify="center" align="middle">
          <Col xs={24} className="text-center">
            <h2 className="section-title">Our Services</h2>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center">
          {data.data.filter((service) => service.bestSeller).map((service, index) => (
            <Col xs={24} sm={12} md={6} key={index} className="service-col">
              <Card
                className="service-card"
                hoverable
                style={{ width: '100%' }}
                cover={<img alt={service.serviceName} src={service.imageUrl} style={{ height: '150px', objectFit: 'cover' }} />}
                actions={[
                  <Button key="detail" type="primary" size="small" onClick={() => navigate(`/service/${service.serviceID}`)}>
                    View Detail
                  </Button>

                ]}
              >
                <Meta title={service.serviceName} description={service.description} style={{ fontSize: '14px' }} />
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
            <h2 className="section-title">Price Table</h2>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} md={18}>
            <Table
              columns={priceTableColumns}
              dataSource={priceTableData}
              pagination={false}
              className="price-table"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;