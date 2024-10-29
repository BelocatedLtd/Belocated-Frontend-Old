import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteTaskModal from '../../../components/adminComponents/DeleteTaskModal';
import TaskModal from '../../../components/adminComponents/TaskModal';
import Loader from '../../../components/loader/Loader';
import TaskProofModal from '../../../components/ui/TaskProofModal';
import { selectAllAdverts } from '../../../redux/slices/advertSlice';
import { selectTasks, handleApproveTask, handleRejectTask, } from '../../../redux/slices/taskSlice';
import { selectUsers } from '../../../redux/slices/userSlice';
import { getTaskById } from '../../../services/taskServices';

const TaskSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adverts = useSelector(selectAllAdverts);
  const users = useSelector(selectUsers);

  const [task, setTask] = useState(null);
  const [taskPerformer, setTaskPerformer] = useState(null);
  const [advertiser, setAdvertiser] = useState(null);
  const [slides, setSlides] = useState([]);
  const [ad, setAd] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Default to true

  const [modalBtn, setModalBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(false);
  const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false);
  const [taskProof, setTaskProof] = useState(null);
  const [rejectMessage, setRejectMessage] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  // Fetch task details on component mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDetails = await getTaskById(id);
        console.log('Fetched Task Details:', taskDetails);
        setTask(taskDetails);
        setSlides(taskDetails.proofOfWorkMediaURL || []);
        setTaskPerformer(taskDetails.taskPerformer);
        setAdvertiser(taskDetails.advertiser);
        setAd(taskDetails.advert);
      } catch (error) {
        toast.error('Error fetching task: ' + error.message);
      } finally {
        setIsLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchTask();
  }, [id]);

  	
const approveTask = async (taskId) => {
  await dispatch(handleApproveTask({ taskId, status: 'Approved' ,  message: 'The advertiser approved this task'}));
};


const rejectTask = async (taskId, message) => {
  if (!message) {
    toast.error('Please provide a reason for rejection');
    return;
  }

  setIsRejecting(true);
  await dispatch(handleRejectTask({ taskId, status: 'Rejected', message }));
  setIsRejecting(false);

  if (isError) {
    toast.error('Error Rejecting Task');
  } else if (isSuccess) {
    toast.success('Task Rejected');
    setTask((prevList) => prevList.filter((task) => task._id !== taskId)); // Remove rejected task
  }
};

const handleRejectClick = (taskId) => {
  const message = prompt('Please provide a reason for rejection:');
  if (message) {
    rejectTask(taskId, message);
  }
};
const handleTaskApproval = async (e, clickedTask) => {
e.preventDefault();
e.stopPropagation();

if (clickedTask.status === 'Approved') {
  toast.success('Task has already been approved');
  return;
}

if (!clickedTask?._id) {
  toast.error('Task information missing');
  return;
}

setLoadingTaskId(clickedTask._id);


  const updatedTask = { ...clickedTask, status: 'Approved' };

// Optimistically update taskAdList
setTask((prevList) =>
  prevList.map((task) =>
    task._id === clickedTask._id ? updatedTask : task
  )
);
 await approveTask(clickedTask._id);

if (isError) {
  toast.error('Error Approving Task');
  // Revert UI update if error occurs
  setTask((prevList) =>
  prevList.map((task) =>
    task._id === clickedTask._id ? { ...task, status: 'Pending' } : task
  )
  );
  } else if (isSuccess) {
  toast.success('Task Approved');
  socket.emit('sendActivity', {
    userId: clickedTask.taskPerformerId,
    action: `@${clickedTask.taskPerformerId?.username} just earned ₦${clickedTask.toEarn} from a task completed`,
  });
}
};


  if (isLoading) {
    return <Loader />; // Show loader while loading
  }

  if (!task) {
    return <div>No task found.</div>; // Handle case where task is not available
  }

  const handleModal = () => setModalBtn(!modalBtn);
  const handleDelete = (e) => {
    e.preventDefault();
    setDelBtn(!delBtn);
  };

  const openPopup = (e, task) => {
    e.preventDefault();
    setTaskProof(task);
    setToggleTaskProofModal(!toggleTaskProofModal);
  };

  return (
    <div className="w-full h-fit">
     
      {delBtn && <DeleteTaskModal handleDelete={handleDelete} task={task} />}
      {toggleTaskProofModal && (
        <TaskProofModal toggleTaskProof={openPopup} task={taskProof} />
      )}

      <div className="flex items-center gap-3 border-b border-gray-200 pb-6">
        <MdOutlineKeyboardArrowLeft size={30} onClick={() => navigate(-1)} />
        <div className="flex flex-col">
          <p className="font-semibold text-xl text-gray-700">Go back to Tasks</p>
          <small className="font-medium text-gray-500">
            Here you can see the task details clearly and perform all sorts of
            actions on it.
          </small>
        </div>
      </div>

      <div className="container shadow-xl py-8 px-8 mt-8">
        {/* Task Performer Details */}
        <div className="box flex flex-col border-b border-gray-100 p-3 pb-6">
          <label htmlFor='adverter' className="text-secondary text-2xl font-bold">
            Task Performer
          </label>
          <div className="flex flex-col items-center gap-3 mt-3 md:flex-row">
            <FaUser size={300} className="text-gray-800 border p-8 rounded-full" />
            <div className="flex flex-col text-center gap-1 md:text-left">
              <h3 className="text-3xl">{taskPerformer?.fullname}</h3>
              <small className="text-gray-700 mt-[-0.7rem] mb-[1rem] font-semibold">
                @{taskPerformer?.username}
              </small>
              <button
                onClick={() => navigate(`/admin/dashboard/user/${taskPerformer?._id}`)}
                className="px-4 py-2 bg-secondary text-primary hover:bg-gray-900 mt-2"
              >
                View Task Performer
              </button>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="box flex flex-col border-b p-3 pb-6">
          <label className="text-secondary text-2xl font-bold">Task Details</label>
          <div className='box flex-col mt-5'>
            <p><label className='font-bold'>Title: </label>{task.title}</p>
          </div>
          <div className='box flex-col mt-5'>
            <p><label className='font-bold'>Platform: </label>{task.platform}</p>
          </div>
          <div className='box flex-col mt-5'>
            <p><label className='font-bold'>Status:</label> {task.status}</p>
          </div>
          <div className='box flex-col mt-5'>
            <p><label className='font-bold'>Advertiser:</label> {advertiser?.username}</p>
          </div>

          <div className='box flex-col mt-5'>
            <p><label className='font-bold'>Amount to Earn:</label> ₦{task.toEarn}</p>
          </div>
        </div>

        <div className='mt-3'>
       
          <div className='flex flex-col md:flex-row gap-2'>
            <button onClick={(e) => handleTaskApproval(e, task)}
              className={`px-4 py-2 text-xs rounded ${task.status === 'Approved'
                  ? 'bg-green-500'
                  : 'bg-yellow-500 hover:bg-green-500'
                } text-white`}
            >
              {task.status === 'Approved' ? 'Approved' : 'Approve'}
            </button>
            <button
              onClick={() => handleRejectClick(task._id)}
              className={`px-4 py-2 rounded bg-red-500 text-white ${isRejecting ? 'opacity-50' : ''
                }`}
              disabled={isRejecting}
            >
              {isRejecting ? 'Rejecting...' : 'Reject'}
            </button>
            <button
              onClick={() => setDelBtn(true)}
              className="py-2 px-5 bg-tertiary text-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSingle;
