import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../util/api'; // Assuming axiosClient is configured appropriately

// Async thunk action creator for creating a payment
export const createPayment = createAsyncThunk(
    'payment/createPayment',
    async (params) => {
        const url = "Payment/create-payment";
        const response = await axiosClient.post(url, params);
        return response.data; // Assuming response.data contains payment details
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearPayment(state) {
            state.payment = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
                state.error = null;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Đã xảy ra lỗi khi tạo thanh toán.';
            });
    },
});

export const { clearPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
