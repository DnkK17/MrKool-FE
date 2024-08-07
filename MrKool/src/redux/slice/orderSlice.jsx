import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://65459cb4fe036a2fa9549229.mockapi.io/order';

const getCurrentUser = () => {
    const userJSON = localStorage.getItem('currentUser');
    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      return null; 
    }
  };

export const fetchOrders = createAsyncThunk(
  'request/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'request/updateOrderStatus',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      dispatch(fetchOrders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  'request/deleteOrder',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(fetchOrders()); 
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_URL, orderData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  export const assignTechnician = createAsyncThunk(
    'order/assignTechnician',
    async ({ id, technician }, { rejectWithValue, dispatch }) => {
      try {
        const data = { id, technician };
  
        const response = await axios.put(`${API_URL}/${id}`, data);
          dispatch(fetchOrders());
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    currentUser: getCurrentUser(), 
  },
  reducers: {
  
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(req => req.requestID === action.payload.requestID);
        if (index !== -1) {
          state.orders[index].status = action.payload.status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.requests.filter(req => req.requestID !== action.payload.requestID); // Xóa request khỏi danh sách
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignTechnician.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignTechnician.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, technician } = action.payload;
        const index = state.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
          state.orders[index].technician = technician;
        }
      })
      .addCase(assignTechnician.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
}); 
export const selectOrders = (state) => state.order.orders;
export const selectCurrentUser = (state) => state.order.currentUser;
export default orderSlice.reducer;
