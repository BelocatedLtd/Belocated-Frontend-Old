import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';
import { fundWallet, getWallet, getWithdrawals, withdrawWallet, getUserWithdrawals, deleteWithdrawal, confirmWithdrawal } from '../../services/walletServices';
//import { getUserWallet } from '../../services/walletServices';

const initialState = {
    walletValue: {
      userId: "",
      value: null,
      totalEarning: null,
      pendingBalance: null,
      amountSpent: null
    },
    wallets: [],
    transaction: null,
    transactions: [],
    withdraw: null,
    withdrawals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

// Get User Wallet
export const getUserWallet = createAsyncThunk(
  "wallet/handleGetUserWallet",
  async(__, thunkAPI) => {
      try {
        return await getWallet()
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

  // Fund User Wallet
export const fundUserWallet = createAsyncThunk(
  "wallet/handleFundUserWallet",
  async(trxData, thunkAPI) => {
      try {
        return await fundWallet(trxData) 
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

   // Withdraw User Wallet
export const withdrawUserWallet = createAsyncThunk(
  "wallet/handleWithdrawUserWallet",
  async(trxData, thunkAPI) => {
      try {
        return await withdrawWallet(trxData) 
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

  // Get All Users Withdrawals
export const handleGetWithdrawals = createAsyncThunk(
  "wallet/handleAllUserWithdrawals",
  async(__, thunkAPI) => {
      try {
        return await getWithdrawals()
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

   // Get User Withdrawals
export const handleGetUserWithdrawals = createAsyncThunk(
  "wallet/handlegetUserWithdrawals",
  async(userId, thunkAPI) => {
      try {
        return await getUserWithdrawals(userId)
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

     // Confirm Withdraw User Wallet
export const handleConfirmUserWithdrawal = createAsyncThunk(
      "wallet/handleConfirmUserWithdrawal",
      async ({ withdrawalRequestId, formData }, thunkAPI) => {
          try {
              return await confirmWithdrawal(withdrawalRequestId, formData);
          } catch (error) {
              const message = 
                  (error.response && error.response.data && error.response.data.message) || 
                  error.message || 
                  error.toString();
              return thunkAPI.rejectWithValue(message);
          }
      }
  );

     // Confirm Withdraw User Wallet
export const handleDeleteWithdrawal = createAsyncThunk(
  "wallet/handleDeleteWithdrawal",
  async(withdrawalRequestId, thunkAPI) => {
      try {
        return await deleteWithdrawal(withdrawalRequestId) 
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

          // Get User Wallet
          .addCase(getUserWallet.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getUserWallet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.walletValue = action.payload
          })
          .addCase(getUserWallet.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log(action.payload)
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Fund User Wallet
          .addCase(fundUserWallet.pending, (state) => {
            state.isLoading = true
          })
          .addCase(fundUserWallet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.walletValue = action.payload
          })
          .addCase(fundUserWallet.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Withdraw User Wallet
          .addCase(withdrawUserWallet.pending, (state) => {
            state.isLoading = true
          })
          .addCase(withdrawUserWallet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.walletValue = action.payload
            toast.success('Withdrawal request sent successfully')
          })
          .addCase(withdrawUserWallet.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Withdraws  all
          .addCase(handleGetWithdrawals.pending, (state) => {
            state.isLoading = true
          })
          .addCase(handleGetWithdrawals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.withdrawals = action.payload
          })
          .addCase(handleGetWithdrawals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Withdraws for User
          .addCase(handleGetUserWithdrawals.pending, (state) => {
            state.isLoading = true
          })
          .addCase(handleGetUserWithdrawals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.withdrawals = action.payload
          })
          .addCase(handleGetUserWithdrawals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Withdraws for User
          .addCase(handleConfirmUserWithdrawal.pending, (state) => {
            state.isLoading = true
          })
          .addCase(handleConfirmUserWithdrawal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.advert = action.payload
            state.withdraw = action.payload
            state.withdrawals.push(action.payload);
            toast.success("Withdrawal Approved Successfully")
          })
          .addCase(handleConfirmUserWithdrawal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Withdraws for User
          .addCase(handleDeleteWithdrawal.pending, (state) => {
            state.isLoading = true
          })
          .addCase(handleDeleteWithdrawal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.withdrawals = action.payload
          })
          .addCase(handleDeleteWithdrawal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })
        }
});

export const {} = walletSlice.actions
export const selectUserWallet = (state) => state.wallet.walletValue
export const selectWithdrawals = (state) => state.wallet.withdrawals
export const selectIsLoading = (state) => state.wallet.isLoading;
export const selectIsError = (state) => state.wallet.isError;
export const selectIsSuccess = (state) => state.wallet.isSuccess

export default walletSlice.reducer
