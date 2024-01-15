import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllActivities } from '../../services/feedService';
import { toast } from 'react-hot-toast';

const initialState = {
    activity: null,
    activities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

// Get All Activities
export const handleGetAllActivities = createAsyncThunk(
    "get/handleGetAllActivities",
    async(__, thunkAPI) => {
        try {
          return await getAllActivities()
        } catch(error) {
            const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
        } 
    )

    export const handleGetActivity = createAsyncThunk(
      "get/handleGetActivity",
      async(__, thunkAPI) => {
          try {
           // return await getActivity()
          } catch(error) {
              const message = 
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
              return thunkAPI.rejectWithValue(message)
          }
          } 
      )

  const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
      NEW_ACTIVITY(state, action) {
        state.activity = action.payload
        state.activities.push(action.payload)
    },
    },
    extraReducers: (builder) => {
      builder
  
        // Get User Transactions
        .addCase(handleGetAllActivities.pending, (state) => {
          state.isLoading = true
        })
        .addCase(handleGetAllActivities.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.activities = action.payload
        })
        .addCase(handleGetAllActivities.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload) 
        })

        // Get User Transactions
        .addCase(handleGetActivity.pending, (state) => {
          state.isLoading = true
        })
        .addCase(handleGetActivity.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.activity = action.payload;
          state.activities.push(action.payload);
        })
        .addCase(handleGetActivity.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload) 
        })
    }
  
  });
  
  export const {NEW_ACTIVITY} = feedSlice.actions
  export const selectActivities = (state) => state.feed.activities
  export const selectIsLoading = (state) => state.feed.isLoading;
  export const selectIsError = (state) => state.feed.isError;
  
  export default feedSlice.reducer