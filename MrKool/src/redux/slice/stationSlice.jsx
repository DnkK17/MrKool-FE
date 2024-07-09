import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api';

export const fetchStations = createAsyncThunk(
  'stations/fetchStations',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { currentPage, pageSize, filter } = state.station;
    try {
      const response = await api.getStation();
      let data = response.$values; // Extract array from $values property

      console.log('API Response:', data); // Check returned data

      if (!Array.isArray(data)) {
        throw new Error('Expected an array from API response');
      }

      // Apply filtering and pagination
      if (filter.searchTerm) {
        data = data.filter(station =>
          station.title && station.title.toLowerCase().includes(filter.searchTerm.toLowerCase())
        );
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

export const fetchStationById = createAsyncThunk(
  'stations/fetchStationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getStationById(id);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const searchStations = createAsyncThunk(
  'stations/searchStations',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.searchStations(keyword);
      let data = response.$values; // Extract array from $values property

      if (!Array.isArray(data)) {
        throw new Error('Expected an array from API response');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const stationSlice = createSlice({
  name: 'station',
  initialState: {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    filter: {
      searchTerm: '',
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
      .addCase(fetchStations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStationById.fulfilled, (state, action) => {
        state.loading = false;
        // Check if the station already exists in the array
        const index = state.data.findIndex(station => station.stationID === action.payload.stationID);
        if (index !== -1) {
          // Update existing station
          state.data[index] = action.payload;
        } else {
          // Add new station
          state.data.push(action.payload);
        }
      })
      .addCase(fetchStationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchStations.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchStations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Assume filtered array is returned
      })
      .addCase(searchStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setPageSize, setFilter } = stationSlice.actions;
export default stationSlice.reducer;
