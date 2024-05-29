import React, { useState } from 'react';
import { Typography, Table, Tag, Input, Button, Space, Modal, Form, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import '../../styles/dashboard.css';

const { Title } = Typography;

const ManageTeam = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([
    { id: 9, name: 'Harvey Roxie', age: 65, phone: '(444)555-6239', email: 'harveyroxie@gmail.com', access: 'admin' },
    { id: 8, name: 'Rossini Frances', age: 36, phone: '(222)444-5555', email: 'rossinifrances@gmail.com', access: 'user' },
    { id: 7, name: 'Ferrara Clifford', age: 44, phone: '(543)124-0123', email: 'ferraraclifford@gmail.com', access: 'user' },
    { id: 6, name: 'Ever Melisandre', age: 150, phone: '(232)545-6483', email: 'evermelisandree@gmail.com', access: 'manager' },
    { id: 5, name: 'Daenerys Targaryen', age: 31, phone: '(421)445-1189', email: 'daenerystargaryen@gmail.com', access: 'user' },
    { id: 4, name: 'Anya Stark', age: 16, phone: '(921)425-6742', email: 'anyastark@gmail.com', access: 'admin' },
    { id: 3, name: 'Jaime Lannister', age: 45, phone: '(422)982-6739', email: 'jaimelannister@gmail.com', access: 'user' },
    { id: 2, name: 'Cersei Lannister', age: 42, phone: '(421)314-2288', email: 'cerseilannister@gmail.com', access: 'manager' },
  ]);

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
    setEditingKey(record.key);
  };

  const handleDelete = key => {
    setData(data.filter(item => item.id !== key));
    message.success('User deleted successfully');
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
    message.success(editingKey ? 'User updated successfully' : 'User added successfully');
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Access Level',
      dataIndex: 'access',
      key: 'access',
      render: access => (
        <Tag color={access === 'admin' ? 'geekblue' : access === 'manager' ? 'green' : 'volcano'}>
          {access}
        </Tag>
      ),
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
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>Delete</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title level={4}>Managing the Team Members</Title>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 100 }} scroll={{ y: 240 }} />
      </div>

      <Modal
        title={editingKey ? "Edit User" : "Add User"}
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
            label="Name"
            name="name"
            initialValue={formData.name}
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            initialValue={formData.age}
            rules={[{ required: true, message: 'Please input the age!' }]}
          >
            <Input type="number" onChange={e => setFormData({ ...formData, age: e.target.value })} />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            initialValue={formData.phone}
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={formData.email}
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </Form.Item>
          <Form.Item
            label="Access Level"
            name="access"
            initialValue={formData.access}
            rules={[{ required: true, message: 'Please input the access level!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, access: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTeam;
