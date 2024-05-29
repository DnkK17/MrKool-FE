import React, { useState } from 'react';
import { Layout, Typography, List, Card, Space, Button, Row, Col, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import '../../styles/dashboard.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ManageArea = () => {
  const [stations, setStations] = useState([
    {
      id: 1,
      manager: 'John Doe',
      team: ['Alice', 'Bob', 'Charlie'],
      address: '123 Main St, Springfield, USA',
    },
    {
      id: 2,
      manager: 'Jane Smith',
      team: ['Dave', 'Eve', 'Frank'],
      address: '456 Elm St, Shelbyville, USA',
    },
    {
      id: 3,
      manager: 'Michael Johnson',
      team: ['George', 'Hannah', 'Ian'],
      address: '789 Oak St, Capital City, USA',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStation, setEditingStation] = useState(null);

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
    <Col xs={24} sm={24} md={12} lg={8} xl={8} key={station.id}>
      <Card
        title={`Station ${station.id}`}
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

  return (
    <Content style={{ padding: '24px', minHeight: '360px' }}>
      <Title level={2}>Manage Area</Title>
      <Row gutter={[16, 16]}>
        {stations.map(renderStation)}
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
