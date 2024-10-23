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
import { selectTasks } from '../../../redux/slices/taskSlice';
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
      {modalBtn && (
        <TaskModal
          handleModal={handleModal}
          task={task}
          taskPerformer={taskPerformer}
        />
      )}
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
          <label 	htmlFor='adverter' className="text-secondary text-2xl font-bold">
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
		  <div className='box flex-col'>
          <p>Title: {task.title}</p>
		  </div>
		  <div className='box flex-col'>
          <p>Platform: {task.platform}</p>
		  </div>
		  <div className='box flex-col'>
          <p>Status: {task.status}</p>
		  </div>
		  <div className='box flex-col'>
          <p>Advertiser: {advertiser?.username}</p>
		  </div>
		  <div className='box flex-col'>
          <p>Amount to Earn: ₦{task.toEarn}</p>
		  </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSingle;
