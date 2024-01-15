import React from 'react'
import nigerianStates from '../data/States'
import userprofileupdate from '../../assets/userprofileupdate.svg'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, selectUser } from '../../redux/slices/authSlice'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { getUser } from '../../services/authServices'
import { useNavigate } from 'react-router-dom'


const ProfileForm = ({profile, email, username, handleProfileUpdate, handleInputChange}) => {
   const user = useSelector(selectUser)
   const dispatch = useDispatch()
   const navigate = useNavigate()
    
  return (
    <div className='w-full h-fit flex flex-col md:flex-row'>
        <form onSubmit={handleProfileUpdate} className='w-full h-fit p-6 shadow-lg flex flex-1 flex-col'>
        <label htmlFor="user profile" className='font-bold'>User Profile Update</label>
                <div className='form__container flex flex-col w-full'>
                
                  <div className='text__fields'>
                          {/* Field Group */}
                          <div className='flex flex-col md:gap-6 w-full md:flex-row'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Product Name " className='text-left'>Full Name</label>
                                <input type='text' name="fullname" placeholder={profile?.fullname} value={profile.fullname} onChange={handleInputChange} className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />
                            </div>
                          </div>

                          {/* Field Group */}
                          

                          {/* Field Group */}
                          <div className='flex flex-col md:gap-6 w-full md:flex-row pt-[0.8rem]'>
                            <div className='flex flex-col mt-3 mb-3'>
                              <label htmlFor="location" className='text-left mb-1 ml-1'>Residential State</label>

                                <select 
                                  className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
                                  name="location" id="" placeholder={profile.location} value={profile.location} onChange={handleInputChange}>
                                    <option value="">Select a state</option>
                                    {nigerianStates?.map((object, index) => (
                                      <option key={index} value={object.state}>{object.state}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col mt-3 mb-3'>
                              <label htmlFor="community" className='text-left mb-1 ml-1'>Residential LGA</label>
                                <select name="community" id="" placeholder={profile.community} value={profile.community} onChange={handleInputChange} className='shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'>
                                <option value="">Select a Local Government</option>
                                {nigerianStates
                                    .find((obj) => obj.state === profile.location)
                                    ?.community.map((city, index) => (
                                      <option key={index} value={city}>{city}</option>
                                    ))}
                                  </select>
                            </div>
                          </div>
                            
                          {/* Field Group */}
                          <div className='flex flex-col md:gap-6 w-full md:flex-row'>
                              <div className='flex flex-col mt-3 mb-3'>
                                  <label htmlFor="Minimun Coins" className='text-left mb-1 ml-1'>Gender</label>
                                  <select name="gender" id="gender" placeholder={profile?.gender} value={profile?.gender} onChange={handleInputChange} className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'>
                                  <option>Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  </select>
                              </div>

                              <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="religion" className='text-left mb-1 ml-1'>Religion</label>
                                <select name="religion" id="religion" placeholder={profile?.religion} value={profile?.religion} onChange={handleInputChange} className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'>
                                  <option>Select Religion</option>
                                  <option value="Christians">Christian</option>
                                  <option value="Muslims">Muslim</option>
                                  <option value="Athiests">Athiest</option>
                                  </select>
                              </div>
                          </div>

                  </div>
                </div>

                  <button type="submit"  className='w-full px-4 py-2  text-md rounded-xl bg-tertiary text-gray-100 mt-[2rem] mb-5 hover:bg-secondary'>Update!</button>
        </form>

        <div className='hidden w-full items-center justify-center md:flex md:flex-1'>
            <img src={userprofileupdate} alt=""  className='p-6 rounded-full w-[500px] h-[500px] md:sticky'/>
        </div>
    </div>
  )
}

export default ProfileForm