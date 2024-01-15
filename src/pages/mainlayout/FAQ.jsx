import React from 'react'
import { useState } from 'react';
import {faqData} from '../../components/data/FAQData'
import { AiOutlineHolder } from 'react-icons/ai';

const FAQ = () => {
    const [isActive, setIsActive] = useState(false);

  return (
    <div className='w-full h-fit'>
        <div className='container flex flex-col items-center mx-auto leading-[1.2]'>
            <div className='w-full h-full py-[5rem] mt-[5rem] flex flex-col items-center justify-center mx-auto'>
            <h3 className='text-[#0F1741] px-6 text-[30px] md:text-[38px] mb-[5px] font-bold text-center'>Frequently Asked Questions</h3>
            <p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[800px] text-gray-600 leading-[1.5]'>Here are the most frequently asked questions to help you quickly get the answers to your most common questions</p>
            </div>
        </div>

        <div className='w-full h-fit flex justify-center bg-blue-200 py-[5rem]'>
          <div className='services-list flex flex-wrap w-fit md:w-1/2 h-fit px-[2rem] md:px-0' >
          {faqData?.map((item, index) => (
            <div key={index} className='w-fit md:w-full  py-6'>
              <div className='flex items-center gap-2 mb-[1rem]'>
                {/* <div>
                <img src={item?.icon} alt="social Icon" className='w-[25px] h-[25px]'/>
                </div> */}
                
              <h1 className='text-[25px] w-fit md:w-[500px] font-bold text-gray-800 leading-[1.4em]'>{item?.question}</h1>
              <AiOutlineHolder className='rotate-90 text-2xl text-tertiary'/>
              </div>
              <p className='w-fit md:w-[500px] text-[18px] my-6'>{item?.answer}</p>
            </div>
          ))}
          </div>
        </div>
    </div>
  )
}

export default FAQ