import React from 'react';
import PropTypes from 'prop-types';

const RequestDetail = ({ request }) => {
  if (!request) {
    return <div>Loading...</div>;
  }

  const { date, description, requestAddress, status, Model, Service, Station, Customer } = request;

  return (
    <div>
      <p><strong>Ngày bắt đầu:</strong> {date}</p>
      <p><strong>Vấn đề:</strong> {description}</p>
      <p><strong>Địa chỉ:</strong> {requestAddress}</p>
      <p><strong>Trạng thái:</strong> {status === 0 ? 'Chưa duyệt' : 'Đã duyệt'}</p>
      <p><strong>Loại máy lạnh:</strong> {Model && Model.title}</p>
      <p><strong>Dịch vụ:</strong> {Service && Service.map((service, index) => (
        <span key={index}>{service.title}, </span>
      ))}</p>
      <p><strong>Trạm dịch vụ:</strong> {Station && Station.stationAddress}</p>
      <p><strong>Tên khách hàng:</strong> {Customer && Customer.name}</p>
      <p><strong>Số điện thoại:</strong> {Customer && Customer.phone}</p>
    </div>
  );
};

RequestDetail.propTypes = {
  request: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    requestAddress: PropTypes.string,
    status: PropTypes.number,
    Model: PropTypes.shape({
      title: PropTypes.string
    }),
    Service: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string
    })),
    Station: PropTypes.shape({
      stationAddress: PropTypes.string
    }),
    Customer: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    })
  })
};

export default RequestDetail;
