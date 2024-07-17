import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Button, Space, Modal, Form, message, Select } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from '../../redux/slice/userSlice';

const { Title } = Typography;
const { Option } = Select;

const ManageAccount = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts?.accounts);
  const loading = useSelector(state => state.accounts?.loading);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [deleteKey, setDeleteKey] = useState(null);
  const [editingUser, setEditingUser] = useState(null); 


  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  
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
    console.log('Editing record:', record); // Debug để xác định record có đúng không
    setModalVisible(true);
    setEditingUser(record); 
    setFormData({ ...record }); // Đảm bảo rằng bạn đang sử dụng {...record} để sao chép các thuộc tính của record.
    setEditingKey(record.id);
    console.log('Form data:', formData);
  };
  useEffect(() => {
    if (editingUser) {
      setFormData({ ...editingUser });
    }
  }, [editingUser]);
  
  const handleDelete = () => {
    dispatch(deleteAccount(deleteKey));
    message.success('Account deleted successfully');
    setConfirmDeleteVisible(false);
    setDeleteKey(null);
  };

  const handleModalOk = () => {
    if (editingKey) {
      dispatch(updateAccount({ id: editingKey, data: formData }));
    } else {
      dispatch(createAccount(formData));
    }
    message.success(editingKey ? 'Account updated successfully' : 'Account added successfully');
    setModalVisible(false);
    setEditingKey('');
    setEditingUser(null);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingKey('');
    setEditingUser(null);
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <img src={text} alt="Avatar" style={{ width: 50, borderRadius: '50%' }} />,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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

  let searchInput = null;

  return (
    <div className='account-container'>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title level={4}>Managing the Accounts</Title>
        <Button type="primary" onClick={() => { setModalVisible(true); setFormData({}); setEditingKey(''); }} style={{ marginBottom: 16 }}>
          Add Account
        </Button>
        <Table columns={columns} dataSource={accounts} loading={loading} pagination={{ pageSize: 100 }} />
      </div>

      <Modal
        title={editingKey ? "Edit Account" : "Add Account"}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          layout="vertical"
          initialValues={formData}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, email: e.target.value })} value={formData.email} />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[{ required: true, message: 'Please input the avatar URL!' }]}
          >
            <Input onChange={e => setFormData({ ...formData, avatar: e.target.value })} value={formData.avatar} />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Select onChange={value => setFormData({ ...formData, role: value })} value={formData.role} placeholder="Select a role">
              <Option value="manager">Manager</Option>
              <Option value="customer">Customer</Option>
              <Option value="technician">Technician</Option>
            </Select>
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
        <p>Are you sure you want to delete this Account?</p>
      </Modal>
    </div>
  );
};

export default ManageAccount;
