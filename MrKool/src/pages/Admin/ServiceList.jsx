import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form, message } from 'antd';
import serviceApi from '../../util/api';

const { Search } = Input;
const { confirm } = Modal;

const ManageService = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [editingKey, setEditingKey] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await serviceApi.getService();
            setServices(response.$values);
        } catch (error) {
            console.error("Failed to fetch services", error);
        }
        setLoading(false);
    };

    const onSearch = async (value) => {
        if (!value) {
            fetchServices();
            return;
        }
        setLoading(true);
        try {
            const response = await serviceApi.searchService(value);
            setServices(response.$values);
        } catch (error) {
            console.error("Failed to search services", error);
        }
        setLoading(false);
    };

    const handleCreate = () => {
        setModalVisible(true);
        setFormData({});
        setEditingKey(null);
    };

    const handleEdit = (record) => {
        setModalVisible(true);
        setFormData(record);
        setEditingKey(record.serviceID);
    };

    const handleDelete = (serviceID) => {
        confirm({
            title: 'Are you sure you want to delete this service?',
            onOk: async () => {
                try {
                    await serviceApi.deleteService(serviceID);
                    message.success('Service deleted successfully');
                    setServices(prevModels => prevModels.filter(service=> service.serviceID !== serviceID));
                } catch (error) {
                    console.error("Failed to delete service", error);
                    message.error('Failed to delete service');
                }
            },
            onCancel() { },
        });
    };

    const handleModalOk = async () => {
        try {
            if (editingKey !== null) {
                await serviceApi.updateService(editingKey, formData);
                message.success('Service updated successfully');
            } else {
                await serviceApi.createService(formData);
                message.success('Service created successfully');
            }
            setModalVisible(false);
            setEditingKey(null);
            fetchServices();
        } catch (error) {
            console.error("Failed to save service", error);
            message.error('Failed to save service');
        }
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setEditingKey(null);
    };

    const columns = [
        { title: 'Number', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1},
        { title: 'Service', dataIndex: 'serviceTitle', key: 'serviceTitle' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Price', dataIndex: 'price', key: 'price',
            render: (text) => (
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)}</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.serviceID)} danger style={{ marginLeft: 8 }}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{ margin: "20px" }}>
            <Button type="primary" onClick={handleCreate} style={{ marginBottom: 16 }}>Add Service</Button>
            <div> <Search
                placeholder="Search services"
                enterButton="Search"
                onSearch={onSearch}
                style={{ marginBottom: 20, width: "25%" }}
            /></div>

            <Table
                columns={columns}
                dataSource={services}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={editingKey !== null ? "Edit Service" : "Add Service"}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={formData}
                >
                    <Form.Item label="Service Title" name="serviceTitle" rules={[{ required: true, message: 'Please enter service title' }]}>
                        <Input onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })} value={formData.serviceTitle} />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} />
                    </Form.Item>
                    <Form.Item label="Price" name="price">
                        <Input onChange={(e) => setFormData({ ...formData, price: e.target.value })} value={formData.price} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageService;
