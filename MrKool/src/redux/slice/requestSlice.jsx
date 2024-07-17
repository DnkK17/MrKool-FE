import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createOrder } from '../slice/orderSlice';
import { generateRandomTime, getNextOrderId, getNextOrderDetailId } from '../../util/data';

// Thay đổi URL API tương ứng với mock API của bạn
const API_URL = 'https://65459cb4fe036a2fa9549229.mockapi.io/request';

// Tạo async thunks để gọi API
export const fetchRequest = createAsyncThunk(
  'request/fetchRequest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  'request/updateRequestStatus',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      dispatch(fetchRequest());
      if (data.status === 1) {
        const request = response.data;
        const services = request.Service.map(service => ({
          title: service.title,
          description: service.description || ''
        }));
        const technicianName = "";


        // Chuyển đổi dữ liệu model
        const models = {
          title: request.Model.title || '',
          capacity: request.Model.capacity || '',
          power: request.Model.power || ''
        };

        const orderData = {
          time: generateRandomTime(),
          status: 0,
          request: {
            description: request.description,
            requestAddress: request.requestAddress,
            date: request.date,
            Customer: {
              name: request.Customer.name,
              phone: request.Customer.phone
            }
          },
          orderDetail: {
            orderDetailID: getNextOrderDetailId(),
            Model: models,
            Station: request.Station.stationAddress,
            Service: services
          },
          id: getNextOrderId(),
          requestId: request.id,
          technician : technicianName 
        };
        
        await dispatch(createOrder(orderData));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRequest = createAsyncThunk(
  'request/deleteRequest',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(fetchRequest()); // Cập nhật lại danh sách request sau khi xóa
      return id; // Trả về id của request đã xóa để xử lý trong reducer
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Khởi tạo slice
const requestSlice = createSlice({
  name: 'request',
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRequestStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.findIndex(req => req.requestID === action.payload.requestID);
        if (index !== -1) {
          state.requests[index].status = action.payload.status;
        }
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter(req => req.requestID !== action.payload.requestID); // Xóa request khỏi danh sách
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestSlice.reducer;
