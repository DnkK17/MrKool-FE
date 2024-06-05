import React, { useState } from 'react';
import { Button, Select } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const Step1 = ({ onNext }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (value) => {
    setSelectedType(value);
  };

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 1: Choose Type of Air Conditioner</h2>
      <Select
        value={selectedType}
        onChange={handleSelectType}
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Select type"
      >
        <Option value="split" label={<><img src="split_ac.jpg" alt="Split AC" style={{ width: '20px', marginRight: '5px' }} /> Split AC</>}>Split AC</Option>
        <Option value="window" label={<><img src="window_ac.jpg" alt="Window AC" style={{ width: '20px', marginRight: '5px' }} /> Window AC</>}>Window AC</Option>
        <Option value="central" label={<><img src="central_ac.jpg" alt="Central AC" style={{ width: '20px', marginRight: '5px' }} /> Central AC</>}>Central AC</Option>
      </Select>
   
    </div>
  );
};

Step1.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default Step1;
