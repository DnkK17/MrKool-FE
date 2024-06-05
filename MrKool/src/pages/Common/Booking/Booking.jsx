import React, { useState } from 'react';
import { Button, Progress } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';

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
          <Button onClick={handleNextStep}>Next</Button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
         <Step2/>
          <Button onClick={handlePrevStep}>Previous</Button>
          <Button onClick={handleNextStep}>Next</Button>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          {/* Step 3 content - View order and checkout */}
          {/* Example content */}
          <Button onClick={handlePrevStep}>Previous</Button>
          <Button>Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
