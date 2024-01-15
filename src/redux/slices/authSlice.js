import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateUser } from '../../services/authServices';
import { toast } from 'react-hot-toast';

const storedUser = localStorage.getItem('user')
const userData = JSON.parse(storedUser)

const initialState = {
    isLoggedIn: false,
    user: userData ? userData : null,
    username: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
}

//Update User
export const handleUpdateUser = createAsyncThunk(
    'auth/handleUpdateUser',
    async (formData, thunkAPI) =>
    {
        try {
            return await updateUser(formData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_USER: (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload))
    },
    SET_LOGIN(state, action) {
        state.isLoggedIn = true
    },
    SET_USERNAME(state, action) {
        state.username = action.payload
    },
    SET_USER_WALLET(state, action) {
        state.walletId = action.payload
    },
    // SET_USER(state, action) {
    //     const profile = action.payload
    //     state.user.id = profile?._id
    //     state.user.fullname = profile?.fullname
    //     state.user.username = profile?.username
    //     state.user.email = profile?.email
    //     state.user.phone = profile?.phone
    //     state.user.location = profile?.location
    //     state.user.religion = profile?.religion
    //     state.user.community = profile?.community
    //     state.user.gender = profile?.gender
    //     state.user.accountType = profile?.accountType
    //     state.user.bankName = profile?.bankName,
    //     state.user.bankAccountNumber = profile?.bankAccountNumber,
    //     state.user.accountHolderName = profile?.accountHolderName,
    //     state.user.isEmailVerified = profile?.isEmailVerified
    //    // state.user.isPhoneVerified = profile?.isPhoneVerified,
    //     state.user.taskCompleted = profile?.taskCompleted,
    //     state.user.taskOngoing = profile?.taskOngoing,
    //     state.user.adsCreated = profile?.adsCreated,
    //     state.user.freeTaskCount = profile?.freeTaskCount,
    //     state.user.walletId = profile?.walletId,
    //     state.user.referrersId = profile?.referrersId,
    //     state.user.referrals = profile?.referrals,
    //     state.user.token = profile?.token
    // },
    SET_LOGOUT(state, action) {
        state.user = null;
        state.isLoggedIn = false
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder

    //Update User
    .addCase(handleUpdateUser.pending, (state) => {
        state.isLoading = true
    })
    .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      
        const profile = action.payload
        state.user.fullname = profile.fullname
        state.user.username = profile.username
        state.user.email = profile.email
        state.user.phone = profile.phone
        state.user.location = profile.location
        state.user.religion = profile.religion
        state.user.community = profile.community
        state.user.gender = profile.gender
        toast.success('User Detailed Updated!')
    })
    .addCase(handleUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Failed to Update User details')
    })
  }
});


export const {SET_LOGIN, SET_USER_WALLET, SET_USER, SET_LOGOUT, SET_USERNAME} = authSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUser = (state) => state.auth.user
export const selectUsername = (state) => state.auth.username
export const selectUserId = (state) => state.auth?.user?._id

export default authSlice.reducer