import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api';

export const createRequest = createAsyncThunk(
  'request/createRequest',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.createRequest(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveByManager = createAsyncThunk(
  'request/approveByManager',
  async ({ requestID, technicianID, data }, { rejectWithValue }) => {
    try {
      const response = await api.approveByManager(requestID, technicianID, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveByTechnician = createAsyncThunk(
  'request/approveByTechnician',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.approveByTechnician(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveByManager.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveByManager.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.findIndex(request => request.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(approveByManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveByTechnician.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveByTechnician.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.findIndex(request => request.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(approveByTechnician.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestSlice.reducer;
