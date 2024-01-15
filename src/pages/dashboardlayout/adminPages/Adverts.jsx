import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetAllUser, selectIsError, selectIsLoading, selectUsers } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { selectAllAdverts, handleGetALLUserAdverts } from '../../../redux/slices/advertSlice';
import { toast } from 'react-hot-toast';

const Adverts = () => {
  const users = useSelector(selectUsers)
  const adverts = useSelector(selectAllAdverts)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)
  const sortIcon = <MdArrowDownward />;
  
const columns = [
  {
    name: 'Advertiser',
    selector: (row) => {
    const advertiser = users?.find(user => user._id === row?.userId)
          return (
            
              <div className='font-bold text-[13px]'>{advertiser?.fullname}</div>
            
          )
    }
  },
  {
    name: 'Platform',
    selector: row => row.platform,
    sortable: true
  },
  {
    name: 'Service',
    selector: row => row.service,

  },
  {
    name: 'Units',
    selector: row => row.desiredROI, 
    sortable: true
  },
  {
    name: 'Amount',
    selector: row => row.adAmount, 
    sortable: true
  },
  {
    name: 'Ad Type',
    cell: (row) => (
        <div className='w-full'>
          <p className=''>{row.isFree === true && "Free Ad"}</p>
          <p>{row.isFree === false && "Paid Ad"}</p>
        </div>
    ),
    sortable: true
  },
  {
    name: 'Tasks',
    selector: row => row?.tasks, 
    sortable: true
  },
  {
    name: 'Ad Url',
    cell: (row) => (
      <div className='w-full'>
        <a href={row?.socialPageLink} target="_blank" className='text-blue-600'>{row?.socialPageLink}</a>
      </div>
  ),
    selector: row => row?.tasks, 
    sortable: true
  },
  {
    name: 'Status',
    sortable: true,
    cell: (row) => (
      <p className={`px-6 py-1 rounded-[5px] 
          ${row.status === "Pending" && 'pending'}
          ${row.status === "Running" && 'running'}
          ${row.status === "Allocating" && 'allocating'}
          ${row.status === "Completed" && 'completed'}
          ${row.status === "Rejected" && 'rejected'}
          `}
       >
          {row.status}
      </p>
    )
  },
  {
    name: 'Actions',
    button: true,
    cell: (row) => (
      <button className={'px-6 py-2 bg-gray-800 text-primary rounded-[5px]'}
        onClick={(e) => handleButtonClick(e, row._id)}>
          View
      </button>
    )
  },
];

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#18141E',
      color: '#f4f4f4',
      fontSize: '15px'
    }
  },
}

const handleButtonClick = (e, advertId) => {
  e.preventDefault();
  //const [advert] = adverts?.find(advert => advert?._id === advertId) || {}
  navigate(`/admin/dashboard/advert/${advertId}`)
}

 useEffect(() => {
  dispatch(handleGetALLUserAdverts())

  if (isError) {
    toast.error("failed to fetch adverts")
  }

}, [isError, dispatch])


  return (
    <div className='w-full mx-auto mt-[2rem]'>
          <div className='flex items-center justify-between mb-[2rem]'>
                <div className='flex items-center'>
                <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))} className='mr-1'/>
                    <p className='font-semibold text-xl text-gray-700'>Adverts</p>
                </div>
          </div>
      <DataTable 
      columns={columns} 
      data={adverts}
      progressPending={isLoading}
      pagination
      selectableRows
      fixedHeader
      customStyles={customStyles}
      sortIcon={sortIcon}
      handleButtonClick={handleButtonClick}
      />
    </div>
  )

}

export default Adverts