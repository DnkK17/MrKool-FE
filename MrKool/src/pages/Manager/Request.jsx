import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin, Table, Tag, Modal } from 'antd';
import { updateRequestStatus, fetchRequest, deleteRequest } from '../../redux/slice/requestSlice';
import RequestDetail from './RequestDetail';

const ViewRequestsPage = () => {
    const dispatch = useDispatch();
    const { requests, loading, error } = useSelector(state => state.request);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        dispatch(fetchRequest());
    }, [dispatch]);

    const handleApprove = (id) => {
        dispatch(updateRequestStatus({ id, data: { status: 1 } }));
    };

    const handleShowDetail = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    const handleDeleteRequest = (id) => {
        dispatch(deleteRequest(id));
    };

    const columns = [
        { title: 'STT', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
        { title: 'Ngày bắt đầu', dataIndex: 'date', key: 'date' },
        { title: 'Vấn đề', dataIndex: 'description', key: 'description' },
        { title: 'Địa chỉ', dataIndex: 'requestAddress', key: 'requestAddress' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusText = status === 0 ? 'Chưa duyệt' : status === 1 ? 'Đã duyệt' : 'Unknown';
                const statusColor = status === 1 ? 'green' : 'blue';
                return <Tag color={statusColor}>{statusText}</Tag>;
            },
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <>
                    {record.status === 0 && (
                        <>
                            <Button type="primary" onClick={() => handleApprove(record.id)}>
                                Duyệt
                            </Button>
                        </>
                    )}
                    <Button style={{ marginLeft: '8px' }} onClick={() => handleShowDetail(record)}>
                        Chi tiết
                    </Button>
                    <Button style={{ marginLeft: '8px' }} danger onClick={() => handleDeleteRequest(record.id)}>
                        Xóa
                    </Button>
                </>
            ),
        },
    ];

    if (loading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Danh sách chờ xác nhận</h1>
            <Table dataSource={requests} columns={columns} rowKey="id" />
            <Modal
                title="Chi tiết yêu cầu"
                visible={selectedRequest !== null}
                onCancel={handleCloseModal}
                footer={null}
            >
                {selectedRequest && <RequestDetail request={selectedRequest} />}
            </Modal>
        </div>
    );
};

export default ViewRequestsPage;
