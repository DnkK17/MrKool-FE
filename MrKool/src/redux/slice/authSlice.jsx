
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api'; 

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.login(credentials);
            return response.data; // Assuming your API returns data directly
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.register(userData);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const clearError = () => {
    return {
        type: 'auth/clearError',
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        // Any additional reducers can be added here
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
