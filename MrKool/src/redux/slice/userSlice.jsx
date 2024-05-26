import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
    'product/fetchUser',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch('https://65a09e6c600f49256fb01938.mockapi.io/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  const userSlice = createSlice({
    name: 'product',
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
export default userSlice.reducer;