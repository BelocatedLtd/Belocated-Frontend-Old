import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectIsLoading } from '../../../redux/slices/taskSlice';
import DeleteTaskModal from '../../../components/adminComponents/DeleteTaskModal';
import TaskModal from '../../../components/adminComponents/TaskModal';
import { getTasksByAdvertId } from '../../../services/taskServices';
import { handleApproveTask, handleRejectTask, selectIsError, selectIsSuccess } from '../../../redux/slices/taskSlice';
import io from 'socket.io-client';
import { BACKEND_URL } from '../../../../utils/globalConfig';
import toast from 'react-hot-toast';
const socket = io.connect(`${BACKEND_URL}`);

const AdsTasksList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const isSuccess = useSelector(selectIsSuccess);
  const [taskAdList, setTaskAdList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [modalBtn, setModalBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(false);
  const [taskPerformer, setTaskPerformer] = useState(null);
	const [taskPerformers, setTaskPerformers] = useState(taskAdList || [])

  const [totalRows, setTotalRows] = useState(0); // Total tasks available
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [rejectMessage, setRejectMessage] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);


  const fetchTasksByAdvertId = async () => {
    try {
      const resp = await getTasksByAdvertId({
        advertId: id,
       
      });
      if (!resp || resp.tasks.length === 0) {
        toast.info('No submitted tasks available');
        return;
      }
      setTaskAdList(resp.tasks);
      setTaskPerformer(resp.taskPerformer);
      setTotalRows(resp.totalTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
	    toast.error('failed to fetch tasks')
    }
  };

  useEffect(() => {
    fetchTasksByAdvertId();
  }, [id]);

  const handleProofClick = (url) => {
    setModalContent(url);
    setIsModalOpen(true);
  };
	
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
      setTaskAdList((prevList) => prevList.filter((task) => task._id !== taskId)); // Remove rejected task
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
  setTaskAdList((prevList) =>
    prevList.map((task) =>
      task._id === clickedTask._id ? updatedTask : task
    )
  );
   await approveTask(clickedTask._id);

  if (isError) {
    toast.error('Error Approving Task');
    // Revert UI update if error occurs
    setTaskAdList((prevList) =>
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

    
const handleModal = () => setModalBtn(!modalBtn);
  const handleDelete = (e) => {
    e.preventDefault();
    setDelBtn(!delBtn);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return (
    <div className="w-full mx-auto mt-8 p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <MdOutlineKeyboardArrowLeft
            size={30}
            onClick={() => navigate(-1)}
            className="cursor-pointer mr-2"
          />
          <p className="font-semibold text-xl text-gray-700">User Tasks</p>
        </div>

        
      </div>

      <div className="space-y-6">
      {isLoading ? (
          <p>Loading...</p>
        ) : taskAdList.length === 0 ? (
          <p className="text-center text-gray-500">No Submitted tasks available</p>
        ) : (
          taskAdList.map((task) => (
  <div key={task._id} className="border-b pb-6">
    <h3 className="font-bold text-lg">Task: {task.title}</h3>
    <div className="flex justify-between items-center mt-4">
      <div>
        <p className="text-sm">
          <strong>Performer:</strong> {task.taskPerformerId?.fullname}
        </p>
        <p className="text-sm">
          <strong>Advertiser:</strong> {task.advertiserId?.fullname}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      {delBtn && <DeleteTaskModal handleDelete={handleDelete} task={task} />}

      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex gap-2">
          {/* Ensure performers are fetched correctly from task object */}
	
            <button onClick={(e) => handleTaskApproval(e, task)}
              className={`px-4 py-2 text-xs rounded ${
                task.status === 'Approved'
                  ? 'bg-green-500'
                  : 'bg-yellow-500 hover:bg-green-500'
              } text-white`}
            >
              {task.status === 'Approved' ? 'Approved' : 'Approve'}
            </button>
          
        </div>

        <button
                  onClick={() => handleRejectClick(task._id)}
                  className={`px-4 py-2 rounded bg-red-500 text-white ${
                    isRejecting ? 'opacity-50' : ''
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
              <div className="flex justify-between items-center mt-4 text-sm">
                <div>
                  <label>Social Media:</label>{' '}
                  <a
                    href={task.socialPageLink}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {task.socialPageLink.slice(0, 13)}...
                  </a>
                </div>

                <div>
                  <label>Status:</label> {task.status}
                </div>
              </div>

              <div className="mt-2">
  <label>Proof:</label>{' '}
  {task.proofOfWorkMediaURL?.[0]?.secure_url ? (
    <span
      onClick={() => handleProofClick(task.proofOfWorkMediaURL[0].secure_url)}
      className="text-blue-500 hover:text-red-500 cursor-pointer"
    >
      View Proof
    </span>
  ) : (
    'N/A'
  )}
              </div>
            </div>
          ))
        )}
      </div>

{isModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white p-5 rounded-md shadow-lg relative"
      style={{ width: '80%', height: '80%', maxWidth: '800px' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 p-3"
        onClick={closeModal}
	      style={{backgroundColor:'red', color:'white'}}
      >
        Close
      </button>
      <img
        src={modalContent}
        alt="Proof of Work"
        className="w-full h-full object-contain rounded-md"
	      style={{width:'100%', height:'100%'}}    
            />
          </div>
        </div>
      ) }
    </div>
  )
};

export default AdsTasksList;
