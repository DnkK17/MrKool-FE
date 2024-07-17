// src/redux/slice/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all accounts
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const response = await fetch('https://65a09e6c600f49256fb01938.mockapi.io/api/users');
  return response.json();
});

// Create new account
export const createAccount = createAsyncThunk('accounts/createAccount', async (accountData) => {
  const response = await fetch('https://65a09e6c600f49256fb01938.mockapi.io/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  });
  return response.json();
});

// Update an existing account
export const updateAccount = createAsyncThunk('accounts/updateAccount', async ({ id, data }) => {
  const response = await fetch(`https://65a09e6c600f49256fb01938.mockapi.io/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

// Delete an account
export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (accountId) => {
  await fetch(`https://65a09e6c600f49256fb01938.mockapi.io/api/users/${accountId}`, {
    method: 'DELETE',
  });
  return accountId;
});



// Create userSlice
const userSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch accounts reducers
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add account reducers
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update account reducers
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAccount = action.payload;
        const index = state.accounts.findIndex(account => account.id === updatedAccount.id);
        if (index !== -1) {
          state.accounts = state.accounts.map(account =>
            account.id === updatedAccount.id ? { ...account, ...updatedAccount } : account
          );
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete account reducers
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.filter(account => account.id !== action.payload);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
