import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const AirConditionerRepairBooking = () => {
  const onDateTimeChange = (date, dateString) => {
    console.log('Selected date:', dateString[0]);
    console.log('Selected time:', dateString[1]);
  };

  return (
    <div className="container">
      <h1>Book an AC Repair</h1>
      <Space direction="vertical" size={16}>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['Select Date', 'Select Time']}
          onChange={onDateTimeChange}
          style={{ width: '100%' }}
        />
      </Space>
    </div>
  );
};

export default AirConditionerRepairBooking;