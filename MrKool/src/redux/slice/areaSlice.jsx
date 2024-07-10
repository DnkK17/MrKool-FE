import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api';

export const fetchAreas = createAsyncThunk(
  'area/fetchAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getArea();
      return response.$values;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAreaById = createAsyncThunk(
  'area/fetchAreaById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getAreaById(id);
      return response.$values;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchArea = createAsyncThunk(
  'area/searchArea',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.searchArea(keyword);
      return response.$values;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArea = createAsyncThunk(
  'area/createArea',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.createArea(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArea = createAsyncThunk(
  'area/updateArea',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.updateArea(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArea = createAsyncThunk(
  'area/deleteArea',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteArea(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const areaSlice = createSlice({
  name: 'area',
  initialState: {
    areas: [],
    area: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearArea: (state) => {
      state.area = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAreaById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAreaById.fulfilled, (state, action) => {
        state.loading = false;
        state.area = action.payload;
      })
      .addCase(fetchAreaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchArea.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = action.payload;
      })
      .addCase(searchArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArea.fulfilled, (state, action) => {
        state.loading = false;
        state.areas.push(action.payload);
      })
      .addCase(createArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArea.fulfilled, (state, action) => {
        const index = state.areas.findIndex(area => area.areaID === action.payload.areaID);
        if (index !== -1) {
          state.areas[index] = action.payload;
        }
      })
      .addCase(updateArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArea.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = state.areas.filter(area => area.areaID !== action.payload);
      })
      .addCase(deleteArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearArea } = areaSlice.actions;
export default areaSlice.reducer;
