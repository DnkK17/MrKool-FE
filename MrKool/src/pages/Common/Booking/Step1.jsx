import React, { useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const Step1 = ({ onNext }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 1: Choose Type of Air Conditioner</h2>
      <div className="types-container">
        <div
          className={`type ${selectedType === 'split' ? 'selected' : ''}`}
          onClick={() => handleSelectType('split')}
          style={{ backgroundImage: `url('https://i.pinimg.com/564x/58/31/85/583185398eea32e7071357464ab665fb.jpg')` }}
        >
          <p>Split AC</p>
        </div>
        <div
          className={`type ${selectedType === 'window' ? 'selected' : ''}`}
          onClick={() => handleSelectType('window')}
          style={{ backgroundImage: `url('/images/window_ac.jpg')` }}
        >
          <p>Window AC</p>
        </div>
        <div
          className={`type ${selectedType === 'central' ? 'selected' : ''}`}
          onClick={() => handleSelectType('central')}
          style={{ backgroundImage: `url('/images/central_ac.jpg')` }}
        >
          <p>Central AC</p>
        </div>
      </div>
      <Button type="primary" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

Step1.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default Step1;
