import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import {
	approveTask,
	createTask,
	getTasks,
	getUserTaskById,
	getUserTasks,
	rejectTask,
	submitTask,
} from '../../services/taskServices'

// Define the initial state type
interface TaskState {
	task: any | null
	tasks: any[]
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string
	
}

// Define task data types
interface TaskData {
	taskId: any
	status: string
	message: string
}

interface FormData {
	formData: any
}

// Initial state
const initialState: TaskState = {
	task: null,
	tasks: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Create New Task
export const createNewTask = createAsyncThunk<any, any>(
	'create/createNewTask',
	async (taskData, thunkAPI) => {
		try {
			return await createTask(taskData)
		} catch (error: any) {
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

// Get User Tasks
export const handleGetUserTasks = createAsyncThunk<any, void>(
	'get/handleGetUserTasks',
	async (_, thunkAPI) => {
		try {
			return await getUserTasks({})
		} catch (error: any) {
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

// Get Tasks
export const handleGetTasks = createAsyncThunk<any, void>(
	'get/handleGetTasks',
	async (_, thunkAPI) => {
		try {
			return await getTasks()
		} catch (error: any) {
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
export const handleSubmitTask = createAsyncThunk<any, FormData>(
  'create/handlesubmitTask',
  async (formData, thunkAPI) => {
    try {
      const response = await submitTask(formData);
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Task submission failed');
      }
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Task submission error';
      toast.error(message);  // Ensure toast is here for visibility
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Approve Task
export const handleApproveTask = createAsyncThunk<any, TaskData>(
	'tasks/handleApproveTask',
	async (approveTaskData, thunkAPI) => {
		try {
			return await approveTask(approveTaskData)
		} catch (error: any) {
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

// Reject Task


export const handleRejectTask = createAsyncThunk<any, string>(
	'create/handleRejectTask',
	async (taskData, thunkAPI) => {
		try {
			return await rejectTask(taskData)
		} catch (error: any) {
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
export const handleGetTaskById = createAsyncThunk<any, string>(
	'get/handleGetTaskById',
	async (taskId, thunkAPI) => {
		try {
			const response = await getUserTaskById(taskId)
			return response
		} catch (error: any) {
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
			.addCase(createNewTask.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.task = action.payload
				toast.success('Task Created Successfully')
				if (Array.isArray(state.tasks)) {
					state.tasks.push(action.payload)
				} else {
					state.tasks = [action.payload]
				}
			})
			.addCase(createNewTask.rejected, (state, action: PayloadAction<any>) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				toast.error(action.payload)
			})

			// Get User Tasks
			.addCase(handleGetUserTasks.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleGetUserTasks.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.tasks = action.payload
				},
			)
			.addCase(
				handleGetUserTasks.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)

			// Get Tasks
			.addCase(handleGetTasks.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleGetTasks.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.tasks = action.payload
				},
			)
			.addCase(handleGetTasks.rejected, (state, action: PayloadAction<any>) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				toast.error(action.payload)
			})

			// Submit Task
			.addCase(handleSubmitTask.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleSubmitTask.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.task = action.payload
					state.tasks.push(action.payload)
					toast.success('Task Submitted Successfully')
				},
			)
			.addCase(
				handleSubmitTask.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)

			// Approve Task
			.addCase(handleApproveTask.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleApproveTask.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false;
					state.isSuccess = true;
					state.isError = false;
			
					// Find the task to update by ID and update its status
					const updatedTaskIndex = state.tasks.findIndex(
						(task) => task._id === action.payload._id
					);
			
					if (updatedTaskIndex !== -1) {
						state.tasks[updatedTaskIndex] = {
							...state.tasks[updatedTaskIndex],
							...action.payload,
						};
					}
			
					toast.success('Task has been approved by admin');
				}
			)
			.addCase(
				handleApproveTask.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
					
				},
			)

			// Reject Task
			.addCase(handleRejectTask.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleRejectTask.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.task = action.payload
					state.tasks.push(action.payload)
					toast.success('Task has been rejected by admin')
				},
			)
			.addCase(
				handleRejectTask.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)
			.addCase(handleGetTaskById.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleGetTaskById.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.task = action.payload
				},
			)
			.addCase(
				handleGetTaskById.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)
	},
})

export const selectTask = (state: { task: TaskState }) => state.task.task
export const selectTasks = (state: { task: TaskState }) => state.task.tasks
export const selectIsLoading = (state: { task: TaskState }) =>
	state.task.isLoading
export const selectIsSuccess = (state: { task: TaskState }) =>
	state.task.isSuccess
export const selectIsError = (state: { task: TaskState }) => state.task.isError

export default taskSlice.reducer
