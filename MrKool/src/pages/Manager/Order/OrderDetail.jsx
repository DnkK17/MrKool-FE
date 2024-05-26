import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Select } from 'antd';

const { Option } = Select;

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [technicians, setTechnicians] = useState([]);

  const simulatedOrder = {
    id: orderId,
    customerName: "John Doe",
    status: "Pending",
  };

  const simulatedTechnicians = [
    { id: 1, name: "Technician 1", specialization: "Electrical" },
    { id: 2, name: "Technician 2", specialization: "Plumbing" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setOrder(simulatedOrder);
    }, 500);

    setTimeout(() => {
      setTechnicians(simulatedTechnicians);
    }, 1000);
  }, [orderId]);

  const handleStatusChange = (value) => {
    setOrder({ ...order, status: value });
  };

  return (
    <div>
      <h2>Order Detail Page</h2>
      <p>Order ID: {orderId}</p>
      {order && (
        <div>
          <p>Customer Name: {order.customerName}</p>
          <p>Status: {order.status}</p>
          <Select defaultValue={order.status} onChange={handleStatusChange}>
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </div>
      )}

      <h3>Technicians:</h3>
      <ul>
        {technicians.map((technician) => (
          <li key={technician.id}>{technician.name} - {technician.specialization}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailPage;
