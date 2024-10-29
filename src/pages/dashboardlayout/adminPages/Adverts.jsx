import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleGetALLUserAdverts } from '../../../redux/slices/advertSlice';
import { selectIsError, selectIsLoading } from '../../../redux/slices/userSlice';
import { icons } from '../../../components/data/socialIcon';

const Adverts = () => {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adverts, setAdverts] = useState([]);

  const fetchAdverts = async (page, rows) => {
    const response = await dispatch(handleGetALLUserAdverts({ page, limit: rows }));
    if (response.payload) {
      setTotalRows(response.payload.totalAdverts);
      setAdverts(response.payload.adverts);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAdverts(page, rowsPerPage);
  };

  const handleChangeRowsPerPage = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page
    fetchAdverts(1, rows);
  };

  const handleButtonClick = (e, advertId) => {
    e.preventDefault();
    navigate(`/admin/dashboard/advert/${advertId}`);
  };

  useEffect(() => {
    fetchAdverts(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const renderStatusBadge = (status) => {
    const statusColors = {
      Pending: 'bg-yellow-400',
      Running: 'bg-blue-500',
      Allocating: 'bg-orange-400',
      Completed: 'bg-green-500',
      Rejected: 'bg-red-500',
    };
    return (
      <span className={`px-2 py-1 border rounded text-black ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="relative border hover:shadow w-full p-6 rounded-2xl">
      <div className="flex items-center mb-6">
        <MdOutlineKeyboardArrowLeft
          size={30}
          onClick={() => navigate(-1)}
          className="cursor-pointer mr-2"
        />
        <p className="font-semibold text-xl text-gray-700">Adverts</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          {adverts.map((advert) => (
            <div key={advert._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={icons?.find((icon) => icon.platform === advert.platform)?.icon}
                  alt={advert.platform}
                  className="w-8 h-8"
                />
                <div>
                  <h3 className="text-lg font-medium">{advert.title}</h3>
                  <span className="text-gray-500 text-sm">{advert.date}</span>
                </div>
              </div>

              <div className="mt-2 text-sm">
                <p>
                  <strong>Amount:</strong> ₦{advert.adAmount}
                </p>
                 <p>
                  <strong>Tasks Submitted:</strong> {advert.tasks}
                </p>
				<p>
                  <strong>Tasks Approved:</strong> {advert.approvedTaskCount}
                </p>
                <p>
                  <strong>Units Left:</strong> {advert.desiredROI}
                </p>
              </div>

              <div className="mt-2">
                <p>
                  <strong>Link:</strong>{' '}
                  <a
                    href={advert.socialPageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {advert.socialPageLink.slice(0, 20)}...
                  </a>
                </p>
                <p className="text-sm">
                  <strong>Moderator:</strong> {advert.tasksModerator}
                </p>
              </div>

              <div className="mt-2">
                {renderStatusBadge(advert.status)}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => navigate(`/admin/dashboard/advert/tasks/${advert._id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View & Monitor Adverts
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <div>
              <label>
                Rows per page:
                <select
                  value={rowsPerPage}
                  onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
                  className="ml-2 p-1 border rounded"
                >
                  {[5, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-800 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(totalRows / rowsPerPage)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * rowsPerPage >= totalRows}
                className="px-3 py-1 bg-gray-800 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Adverts;
