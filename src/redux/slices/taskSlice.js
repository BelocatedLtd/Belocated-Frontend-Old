import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import {
	approveTask,
	createTask,
	getTasks,
	getUserTasks,
	rejectTask,
	submitTask,
} from '../../services/taskServices'

const initialState = {
	task: null,
	tasks: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Creat New Task
export const createNewTask = createAsyncThunk(
	'create/createNewTask',
	async (taskData, thunkAPI) => {
		try {
			return await createTask(taskData)
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

// Get User Tasks Get a specific user task
export const handleGetUserTasks = createAsyncThunk(
	'get/handleGetUserTasks',
	async (__, thunkAPI) => {
		try {
			return await getUserTasks()
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

// Get Tasks  Get all tasks from db
export const handleGetTasks = createAsyncThunk(
	'get/handleGetTasks',
	async ({ page, limit }, thunkAPI) => {
		try {
			return await getTasks(page,limit)
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

// Submit Task
export const handleSubmitTask = createAsyncThunk(
	'create/handlesubmitTask',
	async ({ formData }, thunkAPI) => {
		try {
			return await submitTask(formData)
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

// Approve Task
export const handleApproveTask = createAsyncThunk(
    'create/handleApproveTask',
    async (approveTask, thunkAPI) => {
        try {
            return await approveTask(approveTask); // Service call
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Reject Task
export const handleRejectTask = createAsyncThunk(
	'create/handleRejectTask',
	async (taskData, thunkAPI) => {
		try {
			return await rejectTask(taskData)
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

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			// Create New Task
			.addCase(createNewTask.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createNewTask.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				//console.log(action.payload)
				state.task = action.payload
				state.tasks.push(action.payload)
				toast.success('Task Created Successfully')
			})
			.addCase(createNewTask.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				toast.error(action.payload)
			})

		// Get User Tasks handleGetTasks
			.addCase(handleGetUserTasks.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleGetUserTasks.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.tasks = action.payload
			})
			.addCase(handleGetUserTasks.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				toast.error(action.payload)
			})

			// Get User Tasks
			.addCase(handleGetTasks.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleGetTasks.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.tasks = action.payload
			})
			.addCase(handleGetTasks.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				toast.error(action.payload)
			})

			// Submit Task
			.addCase(handleSubmitTask.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleSubmitTask.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.task = action.payload
				console.log(action.payload)
				state.tasks.push(action.payload)
				toast.success('Task Submitted Successfully')
			})
			.addCase(handleSubmitTask.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				toast.error(action.payload)
			})

			// Approve Task
			.addCase(handleApproveTask.pending, (state) => {
    state.isLoading = true;
})
.addCase(handleApproveTask.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;

    // Ensure action.payload is valid
    if (action.payload) {
        state.task = action.payload;
        state.tasks = [...state.tasks, action.payload]; // Immutable update
        toast.success('Task has been approved by admin'); // Optional: Move to middleware
    }
})
.addCase(handleApproveTask.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;

    // Validate action.payload for readable error message
   // Optional: Move to middleware
})

			// Reject Task
			.addCase(handleRejectTask.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleRejectTask.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.task = action.payload
				state.tasks.push(action.payload)
				toast.success('Task has been rejected by admin')
			})
			.addCase(handleRejectTask.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				toast.error(action.payload)
			})
	},
})

export const {} = taskSlice.actions
export const selectTask = (state) => state.task.task
export const selectTasks = (state) => state.task.tasks
export const selectIsLoading = (state) => state.task.isLoading
export const selectIsSuccess = (state) => state.task.isSuccess
export const selectIsError = (state) => state.task.isError

export default taskSlice.reducer
