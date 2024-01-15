import React from 'react'
import happy from '../assets/happy.png'
import advertisment from '../assets/advertisment.png'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const HowItWorks = () => {
    
  return (
    <section className='w-full h-full mt-[5rem] mb-[5rem]'>
        
        <div className='container flex justify-center  gap-7 mx-auto'>
            <div className='w-full h-[800px] flex-1'>
                <img src={happy} alt="" className='w-full h-full object-cover'/>
            </div>

            <div className='flex flex-col flex-1'>
                <h1 className='w-[60%] text-3xl text-gray-800 font-extrabold'>Lorem ipsum dolor sit amet consectetur.</h1>
                <p className='w-[80%] text-[20px] leading-8 font-normal text-gray-600 mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, molestiae nam. Eum?</p>
                <div className='flex items-center gap-3 mt-[3rem]'>
                    <img src={advertisment} alt="" className='w-[70px] h-[70px]'/>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-extrabold text-gray-600 '>Lorem, ipsum dolor.</h3>
                        <p className='w-[60%] text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fuga doloribus delectus facere aut quam nisi ratione atque ea corporis. delectus facere aut quam nisi ratione atque ea corporis</p>
                    </div>
                </div>

                <div className='flex items-center gap-3 mt-5'>
                    <img src={advertisment} alt="" className='w-[70px] h-[70px]'/>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-extrabold text-gray-600 '>Lorem, ipsum dolor.</h3>
                        <p className='w-[60%] text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fuga doloribus delectus facere aut quam nisi ratione atque ea corporis. delectus facere aut quam nisi ratione atque ea corporis</p>
                    </div>
                </div>

                <div className='flex items-center gap-3 mt-5'>
                    <img src={advertisment} alt="" className='w-[70px] h-[70px]'/>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-extrabold text-gray-600 '>Lorem, ipsum dolor.</h3>
                        <p className='w-[60%] text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fuga doloribus delectus facere aut quam nisi ratione atque ea corporis. delectus facere aut quam nisi ratione atque ea corporis</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HowItWorks