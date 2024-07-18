// serviceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const response = await api.getService();
    return response.data;
});

export const searchServices = createAsyncThunk('services/searchServices', async (keyword) => {
    const response = await api.searchService(keyword);
    return response.data;
});

const initialState = {
  serviceList: [],
  status: 'idle',
  error: null,
};

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
          .addCase(fetchServices.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(fetchServices.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.serviceList = action.payload;
          })
          .addCase(fetchServices.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          })
          .addCase(searchServices.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(searchServices.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.serviceList = action.payload;
          })
          .addCase(searchServices.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          });
        },
});

export default serviceSlice.reducer;


// Selectors to access state
export const selectAllServices = (state) => state.services.serviceList;
export const selectServiceStatus = (state) => state.services.status;
export const selectServiceError = (state) => state.services.error;
