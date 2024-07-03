// areaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../util/api';

export const getAreas = createAsyncThunk('area/getAreas', async () => {
    const response = await axiosClient.get('Area/Areas');
    return response.data;
});

export const getAreaById = createAsyncThunk('area/getAreaById', async (id) => {
    const response = await axiosClient.get(`Area/${id}`);
    return response.data;
});

export const getStationsByArea = createAsyncThunk('area/getStationsByArea', async (areaId) => {
    const response = await axiosClient.get(`Area/${areaId}/Stations`);
    return response.data;
});

const areaSlice = createSlice({
    name: 'area',
    initialState: {
        areas: [],
        currentArea: null,
        stations: [],
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
            .addCase(getAreas.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAreas.fulfilled, (state, action) => {
                state.loading = false;
                state.areas = action.payload;
            })
            .addCase(getAreas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getAreaById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAreaById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentArea = action.payload;
            })
            .addCase(getAreaById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getStationsByArea.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStationsByArea.fulfilled, (state, action) => {
                state.loading = false;
                state.stations = action.payload;
            })
            .addCase(getStationsByArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearError } = areaSlice.actions;
export default areaSlice.reducer;
