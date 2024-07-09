import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModels } from '../../redux/slice/modelSlice';
import { fetchStations } from '../../redux/slice/stationSlice';
import '../../styles/booking.css';
const { Option } = Select;

const BookingPage = () => {
  const dispatch = useDispatch();
  const models = useSelector(state => state.model.models);
  const loadingModels = useSelector(state => state.model.loading);
  const errorModels = useSelector(state => state.model.error);
  const stations = useSelector(state => state.station.data);

  const [form] = Form.useForm();
  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    dispatch(fetchModels());
    dispatch(fetchStations());
  }, [dispatch]);

  const handleSelectModel = (value) => {
    const selected = models.find(model => model.conditionerModelID === value);
    if (selected && !selectedModels.some(model => model.conditionerModelID === selected.conditionerModelID)) {
      setSelectedModels([...selectedModels, selected]);
    }
  };
  const handleRemoveModel = (index) => {
    const updatedModels = [...selectedModels];
    updatedModels.splice(index, 1);
    setSelectedModels(updatedModels);
  };
  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('Booking submitted successfully');
    form.resetFields();
    setSelectedModels([]);
  };

  useEffect(() => {
    if (!loadingModels && errorModels) {
      message.error('Failed to fetch models');
    }
  }, [loadingModels, errorModels]);

  return (
    <div className="booking-page">
      <h2 className='title'>Booking Form</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Choose Type of Air Conditioner"
          name="modelType"
          rules={[{ required: true, message: 'Please select a model' }]}
        >
          <Select
            showSearch
            placeholder="Select type"
            loading={loadingModels}
            optionFilterProp="children"
            onChange={handleSelectModel}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {models.map(model => (
              <Option key={model.conditionerModelID} value={model.conditionerModelID}>
                <div>
                  <img
                    src={model.conditionerModelImage}
                    alt={model.title}
                    style={{ width: '20px', marginRight: '5px' }}
                  />
                  {model.title}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div>
          <Button
            type="link"
            onClick={() => form.setFieldsValue({ modelType: null })}
          >
            + Add Another
          </Button>
        </div>

        {selectedModels.map((selectedModel, index) => (
          <Form.Item
            key={index}
            label={`Type of Air Conditioner ${index + 1}`}
            name={`modelType-${index}`}
          >
            <Input disabled value={selectedModel.title} />
            <Button type="link" onClick={() => handleRemoveModel(index)}>
              Remove
            </Button>
          </Form.Item>
        ))}

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Time"
          name="time"
          rules={[{ required: true, message: 'Please select a time' }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          label="Service Station"
          name="station"
          rules={[{ required: true, message: 'Please select a service station' }]}
        >
          <Select placeholder="Select service station">
            {stations && stations.map(station => (
              <Option key={station.stationID} value={station.stationID}>
                {station.address}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Book Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingPage;
