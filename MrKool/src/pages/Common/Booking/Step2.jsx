import React, { useState } from 'react';
import { DatePicker, Input, TimePicker } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const Step2 = ({ onNext }) => {
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = () => {
    const data = {
      address,
      selectedDate,
      selectedTime,
    };
    onNext(data);
  };

  return (
    <div className="step-container">
      <h2 style={{ margin: 20 }}>Step 2: Fill Address and Choose Date & Time</h2>
      <div style={{ margin: 20 }}>
        <label>Address:</label>
        <TextArea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          placeholder="Enter your address"
          style={{ margin: 10 }}
        />
      </div>
      <div style={{ margin: 20 }}>
        <label>Working Date:</label>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          style={{ marginRight: 10 }}
        />
      </div>
      <div style={{ margin: 20 }}>
        <label>Working Time:</label>
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
