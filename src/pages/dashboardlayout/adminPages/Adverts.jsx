import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleGetALLUserAdverts } from '../../../redux/slices/advertSlice';
import { selectIsError, selectIsLoading } from '../../../redux/slices/userSlice';

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

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    setCurrentPage(1); // Reset to the first page
    fetchAdverts(1, rowsPerPage);
  };

  const handleButtonClick = (e, advertId) => {
    e.preventDefault();
    navigate(`/admin/dashboard/advert/${advertId}`);
  };

  useEffect(() => {
    fetchAdverts(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  return (
    <div className="w-full mx-auto mt-[2rem]">
      <div className="flex items-center justify-between mb-[2rem]">
        <div className="flex items-center">
          <MdOutlineKeyboardArrowLeft
            size={30}
            onClick={() => navigate(-1)}
            className="mr-1 cursor-pointer"
          />
          <p className="font-semibold text-xl text-gray-700">Adverts</p>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adverts.map((advert) => (
              <div
                key={advert._id}
                className="bg-white shadow-lg rounded-lg p-6 relative"
              >
                <p className="font-bold text-lg mb-2">{advert.userId?.fullname}</p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Platform:</strong> {advert.platform}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Service:</strong> {advert.service}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Units:</strong> {advert.desiredROI}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Amount:</strong> {advert.adAmount}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Tasks:</strong> {advert.tasks}
                </p>
                <div className="mb-2">
                  <a
                    href={advert.socialPageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {advert.socialPageLink}
                  </a>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Moderator:</strong> {advert.tasksModerator}
                </p>
                <p
                  className={`px-3 py-1 inline-block rounded-md text-white mb-3
                    ${advert.status === 'Pending' && 'bg-yellow-400'}
                    ${advert.status === 'Running' && 'bg-blue-500'}
                    ${advert.status === 'Allocating' && 'bg-orange-400'}
                    ${advert.status === 'Completed' && 'bg-green-500'}
                    ${advert.status === 'Rejected' && 'bg-red-500'}
                  `}
                >
                  {advert.status}
                </p>
                <button
                  onClick={(e) => handleButtonClick(e, advert._id)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md w-full"
                >
                  View
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <div>
              <label>
                Rows per page:
                <select
                  value={rowsPerPage}
                  onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
                  className="ml-2 p-1 border rounded"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </label>
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-800 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="mx-3">
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
