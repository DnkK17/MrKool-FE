import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Button, Space, Modal, Form, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../styles/dashboard.css';
import modelApi from '../../util/api'; // Import your API functions
const { Title } = Typography;

const ManageModel = () => {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [deleteKey, setDeleteKey] = useState(null);
  const [models, setModels] = useState([]); // State to hold models data
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for image URL

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await modelApi.getModel(); // Call your API function to fetch models
      setModels(response.$values); // Assuming response.data is the array of models from API
    } catch (error) {
      console.error("Failed to fetch models", error);
    }
    setLoading(false);
  };

  const handleEdit = record => {
    setModalVisible(true);
    setFormData(record);
    setImageUrl(record.image); // Set image URL for preview
    setEditingKey(record.conditionerModelID);
  };

  const handleSearch = value => {
    const searchText = value.toLowerCase();
    setSearchText(searchText);
  };

  const handleImageUrlChange = e => {
    const url = e.target.value;
    setImageUrl(url);
    setFormData({ ...formData, image: url });
  };

  const handleDelete = async () => {
    try {
      await modelApi.deleteModel(deleteKey); // Call your API function to delete model
      message.success('Model deleted successfully');
      setConfirmDeleteVisible(false);
      setDeleteKey(null);
      fetchModels(); // Fetch models again after deletion
    } catch (error) {
      console.error("Failed to delete model", error);
      message.error('Failed to delete model');
    }
  };

  const handleModalOk = async () => {
    try {
      if (editingKey) {
        await modelApi.updateModel(editingKey, formData); // Update model
      } else {
        await modelApi.createModel(formData); // Create model
      }
      message.success(editingKey ? 'Model updated successfully' : 'Model added successfully');
      setModalVisible(false);
      setEditingKey('');
      fetchModels(); // Fetch models again after update or create
    } catch (error) {
      console.error("Failed to save model", error);
      message.error('Failed to save model');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingKey('');
  };

  const filteredModels = models && models.length > 0 ? models.filter(item => {
    return (
      item.conditionerModelID.toString().includes(searchText) ||
      item.title.toLowerCase().includes(searchText)
    );
  }) : [];

  const isEditing = record => record.conditionerModelID === editingKey;

  const columns = [
    { title: 'Number', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1},

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="model" style={{ width: '100px' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" size="small" onClick={handleModalOk}>Save</Button>
            <Button size="small" onClick={handleModalCancel}>Cancel</Button>
          </span>
        ) : (
          <Space>
            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>Edit</Button>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => { setConfirmDeleteVisible(true); setDeleteKey(record.conditionerModelID); }}>Delete</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className='account-container'>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title level={4}>Managing the Models</Title>
        <Input.Search
          placeholder="Search by ID or Title"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={handleSearch}
          style={{ width: 300, marginBottom: 16 }}
        />
        <div>
          <Button type="primary" onClick={() => { setModalVisible(true); setFormData({}); setImageUrl(''); setEditingKey(''); }} style={{ marginBottom: 16 }}>
            Add Model
          </Button>
        </div>

        <Table columns={columns} dataSource={filteredModels} pagination={{ pageSize: 10 }} loading={loading} />
      </div>

      <Modal
        title={editingKey ? "Edit Model" : "Add Model"}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleModalOk}
        >
          <Form.Item
            label="Title"
            name="title"
            initialValue={formData.title}
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, title: e.target.value })} value={formData.title} />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image"
            initialValue={formData.image}
            rules={[{ required: true, message: 'Please input the image URL!' }]}
            help={imageError && <span style={{ color: 'red' }}>{imageError}</span>}
          >
            <Input onChange={handleImageUrlChange} value={imageUrl} />
            {imageUrl && <img src={imageUrl} alt="preview" style={{ width: '100px', marginTop: '10px' }} />}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirm Deletion"
        visible={confirmDeleteVisible}
        onOk={handleDelete}
        onCancel={() => setConfirmDeleteVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this model?</p>
      </Modal>
    </div>
  );
};

export default ManageModel;
