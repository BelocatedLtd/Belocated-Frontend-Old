import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteTaskModal from '../../../components/adminComponents/DeleteTaskModal';
import TaskModal from '../../../components/adminComponents/TaskModal';
import Loader from '../../../components/loader/Loader';
import TaskProofModal from '../../../components/ui/TaskProofModal';
import { selectAllAdverts } from '../../../redux/slices/advertSlice';
import { selectTasks } from '../../../redux/slices/taskSlice';
import { selectUsers } from '../../../redux/slices/userSlice';
import { getTaskById } from '../../../services/taskServices';

const TaskSingle = () => {
  const { id } = useParams();
  const tasks = useSelector(selectTasks);
  const users = useSelector(selectUsers);
  const adverts = useSelector(selectAllAdverts);
  const navigate = useNavigate();

  const [taskPerformer, setTaskPerformer] = useState(null);
  const [advertiser, setAdvertiser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalBtn, setModalBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(false);
  const [slides, setSlides] = useState([]);
  const [ad, setAd] = useState(null);
  const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false);
  const [taskProof, setTaskProof] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true); // Start loader
        const taskDetails = await getTaskById(id);

        if (!taskDetails) {
          toast.error('Task not found.');
          return navigate('/tasks'); // Redirect if not found
        }

        // Update state with task data
        setTask(taskDetails);
        setSlides(taskDetails.proofOfWorkMediaURL || []);
        setTaskPerformer(taskDetails.taskPerformer);
        setAdvertiser(taskDetails.advertiser);
        setAd(taskDetails.advert);
      } catch (error) {
        toast.error(`Error fetching task: ${error.message}`);
        navigate('/tasks'); // Redirect on error
      } finally {
        setIsLoading(false); // Stop loader
      }
    };

    fetchTask(); // Fetch task on component mount
  }, [id, navigate]);

  const handleModal = () => {
    if (ad?.status === 'Pending Payment') {
      return toast.error('Task is yet to start running.');
    }
    if (task?.status === 'Awaiting Submission') {
      return toast.error('Task has not been performed yet.');
    }
    setModalBtn((prev) => !prev);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDelBtn((prev) => !prev);
  };

  const openPopup = (e, task) => {
    e.preventDefault();
    setTaskProof(task);
    setToggleTaskProofModal((prev) => !prev);
  };

  // Early return for loader and missing task scenarios
  if (isLoading) return <Loader />;
  if (!task) return <div>No task found.</div>;

  return (
    <div className='w-full h-fit'>
      {modalBtn && (
        <TaskModal handleModal={handleModal} task={task} taskPerformer={taskPerformer} />
      )}
      {delBtn && <DeleteTaskModal handleDelete={handleDelete} task={task} />}
      {toggleTaskProofModal && (
        <TaskProofModal toggleTaskProof={openPopup} task={taskProof} />
      )}

      <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
        <MdOutlineKeyboardArrowLeft size={30} onClick={() => navigate(-1)} />
        <div className='flex flex-col'>
          <p className='font-semibold text-xl text-gray-700'>Go back to Tasks</p>
          <small className='font-medium text-gray-500'>
            Here you can see the task details clearly and perform all sorts of actions on it.
          </small>
        </div>
      </div>

      <div className='container shadow-xl py-8 px-8 mt-8'>
        {/* Task Performer Details */}
        <div className='flex flex-col border-b border-gray-100 p-3 pb-6'>
          <label className='text-secondary text-2xl font-bold'>Task Performer</label>
          <div className='flex flex-col items-center gap-3 mt-3 md:flex-row'>
            <FaUser size={300} className='text-gray-800 border border-gray-100 p-8 rounded-full' />
            <div className='flex flex-col text-center gap-1 md:text-left'>
              <h3 className='text-3xl'>{taskPerformer?.fullname}</h3>
              <small className='text-gray-700 mt-[-0.7rem] mb-4 font-semibold'>
                @{taskPerformer?.username}
              </small>
              <button
                onClick={() => navigate(`/admin/dashboard/user/${taskPerformer?._id}`)}
                className='px-4 py-2 bg-secondary text-primary hover:bg-gray-900 mt-2'
              >
                View Task Performer
              </button>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className='flex flex-col md:flex-row'>
          <div className='flex-1 border-b border-gray-100 p-3 pb-6'>
            <label className='text-secondary text-2xl font-bold'>Task Details</label>
            <div className='flex flex-col gap-4 mt-3'>
              <div className='flex flex-col'>
                <label className='font-bold'>Task Title:</label>
                <p>{task?.title}</p>
              </div>
              <div className='flex flex-row gap-6'>
                <div>
                  <label className='font-bold'>Advertiser Name:</label>
                  <p>{advertiser?.username}</p>
                </div>
                <div>
                  <label className='font-bold'>Advert ID:</label>
                  <p>{task?.advertId}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='w-96 mx-auto mt-6'>
            {task?.proofOfWorkMediaURL?.length ? (
              <a onClick={(e) => openPopup(e, task)} className='text-blue-600 hover:text-red-600'>
                Click to view
              </a>
            ) : (
              <p>No Proof uploaded yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSingle;
