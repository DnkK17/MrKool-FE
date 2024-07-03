import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Spin } from 'antd';
import { fetchServiceById } from '../../redux/slice/serviceSlice';
import '../../styles/serviceDetail.css';

const ServiceDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const service = useSelector((state) => state.service.data.find(service => service.serviceID === parseInt(id)));
  const loading = useSelector((state) => state.service.loading);
  const error = useSelector((state) => state.service.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

  const handleBooking = () => {
    navigate('/booking');
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!service || !service.serviceID || !service.description) {
    return <div>Service details not available</div>;
  }

  return (
    <div className="service-detail-container">
      <Card
        hoverable
        cover={<img alt={service.description} src={service.imageUrl} />}
        className="service-card"
      >
        <h1>{service.title || 'Untitled'}</h1>
        <p>{service.description}</p>
        <Button type="primary" onClick={handleBooking}>
          Booking Service
        </Button>
      </Card>
    </div>
  );
};

export default ServiceDetail;
