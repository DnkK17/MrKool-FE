import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api';

export const fetchService = createAsyncThunk(
  'service/fetchService',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { currentPage, pageSize, filter } = state.service;
    try {
      const response = await api.getService(); 
      let data = response.$values; // Trích xuất mảng từ thuộc tính $values

      console.log('API Response:', data);  // Kiểm tra dữ liệu trả về

      if (!Array.isArray(data)) {
        throw new Error('Expected an array from API response');
      }

      // Áp dụng bộ lọc và phân trang
      if (filter.searchTerm) {
        data = data.filter(service =>
          service.title && service.title.toLowerCase().includes(filter.searchTerm.toLowerCase())
        );
      }

      if (filter.priceRange) {
        data = data.filter(service => {
          if (filter.priceRange === 'low') return service.price < 100;
          if (filter.priceRange === 'medium') return service.price >= 100 && service.price < 500;
          if (filter.priceRange === 'high') return service.price >= 500;
          return true;
        });
      }

      const totalPages = Math.ceil(data.length / pageSize);
      const start = (currentPage - 1) * pageSize;
      const paginatedData = data.slice(start, start + pageSize);

      return { data: paginatedData, totalPages };
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    filter: {
      searchTerm: '',
      priceRange: null,
    },
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setPageSize, setFilter } = serviceSlice.actions;
export default serviceSlice.reducer;
