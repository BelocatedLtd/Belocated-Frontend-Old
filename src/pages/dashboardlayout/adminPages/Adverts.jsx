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
    <div className="relative border cursor-pointer hover:shadow flex w-full h-fit p-[1.5rem] rounded-2xl">
      <MdOutlineKeyboardArrowLeft
        size={30}
        onClick={() => navigate(-1)}
        className="mr-1 cursor-pointer"
      />
      <p className="font-semibold text-xl text-gray-700">Adverts</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          {adverts.map((advert) => (
            <div key={advert._id} className="bg-white p-4 rounded-lg shadow-md mb-4 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white shadow-lg rounded-lg p-6 relative">
                    <image
                      src={icons?.find((icon) => icon.platform === advert.platform)?.icon}
                      alt={advert.platform}
                      className="w-6 h-6"
                    />
                    <div>
                      <span className="text-gray-500">{advert.date}</span>
                      <h3 className="text-base font-medium text-black">{advert.title}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-gray-700 text-xs">
                  <span className="font-bold">Amount:</span> ₦{advert.adAmount}
                </p>
                <p className="text-gray-700 text-xs">
                  <span className="font-bold">Tasks Submitted:</span> {advert.tasks}
                </p>
              </div>

              <div className="mt-2">
                <p>
                  <span className="font-medium">Link:</span>{' '}
                  <a
                    href={advert.socialPageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {advert.socialPageLink.slice(0, 20)}
                  </a>
                </p>
                <p className="text-gray-700 text-xs">
                  <span className="font-bold">Units left:</span> {advert.desiredROI}
                </p>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Moderator:</strong> {advert.tasksModerator}
                </p>
                <div>
                  <span
                    className={`px-2 py-1 border border-green-500 rounded text-black
                      ${advert.status === 'Pending' && 'bg-yellow-400'}
                      ${advert.status === 'Running' && 'bg-blue-500'}
                      ${advert.status === 'Allocating' && 'bg-orange-400'}
                      ${advert.status === 'Completed' && 'bg-green-500'}
                      ${advert.status === 'Rejected' && 'bg-red-500'}
                    `}
                  >
                    {advert.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/admin/dashboard/advert/tasks/${advert._id}`)}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View & Monitor Adverts
                </button>
              </div>
            </div>
          ))}

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
