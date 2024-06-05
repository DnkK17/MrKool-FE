import React, { useState } from 'react';
import { Progress } from 'antd';
import Step1 from './Step1';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="booking-page">
      <h2>Booking</h2>
      <Progress percent={(currentStep / 3) * 100} status="active" />
      {currentStep === 1 && (
        <div>
          <Step1 />
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          {/* Step 2 content - Fill address and choose time and date */}
          {/* Example content */}
          <button onClick={handlePrevStep}>Previous</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          {/* Step 3 content - View order and checkout */}
          {/* Example content */}
          <button onClick={handlePrevStep}>Previous</button>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
