import React from 'react'
import close from '../../assets/close.svg'
import ReactDOM from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import Loader from '../loader/Loader'
import { selectUser } from '../../redux/slices/authSlice'
import { deleteAdvert } from '../../services/advertService'


const DeleteAdvertButton = ({ advertId, onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const adminUser = useSelector(selectUser);

    const confirmDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await deleteAdvert(advertId);

        setIsLoading(false);

        if (!response) {
            toast.error("Failed to delete Advert");
        } else {
            toast.success("Advert deleted");
            if (onSuccess) {
                onSuccess(advertId);
            } else {
                navigate(`/admin/dashboard/adverts/${adminUser.username}`);
            }
        }
    };

    return (
        <button
            onClick={confirmDelete}
            className='py-2 px-4 text-[15px] bg-red-600 text-white rounded-full hover:bg-red-700 transition'
            disabled={isLoading} // Disable the button while loading
        >
            {isLoading ? 'Deleting...' : 'Delete Advert'}
        </button>
    );
};

export default DeleteAdvertButton;
