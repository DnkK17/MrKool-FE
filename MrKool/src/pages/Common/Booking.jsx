import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModels } from '../../redux/slice/modelSlice';
import { fetchStations } from '../../redux/slice/stationSlice';
import '../../styles/booking.css';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const totalPrice = useMemo(() => {
    return selectedModels.reduce((sum, model) => sum + model.price, 0);
  }, [selectedModels]);

  const onFinish = (values) => {
    console.log('Thông tin biểu mẫu:', values);
    message.success('Đặt lịch thành công');
    form.resetFields();

    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      time: values.time ? values.time.format('HH:mm') : null,
      selectedModels: selectedModels,
      totalPrice: totalPrice
    };

    navigate('/checkout', { state: formattedValues });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    if (!loadingModels && errorModels) {
      message.error('Không thể lấy danh sách các loại máy lạnh');
    }
  }, [loadingModels, errorModels]);

  return (
    <div className="booking-page">
      <h2 className='title'> Đặt dịch vụ</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Chọn loại máy lạnh"
          name="modelType"
          rules={[{ required: true, message: 'Vui lòng chọn loại máy lạnh' }]}
        >
          <Select
            showSearch
            placeholder="Chọn loại"
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
                  {model.title} - {formatPrice(model.price)}
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
            + Thêm loại khác
          </Button>
        </div>

        {selectedModels.map((selectedModel, index) => (
          <Form.Item
            key={index}
            label={`Loại máy lạnh ${index + 1}`}
            name={`modelType-${index}`}
          >
            <Input disabled value={`${selectedModel.title} - ${selectedModel.price} VND`} />
            <Button type="link" onClick={() => handleRemoveModel(index)}>
              Xóa
            </Button>
          </Form.Item>
        ))}

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn' }]}
        >
          <Input placeholder="Nhập địa chỉ của bạn" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
        >
          <Input placeholder="Nhập số điện thoại của bạn" />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn' }]}
        >
          <Input placeholder="Nhập họ và tên của bạn" />
        </Form.Item>

        <Form.Item
          label="Ngày"
          name="date"
          rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Thời gian"
          name="time"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          label="Trạm dịch vụ"
          name="station"
          rules={[{ required: true, message: 'Vui lòng chọn trạm dịch vụ' }]}
        >
          <Select placeholder="Chọn trạm dịch vụ">
            {stations && stations.map(station => (
              <Option key={station.stationID} value={station.stationID}>
                {station.address}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tổng giá"
        >
          <Input disabled value={formatPrice(totalPrice)} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Đặt lịch ngay
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingPage;
