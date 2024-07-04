import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api';


export const fetchModels = createAsyncThunk(
  'model/fetchModels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getModel();
      return response.$values;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchModelById = createAsyncThunk(
  'model/fetchModelById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getModelById(id);
      return response.$values;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchModel = createAsyncThunk(
  'model/searchModel',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.searchModel(keyword);
      return response.$values;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createModel = createAsyncThunk(
  'model/createModel',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.createModel(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateModel = createAsyncThunk(
  'model/updateModel',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.updateModel(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteModel = createAsyncThunk(
  'model/deleteModel',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteModel(id);
      return response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const modelSlice = createSlice({
  name: 'model',
  initialState: {
    models: [],
    model: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearModel: (state) => {
      state.model = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.loading = false;
        state.models = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchModelById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModelById.fulfilled, (state, action) => {
        state.loading = false;
        state.model = action.payload;
      })
      .addCase(fetchModelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchModel.fulfilled, (state, action) => {
        state.loading = false;
        state.models = action.payload;
      })
      .addCase(searchModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createModel.fulfilled, (state, action) => {
        state.loading = false;
        state.models.push(action.payload);
      })
      .addCase(createModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateModel.fulfilled, (state, action) => {
        const index = state.models.findIndex(model => model.conditionerModelID === action.payload.conditionerModelID);
        if (index !== -1) {
          state.models[index] = action.payload;
        }
      })
      .addCase(updateModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteModel.fulfilled, (state, action) => {
        state.loading = false;
        state.models = state.models.filter(model => model.id !== action.payload);
      })
      .addCase(deleteModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearModel } = modelSlice.actions;
export default modelSlice.reducer;
