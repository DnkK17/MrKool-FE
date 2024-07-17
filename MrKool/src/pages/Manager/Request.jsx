import React, { useState } from 'react';
import { Button, Table, Tag } from 'antd';

const ViewRequestsPage = () => {
    const [requests, setRequests] = useState([
        {
            requestID: 1,
            date: "2024-07-17",
            description: "Gặp sự cố khi sử dụng máy lạnh, cần kiểm tra và sửa chữa",
            requestAddress: "123 ABC Street, XYZ City",
            status: 'Pending',
            conditionerModelID: 123,
            areaID: 456,
            customerID: 789,
            stationID: 321,
            services: [
                { serviceID: 1, title: "Kiểm tra và sửa chữa máy lạnh", price: 100, description: "Dịch vụ kiểm tra và sửa chữa máy lạnh gặp sự cố" }
            ]
        },
        {
            requestID: 2,
            date: "2024-07-16",
            description: "Cần lắp đặt mới máy điều hòa tại văn phòng",
            requestAddress: "456 XYZ Street, ABC City",
            status: 'Pending',
            conditionerModelID: 456,
            areaID: 789,
            customerID: 321,
            stationID: 654,
            services: [
                { serviceID: 2, title: "Lắp đặt mới máy điều hòa", price: 200, description: "Dịch vụ lắp đặt mới máy điều hòa tại văn phòng" }
            ]
        },
        {
            requestID: 3,
            date: "2024-07-15",
            description: "Cần sửa chữa máy lạnh tại nhà riêng",
            requestAddress: "789 CDE Street, PQR City",
            status: 'Approved',
            conditionerModelID: 789,
            areaID: 123,
            customerID: 654,
            stationID: 987,
            services: [
                { serviceID: 3, title: "Sửa chữa máy lạnh", price: 150, description: "Dịch vụ sửa chữa máy lạnh tại nhà riêng" }
            ]
        },
    ]);

    const handleApprove = (requestId) => {
        // Cập nhật trạng thái của request có ID tương ứng trong local state
        const updatedRequests = requests.map(req => {
            if (req.requestID === requestId) {
                return { ...req, status: 'Approved' };
            }
            return req;
        });
        setRequests(updatedRequests);
    };

    const columns = [
        { title: 'Request ID', dataIndex: 'requestID', key: 'requestID' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Request Address', dataIndex: 'requestAddress', key: 'requestAddress' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Approved' ? 'green' : 'blue'}>{status}</Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    {record.status === 'Pending' && (
                        <Button type="primary" onClick={() => handleApprove(record.requestID)}>
                            Approve
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <div>
            <h1>Requests List</h1>
            <Table dataSource={requests} columns={columns} rowKey="requestID" />
        </div>
    );
};

export default ViewRequestsPage;
