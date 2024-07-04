import React, { useState } from 'react';
import { Button, Progress } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import "../../../styles/booking.css"

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [modelType, setModelType] = useState('');
  const [price, setPrice] = useState(0);
  const [step2Data, setStep2Data] = useState({
    address: '',
    selectedDate: null,
    selectedTime: null,
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStep1Next = (selectedModelType, selectedPrice) => {
    setModelType(selectedModelType);
    setPrice(selectedPrice);
    handleNextStep();
  };

  const handleStep2Next = (data) => {
    setStep2Data(data);
    localStorage.setItem('step2Data', JSON.stringify(data));
    handleNextStep();
  };

  return (
    <div className="booking-page">
      <h2 style={{ margin: 20 }}>Booking</h2>
      <Progress
        percent={(currentStep / 3) * 100}
        status="active"
        style={{ marginLeft: 20 }}
        format={() => null}
      />
      {currentStep === 1 && (
        <div>
          <Step1 onNext={handleStep1Next} />
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <Step2 onNext={handleStep2Next} />
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <Step3
            modelType={modelType}
            price={price}
          />
        </div>
      )}
      <div className="button-container">
        {currentStep > 1 && <Button onClick={handlePrevStep}>Previous</Button>}
        {currentStep < 3 && <Button onClick={handleNextStep}>Next</Button>}
        {currentStep === 3 && <Button>Checkout</Button>}
      </div>
    </div>
  );
};

export default BookingPage;
