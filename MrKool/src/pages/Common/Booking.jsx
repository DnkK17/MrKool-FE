import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModels } from '../../redux/slice/modelSlice';
import { fetchStations } from '../../redux/slice/stationSlice';
import { fetchService } from '../../redux/slice/serviceSlice';
import '../../styles/booking.css';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingModels = useSelector(state => state.model.loading);
  const errorModels = useSelector(state => state.model.error);
  const stations = useSelector(state => state.station.data);
  const services = useSelector(state => state.service.data);
  const serviceLoading = useSelector(state => state.service.loading);
  const serviceError = useSelector(state => state.service.error);

  const [form] = Form.useForm();
  const [selectedServices, setSelectedServices] = useState([]);
  const [preselectedModel, setPreselectedModel] = useState(null);

  useEffect(() => {
    dispatch(fetchModels());
    dispatch(fetchStations());
    dispatch(fetchService());

    const storedModel = localStorage.getItem('selectedModel');
    if (storedModel) {
      setPreselectedModel(JSON.parse(storedModel));
      localStorage.removeItem('selectedModel');
    }
  }, [dispatch]);

  const handleSelectService = (value) => {
    const selected = services.find(service => service.serviceID === value);
    if (selected && !selectedServices.some(service => service.serviceID === selected.serviceID)) {
      setSelectedServices([...selectedServices, selected]);
    }
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
  };

  const totalPrice = useMemo(() => {
    const modelPrice = preselectedModel ? preselectedModel.price : 0;
    const servicesPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
    return modelPrice + servicesPrice;
  }, [preselectedModel, selectedServices]);

  const onFinish = (values) => {
    console.log('Thông tin biểu mẫu:', values);
    message.success('Đặt lịch thành công');
    form.resetFields();

    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      time: values.time ? values.time.format('HH:mm') : null,
      selectedModel: preselectedModel,
      selectedServices: selectedServices,
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
        {preselectedModel && (
          <Form.Item label="Loại máy lạnh">
            <Input disabled value={`${preselectedModel.title} - ${formatPrice(preselectedModel.price)}`} />
          </Form.Item>
        )}

        <Form.Item
          label="Chọn dịch vụ"
          name="services"
          rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
        >
          <Select
            showSearch
            placeholder="Chọn dịch vụ"
            loading={serviceLoading}
            optionFilterProp="children"
            onChange={handleSelectService}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {services.map(service => (
              <Option key={service.serviceID} value={service.serviceID}>
                {service.title} - {formatPrice(service.price)}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedServices.map((selectedService, index) => (
          <Form.Item
            key={index}
            label={`Dịch vụ ${index + 1}`}
            name={`service-${index}`}
          >
            <Input disabled value={`${selectedService.description} - ${formatPrice(selectedService.price)}`} />
            <Button type="link" onClick={() => handleRemoveService(index)}>
              Xóa
            </Button>
          </Form.Item>
        ))}

        <Button
          type="dashed"
          onClick={() => form.setFieldsValue({ services: null })}
          style={{ width: '100%', marginBottom: '16px' }}
        >
          + Thêm dịch vụ khác
        </Button>


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
