import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAdvert, getAllUserAdverts, getUserAdverts, setAdvertFree } from '../../services/advertService'

import { toast } from 'react-hot-toast';

const initialState = {
  advert: null,
  adverts: [],
  allAdverts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "" 
}

// Creat New Ad
export const createNewAdvert = createAsyncThunk(
  "create/createNewAdvert",
  async (paymentFormData, thunkAPI) => {
    try {
      return await createAdvert(paymentFormData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Toggle Free Ad State
export const handleToggleFreeAdvert = createAsyncThunk(
  "freeAd/adType",
  async (id, thunkAPI) => {
    try {
      return await setAdvertFree(id)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get User Adverts
export const handleGetUserAdverts = createAsyncThunk(
  "get/handleGetUserAdverts",
  async(__, thunkAPI) => {
      try {
        return await getUserAdverts()
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )

  // Get User Adverts
export const handleGetALLUserAdverts = createAsyncThunk(
  "get/handleGetAllUserAdverts",
  async(__, thunkAPI) => {
      try {
        return await getAllUserAdverts()
      } catch(error) {
          const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
      } 
  )




const advertSlice = createSlice({
  name: 'advert',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

          // Create New Advert
          .addCase(createNewAdvert.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false;
          })
          .addCase(createNewAdvert.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.advert = action.payload
            state.adverts.push(action.payload);
            toast.success("Advert Created Successfully")
          })
          .addCase(createNewAdvert.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Toggle Free Advert State
          .addCase(handleToggleFreeAdvert.pending, (state) => {
            state.isLoading = true
          })
          .addCase(handleToggleFreeAdvert.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.advert = action.payload
            state.adverts.push(action.payload);
            toast.success("Ad Type Changed")
          })
          .addCase(handleToggleFreeAdvert.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Get User Adverts
          .addCase(handleGetUserAdverts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(handleGetUserAdverts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.adverts = action.payload
          })
          .addCase(handleGetUserAdverts.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload) 
          })

          // Get All User Adverts
          .addCase(handleGetALLUserAdverts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(handleGetALLUserAdverts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.allAdverts = action.payload
          })
          .addCase(handleGetALLUserAdverts.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(state.message) 
          })
        }
});

export const {} = advertSlice.actions
export const selectAdvert = (state) => state.advert.advert
export const selectAdverts = (state) => state.advert.adverts 
export const selectAllAdverts = (state) => state.advert.allAdverts
export const selectIsLoading = (state) => state.advert.isLoading;
export const selectIsSuccess = (state) => state.advert.isSuccess;
export const selectIsError = (state) => state.advert.isError;

export default advertSlice.reducer