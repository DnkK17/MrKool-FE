import React, { useState } from 'react';
import { Typography, Table, Input, Button, Space, Modal, Form, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import '../../styles/dashboard.css';

const { Title } = Typography;

const ManageService = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([
    { id: 1, title: 'Service 1', description: 'Description 1', price: 100 },
    { id: 2, title: 'Service 2', description: 'Description 2', price: 150 },
  ]);
  const [deleteKey, setDeleteKey] = useState(null);

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
    setEditingKey(record.id);
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== deleteKey));
    message.success('Service deleted successfully');
    setConfirmDeleteVisible(false);
    setDeleteKey(null);
  };

  const handleModalOk = () => {
    const newData = [...data];
    if (editingKey) {
      const index = newData.findIndex(item => editingKey === item.id);
      if (index > -1) {
        newData[index] = formData;
      }
    } else {
      setFormData({ id: data.length + 1, ...formData });
      newData.push({ id: data.length + 1, ...formData });
    }
    setData(newData);
    message.success(editingKey ? 'Service updated successfully' : 'Service added successfully');
    setModalVisible(false);
    setEditingKey('');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingKey('');
  };

  const isEditing = record => record.id === editingKey;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => { setConfirmDeleteVisible(true); setDeleteKey(record.id); }}>Delete</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className='account-container'>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title level={4}>Managing the Services</Title>
        <Button type="primary" onClick={() => { setModalVisible(true); setFormData({}); setEditingKey(''); }} style={{ marginBottom: 16 }}>
          Add Service
        </Button>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 100 }} />
      </div>

      <Modal
        title={editingKey ? "Edit Service" : "Add Service"}
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
            label="Description"
            name="description"
            initialValue={formData.description}
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, description: e.target.value })} value={formData.description} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            initialValue={formData.price}
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <Input type="number" onChange={e => setFormData({ ...formData, price: e.target.value })} value={formData.price} />
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
        <p>Are you sure you want to delete this service?</p>
      </Modal>
    </div>
  );
};

export default ManageService;
