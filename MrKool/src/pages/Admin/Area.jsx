import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Typography, List, Card, Space, Button, Row, Col, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import { getAreas} from '../../redux/slice/areaSlice';
import '../../styles/dashboard.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ManageArea = () => {
  const dispatch = useDispatch();
  const { areas, loading, error } = useSelector((state) => state.area);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStation, setEditingStation] = useState(null);

  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch]);

  const showEditModal = (station) => {
    setEditingStation(station);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle save logic here
    setIsModalVisible(false);
    message.success('Changes saved successfully');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStation(null);
  };

  

  return (
    <Content style={{ padding: '24px', minHeight: '360px' }}>
      <Title level={2}>Manage Area</Title>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Row gutter={[16, 16]}>
        {areas.map((area) => (
          <div key={area.id}>
            <Title level={3}>{area.name}</Title>
          </div>
        ))}
      </Row>
      <Modal
        title={`Edit Station ${editingStation ? editingStation.id : ''}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          initialValues={editingStation}
        >
          <Form.Item
            label="Manager"
            name="manager"
            rules={[{ required: true, message: 'Please input the manager name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Team Members"
            name="team"
            rules={[{ required: true, message: 'Please input the team members!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default ManageArea;
