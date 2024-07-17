import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Tag } from 'antd';

const OrderDetail = ({ orderDetail }) => {
  if (!orderDetail) {
    return null;
  }

  const { Model, Station, Service, Technician, status } = orderDetail;

  return (
    <div>
      <h2>Chi tiết đơn hàng</h2>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Loại máy lạnh">{Model.title}</Descriptions.Item>
        <Descriptions.Item label="Dung tích">{Model.capacity}</Descriptions.Item>
        <Descriptions.Item label="Công suất">{Model.power}</Descriptions.Item>
        <Descriptions.Item label="Thợ sửa">{Technician}</Descriptions.Item>
        <Descriptions.Item label="Trạm dịch vụ">{Station}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={status === 1 ? 'green' : 'blue'}>
            {status === 1 ? 'Đã hoàn thành' : 'Đang tiến hành'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Dịch vụ">
          <ul>
            {Service.map((service, index) => (
              <li key={index}>
                {service.title} - {service.description}
              </li>
            ))}
          </ul>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

OrderDetail.propTypes = {
  orderDetail: PropTypes.shape({
    Model: PropTypes.shape({
      title: PropTypes.string.isRequired,
      capacity: PropTypes.string.isRequired,
      power: PropTypes.string.isRequired,
    }).isRequired,
    Station: PropTypes.shape({
      stationAddress: PropTypes.string.isRequired,
    }).isRequired,
    Service: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    Technician: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderDetail;
