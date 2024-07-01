// orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../util/axios';

export const getOrder = createAsyncThunk('order/getOrder', async () => {
    const response = await axiosClient.get('Order/Orders');
    return response.data;
});

export const getOrderById = createAsyncThunk('order/getOrderById', async (id) => {
    const response = await axiosClient.get(`Order/${id}`);
    return response.data;
});

export const searchOrder = createAsyncThunk('order/searchOrder', async (keyword) => {
    const response = await axiosClient.get(`Order/search/${keyword}`);
    return response.data;
});

export const updateOrder = createAsyncThunk('order/updateOrder', async ({ id, data }) => {
    const response = await axiosClient.put(`Order/UpdateOrder/${id}`, data);
    return response.data;
});

export const createOrder = createAsyncThunk('order/createOrder', async (params) => {
    const response = await axiosClient.post('Order/CreateOrder', params);
    return response.data;
});

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id) => {
    const response = await axiosClient.delete(`Order/DeleteOrder/${id}`);
    return response.data;
});

export const updateOrderStatus = createAsyncThunk('order/updateOrderStatus', async ({ id, data }) => {
    const response = await axiosClient.put(`Order/techinician/complete/${id}`, data);
    return response.data;
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        data: [],
        currentOrder: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(searchOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(order => order.id !== action.payload.id);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
