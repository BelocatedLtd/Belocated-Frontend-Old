import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { getAllUser } from '../../services/userServices'

const initialState = {
	//user: {},
	users: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
}

// Get All Users
export const handleGetAllUser = createAsyncThunk(
	'get/handleGetAllUser',
	async ({ page, limit }, thunkAPI) => {
		//console.log('🚀 ~ page, limit:', page, limit)
		try {
			return await getAllUser(page, limit)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			//Update User
			.addCase(handleGetAllUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleGetAllUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.users = action.payload
			})
			.addCase(handleGetAllUser.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				toast.error('Failed to Get Users')
			})
	},
})

export const selectUsers = (state) => state.user.users
export const selectIsLoading = (state) => state.user.isLoading
export const selectIsError = (state) => state.user.isError

export default userSlice.reducer
