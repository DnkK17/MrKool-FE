import React, { useEffect, useState } from 'react';
import { Table, Button, message, Tag, DatePicker } from 'antd';
import requestApi from '../../util/api';
import '../../styles/request.css';
import moment from 'moment';

const Schedule = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [filteredDate, setFilteredDate] = useState(null); // Ngày để lọc order

    useEffect(() => {
        fetchRequests();
    }, [filteredDate]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            let response;
            if (filteredDate) {
                // Nếu có filteredDate, lấy danh sách order theo ngày được lọc
                const formattedDate = moment(filteredDate, "DD-MM-YYYY").format("YYYY-MM-DD");
                response = await requestApi.getRequest(formattedDate);
            } else {
                // Nếu không có filteredDate, lấy tất cả danh sách order
                response = await requestApi.getRequest();
            }
            if (response && response.$values) {
                setRequests(response.$values); // Lưu danh sách order vào state
            } else {
                message.error("Failed to fetch orders: Invalid response format");
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
            message.error("Failed to fetch orders");
        }
        setLoading(false); // Kết thúc loading
    };

    const handleFilterByDate = (date) => {
        setFilteredDate(date); // Cập nhật filteredDate
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
            await requestApi.approveByTechnician(id, { status: 2, technicianID: user.id });
            message.success('Request status updated to Approved and order created');
            fetchRequests();
        } catch (error) {
            console.error("Failed to update request", error);
            message.error('Failed to update request');
        }
    };

    const columns = [
        { title: 'Number', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1},
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
                        statusText = 'Unknown';
                        statusColor = 'gray';
                        break;
                }
                return <Tag color={statusColor}>{statusText}</Tag>;
            },
        },
        { title: 'Request Address', dataIndex: 'requestAddress', key: 'requestAddress' },
        { title: 'Date', dataIndex: 'date', key: 'date' }, // Sắp xếp theo ngày giảm dần
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => {
                if (user.role === 'manager' && record.status === 0) {
                    return (
                        <Button
                            style={{ backgroundColor: '#1890ff', color: 'white' }}
                            onClick={() => handleManagerApprove(record.requestID)}
                        >
                            Processing
                        </Button>
                    );
                }
                if (user.role === 'technician' && record.status === 1) {
                    return (
                        <Button
                            style={{ backgroundColor: '#52c41a', color: 'white' }}
                            onClick={() => handleTechnicianApprove(record.requestID)}
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
        <div style={{ margin: "20px" }}>
            <DatePicker
                onChange={handleFilterByDate}
                format="DD-MM-YYYY" // Định dạng ngày tháng là "dd-mm-yyyy"
                placeholder="Select date to filter"
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                dataSource={requests}
                loading={loading}
                rowKey="requestID" // Đảm bảo đúng rowKey để Ant Design có thể nhận diện dòng dữ liệu
            />
        </div>
    );
};

export default Schedule;
