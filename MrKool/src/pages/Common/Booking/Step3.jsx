import React, { useState, useEffect } from 'react';
import { Form, Select, Button } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const Step3 = ({ modelType, price }) => {
  const [jobLocation, setJobLocation] = useState('');
  const [workDate, setWorkDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const step2Data = JSON.parse(localStorage.getItem('step2Data'));
    if (step2Data) {
      setJobLocation(step2Data.address);
      setWorkDate(step2Data.selectedDate);
      setStartTime(step2Data.selectedTime);
    }
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <h3>Step 3: Confirm and Pay</h3>
      <p><strong>Model Type:</strong> {modelType}</p>
      <p><strong>Job Location:</strong> {jobLocation}</p>
      <p><strong>Work Date:</strong> {workDate ? workDate.format('YYYY-MM-DD') : 'N/A'}</p>
      <p><strong>Start Time:</strong> {startTime ? startTime.format('HH:mm') : 'N/A'}</p>
      <p><strong>Price:</strong> ${price}</p>
      <Form layout="vertical">
        <Form.Item label="Payment Method">
          <Select
            value={paymentMethod}
            onChange={(value) => setPaymentMethod(value)}
            placeholder="Select a payment method"
          >
            <Option value="credit_card">Credit Card</Option>
            <Option value="paypal">PayPal</Option>
            <Option value="bank_transfer">Bank Transfer</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

Step3.propTypes = {
  modelType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Step3;
