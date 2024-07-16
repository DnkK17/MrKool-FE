import React, { useState } from 'react';
import { Button, Table, Modal, Form, DatePicker, TimePicker, message } from 'antd';

const { RangePicker } = DatePicker;

const TechnicianViewPage = () => {
    const [requests, setRequests] = useState([
        {
            requestID: 1,
            date: "2024-07-17",
            description: "Gặp sự cố khi sử dụng máy lạnh, cần kiểm tra và sửa chữa",
            requestAddress: "123 ABC Street, XYZ City",
            status: 'Approved',
            services: [
                { serviceID: 1, title: "Kiểm tra và sửa chữa máy lạnh", price: 100 },
            ],
            assignedTime: null, // Thời gian được gán cho technician
        },
        {
            requestID: 2,
            date: "2024-07-16",
            description: "Cần lắp đặt mới máy điều hòa tại văn phòng",
            requestAddress: "456 XYZ Street, ABC City",
            status: 'Approved',
            services: [
                { serviceID: 2, title: "Lắp đặt mới máy điều hòa", price: 200 },
            ],
            assignedTime: null, // Thời gian được gán cho technician
        },
        {
            requestID: 3,
            date: "2024-07-15",
            description: "Cần sửa chữa máy lạnh tại nhà riêng",
            requestAddress: "789 CDE Street, PQR City",
            status: 'Approved',
            services: [
                { serviceID: 3, title: "Sửa chữa máy lạnh", price: 150 },
            ],
            assignedTime: null, // Thời gian được gán cho technician
        },
    ]);

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAssignTime = () => {
        if (!selectedRequest || !selectedRequest.assignedTime) {
            message.error('Please select a request and specify the time.');
            return;
        }
        // Gửi yêu cầu lên server hoặc cập nhật trong local state tại đây
        // Ví dụ:
        const updatedRequests = requests.map(req => {
            if (req.requestID === selectedRequest.requestID) {
                return { ...req, assignedTime: selectedRequest.assignedTime };
            }
            return req;
        });
        setRequests(updatedRequests);
        setModalVisible(false);
        setSelectedRequest(null);
        message.success('Assigned time updated successfully.');
    };

    const columns = [
        { title: 'Request ID', dataIndex: 'requestID', key: 'requestID' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Request Address', dataIndex: 'requestAddress', key: 'requestAddress' },
        {
            title: 'Services',
            dataIndex: 'services',
            key: 'services',
            render: services => (
                <ul>
                    {services.map(service => (
                        <li key={service.serviceID}>{service.title}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Assigned Time',
            dataIndex: 'assignedTime',
            key: 'assignedTime',
            render: assignedTime => (
                assignedTime ? (
                    <span>{assignedTime.format('YYYY-MM-DD HH:mm')}</span>
                ) : (
                    <span>Not assigned</span>
                )
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => setSelectedRequest(record)}>
                    Assign Time
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h1>Technician's View</h1>
            <Table dataSource={requests} columns={columns} rowKey="requestID" />

            <Modal
                title="Assign Time"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleAssignTime}
            >
                <Form layout="vertical">
                    <Form.Item label="Select Time">
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            onChange={date => setSelectedRequest({
                                ...selectedRequest,
                                assignedTime: date,
                            })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TechnicianViewPage;
