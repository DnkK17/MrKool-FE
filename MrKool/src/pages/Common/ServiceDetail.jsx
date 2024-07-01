// ServiceDetail.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Spin } from 'antd';
import { fetchProduct } from '../../redux/slice/productSlice'; 
import '../../styles/serviceDetail.css';

const ServiceDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: service, loading } = useSelector((state) => state.product); 

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const handleBooking = () => {
    navigate('/booking');
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="service-detail-container">
      <Card
        hoverable
        cover={<img alt={service.title} src={service.imageUrl} />}
        className="service-card"
      >
        <h1>{service.serviceName}</h1>
        <p>{service.description}</p>
        <Button type="primary" onClick={handleBooking}>
          Booking Service
        </Button>
      </Card>
    </div>
  );
};

export default ServiceDetail;
