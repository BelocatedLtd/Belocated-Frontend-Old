import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdModeEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleGetALLUserAdverts, handleUpdateAdvert } from '../../../redux/slices/advertSlice';
import { selectIsError, selectIsLoading } from '../../../redux/slices/userSlice';
import { icons } from '../../../components/data/socialIcon';
import DeleteAdvertButton from '../../../components/adminComponents/DeleteAdvertModal';

const Adverts = () => {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adverts, setAdverts] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAdvert, setCurrentAdvert] = useState(null);
  const [formData, setFormData] = useState({
    adTitle: '',
    platform: '',
    service: '',
    desiredROI: '',
    costPerTask: '',
    earnPerTask: '',
    gender: '',
    state: '',
    lga: '',
    caption: '',
    adAmount: '',
    socialPageLink: '',
  });

  const handleEditClick = (e, advert) => {
    e.preventDefault();
    setCurrentAdvert(advert);
    setFormData({
      adTitle: advert.adTitle || '',
      platform: advert.platform || '',
      service: advert.service || '',
      desiredROI: advert.desiredROI || '',
      costPerTask: advert.costPerTask || '',
      earnPerTask: advert.earnPerTask || '',
      gender: advert.gender || '',
      state: advert.state || '',
      lga: advert.lga || '',
      caption: advert.caption ? advert.caption.join(', ') : '',
      adAmount: advert.adAmount || '',
      socialPageLink: advert.socialPageLink || '',
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentAdvert) return;

    const updatedData = {
      ...formData,
      caption: formData.caption.split(',').map((c) => c.trim()),
    };

    console.log('updated data',updatedData);

    await dispatch(handleUpdateAdvert({ advertId: currentAdvert._id, adFormData: updatedData }));
    setIsEditModalOpen(false);
    fetchAdverts(currentPage, rowsPerPage);
  };

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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Advert</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Title</label>
                <input type="text" name="adTitle" value={formData.adTitle} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Platform</label>
                <input type="text" name="platform" value={formData.platform} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Service</label>
                <input type="text" name="service" value={formData.service} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Desired ROI</label>
                <input type="number" name="desiredROI" value={formData.desiredROI} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Cost Per Task</label>
                <input type="number" name="costPerTask" value={formData.costPerTask} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Earn Per Task</label>
                <input type="number" name="earnPerTask" value={formData.earnPerTask} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Gender</label>
                <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">LGA</label>
                <input type="text" name="lga" value={formData.lga} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Caption</label>
                <textarea name="caption" value={formData.caption} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Ad Amount</label>
                <input type="number" name="adAmount" value={formData.adAmount} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Social Page Link</label>
                <input type="text" name="socialPageLink" value={formData.socialPageLink} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          {adverts.map((advert) => (
            <div key={advert._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center gap-4">
                <div style={{ float: 'right' }}>
                  <MdModeEdit size={20} onClick={(e) => handleEditClick(e, advert)} />
                </div>
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
                  <strong>Tasks Submitted:</strong> {advert.approvedTaskCount + advert.submittedTaskCount}
                </p>
                <p>
                  <strong>Tasks Approved:</strong> {advert.approvedTaskCount}
                </p>
                <p>
                  <strong>Tasks Waiting Approval:</strong> {advert.submittedTaskCount}
                </p>
                <p>
                  <strong>Units Left:</strong> {advert.desiredROI}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold">Gender:</span> {advert.gender}
                </div>
                <div>
                  <span className="font-bold">LGA:</span> {advert.lga}
                </div>
                <div>
                  <span className="font-bold">State:</span> {advert.state}
                </div>
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

              <div className="advert-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  {renderStatusBadge(advert.status)}
                </div>
                <div>
                  <DeleteAdvertButton advertId={advert._id} />
                </div>
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
