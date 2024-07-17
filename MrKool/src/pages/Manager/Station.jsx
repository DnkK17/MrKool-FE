import React, { useEffect, useState } from 'react';
import { Layout, Typography, List, Card, Space, Button, Row, Col, Modal, Form, Input, message, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStations } from '../../redux/slice/stationSlice';
import '../../styles/dashboard.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ManageStation = () => {
  const dispatch = useDispatch();
  const { stations, loading, error } = useSelector(state => state.station);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
console.log(stations);
  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  const showEditModal = station => {
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

  const renderStation = station => (
    <Col xs={24} sm={24} md={12} lg={8} xl={8} key={station.stationID}>
      <Card
        title={`Station ${station.stationID}`}
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={() => showEditModal(station)} />
            <Button icon={<DeleteOutlined />} danger />
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Space direction="vertical" size="middle">
          <Text><strong>Manager:</strong> {station.manager}</Text>
          <Text><strong>Address:</strong> {station.address}</Text>
          <Text><strong>Team Members:</strong></Text>
          <List
            bordered
            dataSource={station.team}
            renderItem={item => (
              <List.Item>
                <TeamOutlined style={{ marginRight: 8 }} /> {item}
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </Col>
  );

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!stations) {
    return <Spin size="large" />;
  }
  
  return (
    <Content style={{ padding: '24px', minHeight: '360px' }}>
      <Title level={2}>Manage Area</Title>
      <Row gutter={[16, 16]}>
      {stations.map(station => renderStation(station))}      </Row>
      <Modal
        title={`Edit Station ${editingStation ? editingStation.stationID : ''}`}
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

export default ManageStation;
