import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllTransactions, getUserTransactions } from '../../services/transactionService';
import { toast } from 'react-hot-toast';

const initialState = {
    transaction: null,
    transactions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

// Get User Transactions
export const handleGetUserTransactions = createAsyncThunk(
    "get/handleGetUserTransactions",
    async(token, thunkAPI) => {
        try {
          return await getUserTransactions(token)
        } catch(error) {
            const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
        } 
    )


  // Get All Transactions
export const handleGetTransactions = createAsyncThunk(
  "get/handleGetTransactions",
  async(token, thunkAPI) => {
      try {
        return await getAllTransactions(token)
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get User Transactions
      .addCase(handleGetUserTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(handleGetUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload
      })
      .addCase(handleGetUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload) 
      })

    // Get All Transactions
    .addCase(handleGetTransactions.pending, (state) => {
      state.isLoading = true
    })
    .addCase(handleGetTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.transactions = action.payload
    })
    .addCase(handleGetTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload) 
    })
  }

});

export const {} = transactionSlice.actions
export const selectTransactions = (state) => state.transaction.transactions
export const selectIsLoading = (state) => state.transaction.isLoading;
export const selectIsError = (state) => state.transaction.isError;

export default transactionSlice.reducer