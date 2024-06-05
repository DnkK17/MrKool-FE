import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Pagination, Spin, Input, Slider, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchProduct, setCurrentPage, setPageSize, setFilter } from '../../redux/slice/productSlice';
import "../../styles/service.css";

const { Search } = Input;

const OurServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, currentPage, totalPages, pageSize } = useSelector(
    (state) => state.product
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(null);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch, currentPage, pageSize, searchTerm, priceRange]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handlePageSizeChange = (_, size) => {
    dispatch(setPageSize(size));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    dispatch(setFilter({ searchTerm: value, priceRange }));
  };

  
  const handlePriceChange = (value) => {
    setPriceRange(value);
    dispatch(setFilter({ searchTerm, priceRange: value }));
  };

  const handleViewDetail = (id) => {
    navigate(`/service/${id}`);
  };
  return (
    <div className="our-services-container">
      <h2>Our Services</h2>
      <div className="services-content">
        <div className="sidebar">
          <Search placeholder="Search service by name" onSearch={handleSearch} style={{ width: '100%', marginBottom: 20 }} />
          <div style={{ marginBottom: 20 }}>
            <h4>Price range</h4>
            <Slider
              range
              min={5}
              max={25}
              step={0.1}
              defaultValue={priceRange}
              onChange={handlePriceChange}
              marks={{
                5: '€5,00',
                25: '€25,00',
              }}
              tooltipVisible
            />
          </div>
        </div>
        <div className="main-content">
          <Spin spinning={loading}>
            <Row gutter={[16, 16]}>
              {data.map((service) => (
                <Col key={service.id} xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    cover={<img alt={service.serviceName} src={service.imageUrl} className="card-image" />}
                    className="service-card"
                  >
                    <div className="card-content">
                      <h3>{service.serviceName}</h3>
                      <p>${service.price}</p>
                      <Button type="primary" onClick={() => handleViewDetail(service.serviceID)}>
                        Booking
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
              style={{ marginTop: 20 }}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
