import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectOrders } from './orderSlice';
import OrdersListCard from './OrdersListCard';

const OrdersList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    // Gọi API để lấy danh sách đơn hàng khi component được render
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="orders-list">
      {orders.map(order => (
        <OrdersListCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
