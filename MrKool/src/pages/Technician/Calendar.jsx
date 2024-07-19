import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Tag, Popconfirm, DatePicker } from 'antd';
import requestApi from '../../util/api';
import OrderDetailPage from '../Technician/Detail';
import moment from 'moment';

const Calendar = () => {
  const [orders, setOrders] = useState([]); // Danh sách các order
  const [loading, setLoading] = useState(false); // Trạng thái loading khi đang fetch dữ liệu
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [selectedOrder, setSelectedOrder] = useState(null); // Order được chọn để hiển thị chi tiết
  const [filteredDate, setFilteredDate] = useState(null); // Ngày để lọc order
  const technicianID = 4;

  // Khi component được mount hoặc filteredDate thay đổi, fetch danh sách order
  useEffect(() => {
    fetchOrders();
  }, [technicianID, filteredDate]);

  // Hàm fetch danh sách order từ API
  const fetchOrders = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      let response;
      if (filteredDate) {
        // Nếu có filteredDate, lấy danh sách order theo ngày được lọc
        const formattedDate = moment(filteredDate, "DD-MM-YYYY").format("YYYY-MM-DD");
        response = await requestApi.getOrder(formattedDate);
      } else {
        // Nếu không có filteredDate, lấy tất cả danh sách order
        response = await requestApi.getOrder();
      }
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

  // Hàm xử lý chọn ngày để lọc order
  const handleFilterByDate = (date) => {
    setFilteredDate(date); // Cập nhật filteredDate
  };

  // Hàm xử lý cập nhật trạng thái của order thành hoàn thành
  const handleUpdateStatus = async (id) => {
    try {
      await requestApi.updateOrderStatus(id, { status: 4 }); // Gọi API để cập nhật trạng thái thành hoàn thành (status = 4)
      message.success('Order status updated to Completed');
      fetchOrders(); // Refresh danh sách order sau khi cập nhật
    } catch (error) {
      console.error("Failed to update order", error);
      message.error('Failed to update order');
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

  // Hàm xử lý xóa order
  const handleDeleteOrder = async (orderId) => {
    try {
      await requestApi.deleteOrder(orderId);
      message.success('Order deleted successfully');
      fetchOrders(); // Refresh danh sách order sau khi xóa
    } catch (error) {
      console.error("Failed to delete order", error);
      message.error('Failed to delete order');
    }
  };

  // Các cột của bảng danh sách order
  const columns = [
    { title: 'Number', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1},
    { title: 'Time', dataIndex: 'time', key: 'time', render: (text) => moment(text).format('HH:mm A') },
    {
      title: 'Order Date',
      dataIndex: 'date',
      key: 'orderDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let statusText, statusColor;
        switch (status) {
          case 1:
            statusText = 'Processing';
            statusColor = 'blue';
            break;
          case 4:
            statusText = 'Complete';
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
          {record.status === 1 && (
            <Button
              style={{ backgroundColor: '#52c41a', color: 'white' , margin:'10px'}}
              onClick={() => handleUpdateStatus(record.orderID)}
            >
             Complete
            </Button>
          )}
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
    <div style={{ margin: "20px" }}>
      <DatePicker
        onChange={handleFilterByDate}
        format="DD-MM-YYYY" // Định dạng ngày tháng là "dd-mm-yyyy"
        placeholder="Select date to filter"
        style={{ marginBottom: 16 }}
      />
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
          <OrderDetailPage order={selectedOrder} /> {/* Truyền selectedOrder vào OrderDetail */}
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
