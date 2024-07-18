import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Tag, Popconfirm } from 'antd';
import requestApi from '../../../util/api';
import OrderDetail from './OrderDetail';
import moment from 'moment';

const OrderListPage = () => {
    const [orders, setOrders] = useState([]); // Danh sách các order
    const [loading, setLoading] = useState(false); // Trạng thái loading khi đang fetch dữ liệu
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
    const [selectedOrder, setSelectedOrder] = useState(null); // Order được chọn để hiển thị chi tiết

    // Khi component được mount, fetch danh sách order
    useEffect(() => {
        fetchOrders();
    }, []);

    // Hàm fetch danh sách order từ API
    const fetchOrders = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await requestApi.getOrder(); // Gọi API để lấy danh sách order
            if (response && response.$values) {
                setOrders(response.$values); // Lưu danh sách order vào state
            } else {
                message.error("Failed to fetch orders: Invalid response format");
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
            message.error("Failed to fetch orders");
        }
        setLoading(false); // Kết thúc loading
    };

    const handleDeleteOrder = async (orderId) => {
      try {
          await requestApi.deleteOrder(orderId);
          message.success('Order deleted successfully');
          fetchOrders(); // Refresh the order list
      } catch (error) {
          console.error("Failed to delete order", error);
          message.error('Failed to delete order');
      }
  };
    // Hàm hiển thị chi tiết của một order khi nhấn vào nút View Details
    const showOrderDetail = (orderId) => {
        const orderToShow = orders.find(order => order.orderID === orderId); // Tìm order trong danh sách orders
        setSelectedOrder(orderToShow); // Cập nhật selectedOrder để hiển thị trong Modal
        setIsModalVisible(true); // Mở Modal
    };

    // Hàm đóng Modal
    const handleModalClose = () => {
        setIsModalVisible(false); // Đóng Modal
        setSelectedOrder(null); // Reset selectedOrder về null
    };

    // Các cột của bảng danh sách order
    const columns = [
        { title: 'ID', dataIndex: '$id', key: 'id' },
        { title: 'Time', dataIndex: 'time', key: 'time', render: (text) => moment(text).format('HH:mm A') },
        { title: 'Order Date', dataIndex: 'date', key: 'orderDate' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let statusText, statusColor;
                switch (status) {
                    case 0:
                        statusText = 'Processing';
                        statusColor = 'blue';
                        break;
                    case 1: statusText = 'Done';
                    statusColor = 'green';
                    break;
                       
                    default:
                        statusText = 'Unknown';
                        statusColor = 'gray';
                        break;
                }
                return <Tag color={statusColor}>{statusText}</Tag>;
            },
        },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
              <>
                    <Button
                        type="primary"
                        onClick={() => showOrderDetail(record.orderID)}
                    >
                        View Details
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this order?"
                        onConfirm={() => handleDeleteOrder(record.orderID)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                        danger
                            style={{ marginLeft: 8, marginTop: 8 }}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div style={{margin:"20px"}}>
            <Table
                columns={columns}
                dataSource={orders}
                loading={loading}
                rowKey="$id" // Sử dụng $id làm key cho từng row trong Table
            />
            {selectedOrder && ( // Nếu có selectedOrder được chọn, hiển thị Modal
                <Modal
                    title="Order Details"
                    visible={isModalVisible}
                    onCancel={handleModalClose} // Đóng Modal khi nhấn nút Cancel hoặc click ngoài Modal
                    footer={null} // Không hiển thị footer
                >
                    <OrderDetail order={selectedOrder} /> {/* Truyền selectedOrder vào OrderDetail */}
                </Modal>
            )}
        </div>
    );
};

export default OrderListPage;
