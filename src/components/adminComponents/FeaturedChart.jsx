import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useState } from 'react'

const FeaturedChart = () => {
    const [target, setTarget] = useState(50000)
  return (
    <div className='flex-3 w-[400px] shadow-lg p-[10px]'>
        <div className="top flex items-center justify-between text-gray-500">
            <h1 className='title text-[16px] font-semibold'>Total Revenue</h1>
            <BsThreeDotsVertical size={20}/>

        </div>
        <div className="bottom flex flex-col  items-center justify-center gap-[15px] p-[20px]">
            <div className="featuredChart w-[100px] h-[100px]">
                <CircularProgressbar value={70} text='70%' strokeWidth={4}/>
            </div>
            <div className="title font-bold text-gray-600">Total Adverts Created Today</div>
            <div className="amount text-[30px]">₦5000</div>
            <p className="desc w-[250px] text-[12px] font-light text-gray-500 text-center">Previous transactions processing. Last payments may not be included.</p>

            <div className="summary w-[100%] flex items-center justify-between">
                <div className="item text-center">
                    <div className="itemTitle text-[14px] text-gray-600">Last Year</div>
                    <div className={`itemResult flex text-center mt-[10px] text-[14px] ${target >= 50000 && ('text-green-500')} ${target <= 0 && ('text-red-500')}`}>
                    {target > 12000 && <IoIosArrowUp size={15}/>}
                    {target < 12000 && <IoIosArrowDown size={15}/>}
                        <div className="resultAmount">₦60.6k</div>
                    </div>
                </div>
                <div className="item text-center">
                    <div className="itemTitle text-[14px] text-gray-600">Last Months</div>
                    <div className={`itemResult flex text-center mt-[10px] text-[14px] ${target >= 50000 && ('text-green-500')} ${target <= 0 && ('text-red-500')}`}>
                    {target > 12000 && <IoIosArrowUp size={15}/>}
                    {target < 50000 && <IoIosArrowDown size={15}/>}
                        <div className="resultAmount">₦60.6k</div>
                    </div>
                </div>
                <div className="item text-center">
                    <div className="itemTitle text-[14px] text-gray-600">Last Week</div>
                    <div className={`itemResult flex text-center mt-[10px] text-[14px] ${target >= 50000 && ('text-green-500')} ${target <= 0 && ('text-red-500')}`}>
                    {target > 12000 && <IoIosArrowUp size={15}/>}
                    {target < 50000 && <IoIosArrowDown size={15}/>}
                        <div className="resultAmount">₦60.6k</div>
                    </div>
                </div>
                <div className="item text-center">
                    <div className="itemTitle text-[14px] text-gray-600">Yesterday</div>
                    <div className={`itemResult flex text-center mt-[10px] text-[14px] ${target >= 50000 && ('text-green-500')} ${target <= 0 && ('text-red-500')}`}>
                    {target > 12000 && <IoIosArrowUp size={15}/>}
                    {target < 50000 && <IoIosArrowDown size={15}/>}
                        <div className="resultAmount">₦60.6k</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedChart