import React from 'react'

const Maintainance = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[70%] h-fit flex flex-col justify-center items-center shadow-2xl gap-5 py-[5rem] px-[2rem] rounded-2xl'>
            <h1 className='text-2xl md:text-3xl font-extrabold text-center text-gray-800'>This Website is Under Maintainance</h1>
            <h2 className='text-[18px] md:text-xl font-light'>Please reach out to the Admin</h2>
            <div className='w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5'>
                <div className='flex items-center gap-1'>
                    <label className='font-bold'>Email:</label>
                    <p>cs@belocated.ng</p>
                </div>

                <div className='flex items-center gap-1'>
                    <label className='font-bold'>Phone:</label>
                    <p>+234 813 041 2246</p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Maintainance