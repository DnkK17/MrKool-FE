import React, { useEffect, useState } from 'react';
import { Table, Button, message, Tag } from 'antd';
import requestApi from '../../util/api';
import '../../styles/request.css';

const ViewRequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await requestApi.getRequest();
            if (response && response.$values) {
                setRequests(response.$values);
            } else {
                message.error("Failed to fetch requests: Invalid response format");
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
            message.error("Failed to fetch requests");
        }
        setLoading(false);
    };

    const handleManagerApprove = async (id) => {
        try {
            await requestApi.approveByManager(id, { status: 1 });
            message.success('Request status updated to Processing');
            fetchRequests();
        } catch (error) {
            console.error("Failed to update request", error);
            message.error('Failed to update request');
        }
    };

    const handleTechnicianApprove = async (id) => {
        try {
            await requestApi.approveByTechnician(id, { status: 2 });
            message.success('Request status updated to Approved and order created');
            fetchRequests();
        } catch (error) {
            console.error("Failed to update request", error);
            message.error('Failed to update request');
        }
    };

    const columns = [
        { title: 'ID', dataIndex: '$id', key: 'id' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: (status) => {
                let statusText, statusColor;
                switch (status) {
                    case 0:
                        statusText = 'Pending';
                        statusColor = 'blue';
                        break;
                    case 1:
                        statusText = 'Processing';
                        statusColor = 'green';
                        break;
                    case 2:
                        statusText = 'Approved';
                        statusColor = 'gold';
                        break;
                    default:
                        statusText = 'Rejected';
                        statusColor = 'gray';
                        break;
                }
                return <Tag color={statusColor}>{statusText}</Tag>;
            },
        },
        { title: 'Request Address', dataIndex: 'requestAddress', key: 'requestAddress' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => {
                if (user.role === 'manager' && record.status === 0) {
                    return (
                        <Button
                            style={{ backgroundColor: '#1890ff', color: 'white' }}
                            onClick={() => handleManagerApprove(record.$id)}
                        >
                           Processing
                        </Button>
                    );
                }
                if (user.role === 'technician' && record.status === 0) {
                    return (
                        <Button
                            style={{ backgroundColor: '#52c41a', color: 'white' }}
                            onClick={() => handleTechnicianApprove(record.$id)}
                        >
                            Approve
                        </Button>
                    );
                }
                return null;
            },
        },
    ];

    return (
        <div style={{margin: "20px"}}>
            <Table
                columns={columns}
                dataSource={requests}
                loading={loading}
                rowKey="id"
            />
        </div>
    );
};

export default ViewRequestPage;
