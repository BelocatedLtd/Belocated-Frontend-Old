import React from 'react'
import { useState } from 'react'
import close from '../../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useDispatch, useSelector } from 'react-redux'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import FundWallet from '../FundWallet'

const FundingForm = ({toggleFundingSelect}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fundingAmount, setFundingAmount] = useState()
    const [FLWFundingModal, setFLWFundingModal] = useState(false)

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setFundingAmount({ ...fundingAmount, [name]: value })
      }


      const toggleFLWFunding = (e) => {
        e.preventDefault()
        setFLWFundingModal(!FLWFundingModal)
        toggleFundingSelect(false)
      }

   
  

        return ReactDOM.createPortal(
            <div className='wrapper'>
                {FLWFundingModal && <FundWallet toggleFLWFunding={toggleFLWFunding} fundingAmount={fundingAmount} />}
                <div className='relative modal w-fit md:w-[600px] h-fit  bg-primary'>
                    <img src={close} alt="close" onClick={toggleFundingSelect} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />
                    <form onSubmit={toggleFLWFunding} className='flex flex-col justify-center items-center p-[4rem] gap-2'>
                        <label htmlFor="fund account" className='font-bold text-sm'>How much would you like to fund?</label>
                        <input type="number" name="fundingAmount" placeholder='Amount to fund' className='border border-gray-300 p-3 mb-2' onChange={handleInputChange}/>
                        <button type='submit' className='bg-gray-800 text-gray-100 px-6 py-1'>Fund Now!</button>
                    </form>
                </div>
        </div>,
            document.getElementById("backdrop")
          )
  
}

export default FundingForm


