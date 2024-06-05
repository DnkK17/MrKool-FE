import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const { currentPage, pageSize, filter } = state.product;
        try {
            const response = await fetch('https://65a09e6c600f49256fb01938.mockapi.io/api/product');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();

            // Apply search filter
            if (filter.searchTerm) {
                data = data.filter(product =>
                    product.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
                );
            }

            // Apply price range filter
            if (filter.priceRange) {
                data = data.filter(product => {
                    if (filter.priceRange === 'low') return product.price < 100;
                    if (filter.priceRange === 'medium') return product.price >= 100 && product.price < 500;
                    if (filter.priceRange === 'high') return product.price >= 500;
                    return true;
                });
            }

            // Apply pagination
            const totalPages = Math.ceil(data.length / pageSize);
            const start = (currentPage - 1) * pageSize;
            const paginatedData = data.slice(start, start + pageSize);

            return { data: paginatedData, totalPages };
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
            state.currentPage = 1; // Reset to first page on page size change
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.currentPage = 1; // Reset to first page on filter change
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCurrentPage, setPageSize, setFilter } = productSlice.actions;
export default productSlice.reducer;
