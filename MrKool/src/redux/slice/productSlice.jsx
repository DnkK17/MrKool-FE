import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://65a09e6c600f49256fb01938.mockapi.io/api/product');
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
const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.totalPages = Math.ceil(action.payload / state.pageSize);
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { setCurrentPage, setPageSize } = productSlice.actions;
export default productSlice.reducer;