import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Button, Space, Modal, Form, message, Upload } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import '../../styles/dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModels, createModel, updateModel, deleteModel } from '../../redux/slice/modelSlice';

const { Title } = Typography;

const ManageModel = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [deleteKey, setDeleteKey] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const models = useSelector(state => state.model.models);
  const loading = useSelector(state => state.model.loading);
  const error = useSelector(state => state.model.error);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && error) {
      message.error('Failed to fetch models');
    }
  }, [loading, error]);

  let searchInput = null;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleEdit = record => {
    setModalVisible(true);
    setFormData(record);
    setImageUrl(record.image); // Set initial image URL for preview
    setEditingKey(record.conditionerModelID);
  };

  const handleDelete = () => {
    dispatch(deleteModel(deleteKey));
    message.success('Model deleted successfully');
    setConfirmDeleteVisible(false);
    setDeleteKey(null);
  };

  const handleModalOk = () => {
    const updatedData = { ...formData, image: imageUrl }; // Add image URL to form data
    if (editingKey) {
      dispatch(updateModel({ id: editingKey, data: updatedData }));
    } else {
      dispatch(createModel(updatedData));
    }
    message.success(editingKey ? 'Model updated successfully' : 'Model added successfully');
    setModalVisible(false);
    setEditingKey('');
    setImageUrl(''); // Clear image URL after submitting
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingKey('');
    setImageUrl(''); // Clear image URL on cancel
  };

  const isEditing = record => record.conditionerModelID === editingKey;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'conditionerModelID',
      key: 'conditionerModelID',
      ...getColumnSearchProps('conditionerModelID'),
    },
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
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

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => console.log('Error: ', error);
  };

  const handleImageUpload = info => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setFormData({ ...formData, image: imageUrl });
      });
    }
  };

  return (
    <div className='account-container'>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title level={4}>Managing the Models</Title>
        <Button type="primary" onClick={() => { setModalVisible(true); setFormData({}); setEditingKey(''); }} style={{ marginBottom: 16 }}>
          Add Model
        </Button>
        <Table columns={columns} dataSource={models} pagination={{ pageSize: 100 }} />
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
            label="Image"
            name="image"
            initialValue={formData.image}
            rules={[{ required: true, message: 'Please input the image!' }]}
          >
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleImageUpload}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            initialValue={formData.price}
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <Input
              type="number"
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              value={formData.price}
            />
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
