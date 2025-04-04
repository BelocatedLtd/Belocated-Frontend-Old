import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  handleConfirmUserWithdrawal, 
  handleDeleteWithdrawal, 
  selectIsError, 
  selectIsLoading, 
  selectIsSuccess 
} from '../../redux/slices/walletSlice';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../utils/globalConfig';
import Loader from '../loader/Loader';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import { IoClose, IoTimeOutline } from 'react-icons/io5';

const socket = io.connect(`${BACKEND_URL}`);

const WithdrawalModal = () => {
  const { withdrawalRequestId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const isSuccess = useSelector(selectIsSuccess);
  const isError = useSelector(selectIsError);
  const location = useLocation();
  const { withdrawalList } = location.state || {};

  const [wdItem, setWdItem] = useState(null);
  const [wdUser, setWdUser] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [userSocialName, setUserSocialName] = useState("");
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const inputFileRef = useRef(null);

  useEffect(() => {
    const wd = withdrawalList?.find(wd => wd?._id === withdrawalRequestId) || {};
    setWdItem(wd);
    setWdUser(wd?.user || {});
  }, [withdrawalRequestId, withdrawalList]);

  const { _id, withdrawAmount, withdrawMethod } = wdItem || {};

  const handleInputChange = (e) => {
    setUserSocialName(e.target.value);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setImageArray(files);

    const filePreviews = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prevImages => [...prevImages, ...filePreviews]);
  };

  const handleImageRemove = (imagePreview) => {
    const updatedImages = selectedImages.filter(img => img !== imagePreview);
    const updatedFiles = imageArray.filter(file => URL.createObjectURL(file) !== imagePreview);
    
    setSelectedImages(updatedImages);
    setImageArray(updatedFiles);
    URL.revokeObjectURL(imagePreview);
    toast.success("Image discarded successfully");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!imageArray.length) {
      toast.error("Please upload a screenshot to prove you performed the Task");
      return;
    }

    const formData = new FormData();
    imageArray.forEach(file => formData.append('images', file));
    formData.append('taskId', _id);
   
await dispatch(handleConfirmUserWithdrawal({ withdrawalRequestId: _id, formData }));

    if (isError) {
      toast.error("Error confirming withdrawal request");
      return;
    }

    if (isSuccess) {
      const emitData = {
        userId: wdUser?._id,
        action: `@${wdUser?.username} from ${wdUser?.location} just withdrew from their Belocated wallet`
      };
      socket.emit('sendActivity', emitData);
      navigate(-1);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(handleDeleteWithdrawal(_id));

    if (isError) {
      toast.error("Error deleting withdrawal request");
    }

    if (isSuccess) {
      toast.success("Withdrawal Rejected");
      navigate(-1);
    }
  };

  return (
    <div className='w-full h-fit'>
      {isLoading && <Loader />}
      <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
        <MdOutlineKeyboardArrowLeft size={30} onClick={() => navigate(-1)} />
        <div className='flex flex-col'>
          <p className='font-semibold text-xl text-gray-700'>Go back to Withdrawal Request List</p>
          <small className='font-medium text-gray-500'>Here you can see the task details clearly and perform all sorts of actions on it.</small>
        </div>
      </div>
      <div className='container flex flex-col mx-auto w-fit md:w-[50%] h-fit shadow-xl py-[2rem] px-[2rem] mt-[2rem]'>
        <div className='w-full border-b border-gray-200 shadow-sm flex flex-col md:flex-row justify-center items-center py-[1.5rem] gap-1'>
          <div className='flex items-center gap-1'>
            <label htmlFor="wallet balance" className='font-bold'>Withdraw Amount:</label>
            <p>₦{withdrawAmount}</p>
          </div>
        </div>

        <div className='w-[85%] md:w-[400px] h-fit flex items-center justify-center mx-auto'>
          <div className='flex flex-col justify-center items-center md:p-[3rem] gap-2'>
            <div className='withdrawMethod w-full flex flex-col justify-center text-center mt-[1rem]'>
              <label htmlFor="fund account" className='w-full font-bold text-[12px]'>This User would like to be paid by <span className='text-tertiary'>{withdrawMethod?.toUpperCase()}</span></label>

              {withdrawMethod === "airtime" && (
                <div className='flex flex-col justify-center items-center gap-5 mt-[1rem]'>
                  <label htmlFor="fund account" className='font-bold text-sm'>{`Send ₦${withdrawAmount} airtime to:`}</label>
                  <p className='font-bold text-xl text-center'>0{wdUser?.phone}</p>
                </div>
              )}

              {withdrawMethod === "bank transfer" && (
                <div className='flex flex-col justify-center items-center gap-2 mt-[1rem]'>
                  <label htmlFor="fund account" className='font-bold text-sm'>{`You will transfer the sum of ₦${withdrawAmount} to this bank account details below:`}</label>
                  <div className='flex items-center gap-1'>
                    <label htmlFor="bankName" className='font-bold'>Bank Name:</label>
                    <p>{wdUser?.bankName}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <label htmlFor="accountHolderName" className='font-bold'>Account Name:</label>
                    <p>{wdUser?.accountHolderName}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <label htmlFor="bankAccountNumber" className='font-bold'>Account Number:</label>
                    <p>{wdUser?.bankAccountNumber}</p>
                  </div>
                </div>
              )}
            </div>

            <small onClick={() => navigate(-1)} className='flex items-center gap-1'><BiArrowBack /> Go Back</small>
          </div>
        </div>
      </div>

      <form onSubmit={handleOnSubmit} className='flex w-full flex-col'>
        <div className='w-full h-full flex flex-col pt-[1rem] items-center border-gray-200'>
          <label htmlFor='upload proof of work' className='text-gray-500 font-bold text-center'>
            Upload Proof of work
          </label>
          <p className='text-tertiary font-bold'>
            Ensure to upload the right proof to avoid your account being banned
          </p>
          <div className='w-full h-fit flex flex-wrap items-center justify-center gap-2 p-5'>
            {selectedImages.map((item, index) => (
              <div key={index} className='relative w-[200px] h-[200px]'>
                <img src={item} alt='preview' className='w-full h-full object-cover' />
                <GiCancel size={20} className='absolute text-tertiary top-0 right-0 cursor-pointer pr-1 pt-1' onClick={() => handleImageRemove(item)} />
              </div>
            ))}
          </div>

          <input 
            ref={inputFileRef}
            type="file" 
            accept="image/*" 
            onChange={handleFileSelect} 
            multiple 
            className='w-full p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]'
            style={{ display: 'none' }}
          />
          <button 
            type="button"
            onClick={() => inputFileRef.current.click()}
            className='w-full p-6 border-2 cursor-pointer border-dashed rounded-2xl h-22 border-gray-300 bg-gray-50'>
            <p className='text-center text-gray-500'>Click to select files</p>
          </button>
        </div>

        <div className='flex flex-col md:flex-row items-center'>
          <button onClick={handleOnSubmit} disabled={imageArray.length < 1} className='bg-gray-800 text-gray-100 px-6 py-1 mt-5'>
            {!isLoading ? "Approve" : "Confirming..."}
          </button>
          <button onClick={handleDelete} className='bg-tertiary text-gray-100 px-6 py-1 mt-5'>
            {!isLoading ? "Delete" : "Deleting..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawalModal;
