import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api'
const initialState = {
    orders: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
};

// Thunks để gọi các hàm API
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await api.getOrder();
    return response.$values;
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (id) => {
    const response = await api.getOrderById(id);
    return response.data;
});

export const searchOrders = createAsyncThunk('orders/searchOrders', async (keyword) => {
    const response = await api.searchOrder(keyword);
    return response.data;
});

export const updateOrderAsync = createAsyncThunk('orders/updateOrder', async ({ id, data }) => {
    const response = await api.updateOrder(id, data);
    return response.data;
});

export const createOrderAsync = createAsyncThunk('orders/createOrder', async (params) => {
    const response = await api.createOrder(params);
    return response.data;
});

export const deleteOrderAsync = createAsyncThunk('orders/deleteOrder', async (id) => {
    await api.deleteOrder(id);
    return id;
});

export const updateOrderStatusAsync = createAsyncThunk('orders/updateOrderStatus', async ({ id, data }) => {
    const response = await api.updateOrderStatus(id, data);
    return response.data;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

        // Xử lý hành động deleteOrderAsync
        builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        });

        // Các hành động khác như fetchOrderById, searchOrders, updateOrderAsync, createOrderAsync, updateOrderStatusAsync sẽ được xử lý tương tự ở đây
        builder.addCase(fetchOrderById.fulfilled, (state, action) => {
            // Xử lý khi fetchOrderById thành công
        });
        builder.addCase(fetchOrderById.rejected, (state, action) => {
            // Xử lý khi fetchOrderById thất bại
        });

        // Thêm xử lý cho các thunks khác tại đây
    },
});

export default orderSlice.reducer;


