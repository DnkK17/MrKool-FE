import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Typography, Row, Col, Modal, Form, Input, message, List, Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchAreas } from '../../redux/slice/areaSlice';
import '../../styles/dashboard.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ManageArea = () => {
  const dispatch = useDispatch();
  const { areas, loading, error } = useSelector((state) => state.area);

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  const showEditModal = (station) => {
    // Implement your logic to handle edit modal
  };

  const handleOk = () => {
    // Handle save logic here
    message.success('Changes saved successfully');
  };

  const handleCancel = () => {
    // Handle cancel logic here
  };

  return (
    <Content style={{ padding: '24px', minHeight: '360px', margin: '30px' }}>
      <Title level={2}>Manage Area</Title>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Row gutter={[16, 16]}>
        {areas.map((area) => (
          <Col key={area.areaID} span={24}>
            <Card title={area.title} bordered={false}>
              <Text strong>Address:</Text> <Text>{area.areaAddress}</Text><br />
              <Text strong>City:</Text> <Text>{area.city}</Text>
              <List
                header={<div>Stations</div>}
                bordered
                dataSource={area.stations.$values || []} // Ensure stations are correctly mapped
                renderItem={(station) => (
                  <List.Item
                    actions={[
                      <Button key="edit" onClick={() => showEditModal(station)} icon={<EditOutlined />} />,
                      <Button key="delete" icon={<DeleteOutlined />} />
                    ]}
                  >
                    <List.Item.Meta
                      title={`Station ID: ${station.stationID}`}
                      description={station.address}
                    />
                    <Text>Status: {station.status ? 'Active' : 'Inactive'}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Edit Station"
        visible={false} // Thay đổi giá trị visible để hiển thị modal
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          initialValues={{}}
        >
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please input the status!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default ManageArea;
