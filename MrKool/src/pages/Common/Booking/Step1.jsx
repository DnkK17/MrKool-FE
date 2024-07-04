import React, { useState, useEffect } from 'react';
import { Select, Spin, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModels } from '../../../redux/slice/modelSlice';
import PropTypes from 'prop-types';

const { Option } = Select;

const Step1 = ({ onNext }) => {
  const dispatch = useDispatch();
  const models = useSelector(state => state.model.models);
  const loading = useSelector(state => state.model.loading);
  const error = useSelector(state => state.model.error);

  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && error) {
      message.error('Failed to fetch models');
    }
  }, [loading, error]);

  const handleSelectType = (value) => {
    const selected = models.find(model => model.conditionerModelID === value);
    setSelectedModel(selected);
    onNext({ modelType: selected.title, price: selected.price });
  };

  return (
    <div className="step-container">
      <h2>Step 1: Choose Type of Air Conditioner</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Select
          value={selectedModel ? selectedModel.conditionerModelID : undefined}
          onChange={handleSelectType}
          style={{ width: 200, marginBottom: 20 }}
          placeholder="Select type"
        >
          {models.map(model => (
            <Option key={model.conditionerModelID} value={model.conditionerModelID} label={model.title}>
              <img src={`${model.title.toLowerCase().replace(' ', '_')}_ac.jpg`} alt={model.title} style={{ width: '20px', marginRight: '5px' }} />
              {model.title}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

Step1.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default Step1;
