
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectIsLoading } from '../../../redux/slices/taskSlice';
import DeleteTaskModal from '../../../components/adminComponents/DeleteTaskModal';
import TaskModal from '../../../components/adminComponents/TaskModal';
import { getTasksByAdvertId } from '../../../services/taskServices';
import TaskProofModal from '../../../components/ui/TaskProofModal';

const AdsTasksList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const [taskAdList, setTaskAdList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [modalBtn, setModalBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(false);
  const [taskPerformer, setTaskPerformer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Tasks per page
  const [totalRows, setTotalRows] = useState(0); // Total tasks available
  const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false);
  const [taskProof, setTaskProof] = useState(null);

  const fetchTasksByAdvertId = async () => {
    const resp = await getTasksByAdvertId({
      advertId: id,
      page: currentPage,
      limit: rowsPerPage,
      status: selectedStatus,
    });
    setTaskAdList(resp.tasks);
    setTaskPerformer(resp.taskPerformer);
	  console.log(taskPerformer)
    setTotalRows(resp.totalTasks);
  };

  const openPopup = (e, task) => {
    e.preventDefault();
    setTaskProof(task);
    setToggleTaskProofModal(!toggleTaskProofModal);
  };


  useEffect(() => {
    fetchTasksByAdvertId();
  }, [selectedStatus, currentPage]);

  const handleModal = () => setModalBtn(!modalBtn);
  const handleDelete = (e) => {
    e.preventDefault();
    setDelBtn(!delBtn);
  };

  const handleProofClick = (url) => {
    window.open(url, '_blank');
  };

  const totalPages = Math.ceil(totalRows / rowsPerPage);

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

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="py-2 px-4 border border-gray-400 rounded-md"
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Submitted">Submitted</option>
          <option value="Awaiting Submission">Awaiting Submission</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <p>Loading...</p>
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
				{modalBtn && <TaskModal
          handleModal={handleModal}
          task={task}
          taskPerformer={taskPerformer}
        />}
         {delBtn && <DeleteTaskModal handleDelete={handleDelete} task={task._id} />}
      {toggleTaskProofModal && (
        <TaskProofModal toggleTaskProof={openPopup} task={taskProof} />
      )}
    
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={handleModal}
                    className="py-2 px-5 bg-secondary text-primary"
                  >
                    Approve/Reject
                  </button>
                  <button
                    onClick={handleDelete}
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
                    onClick={() =>
                      handleProofClick(task.proofOfWorkMediaURL[0].secure_url)
                    }
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

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 border ${
              currentPage === index + 1
                ? 'bg-secondary text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      
    </div>
  );
};

export default AdsTasksList;
