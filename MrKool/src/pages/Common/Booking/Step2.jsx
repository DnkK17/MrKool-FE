import React, { useState } from 'react';
import { Button, DatePicker, Input, TimePicker } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const Step2 = ({ onNext }) => {
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);



  return (
    <div className="step-container">
      <h2>Step 2: Fill Address and Choose Date & Time</h2>
      <div style={{ marginBottom: 20 }}>
        <label>Address:</label>
        <TextArea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          placeholder="Enter your address"
          style={{ marginBottom: 10 }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label>Date:</label>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          style={{ marginRight: 10 }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label>Time:</label>
        <TimePicker
          value={selectedTime}
          onChange={(time) => setSelectedTime(time)}
          format="HH:mm"
          style={{ marginRight: 10 }}
        />
      </div>
     
    </div>
  );
};

Step2.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default Step2;
