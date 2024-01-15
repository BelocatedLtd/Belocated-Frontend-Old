import React from 'react'
import { useState } from 'react'
import close from '../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'
import { fundUserWallet, selectUserWallet } from '../redux/slices/walletSlice'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { fundWallet } from '../services/walletServices'
import { LoaderIcon } from 'react-hot-toast'

const FundWallet = ({toggleFLWFunding, fundingAmount}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const wallet = useSelector(selectUserWallet)
    const [isLoading, setisLoading] = useState(false)

    // const handlePayment = async (e) => {
    //     e.preventDefault()
    //     const trxData = {
    //         userId: user.id,
    //         email: user.email,
    //         date: Date.now(),
    //         chargedAmount: fundingAmount.fundingAmount,
    //         trxId: Date.now(),
    //         paymentRef: Date.now(),
    //         status: "Approved Successfully"
    //     }

    //     //console.log(trxData)

    //     await dispatch(fundUserWallet(trxData))
    //     //const response = await fundWallet(trxData)
    // }


      // Fund wallet using flutterwave
      const config = {
        public_key: import.meta.env.VITE_FLUTTER_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: fundingAmount.fundingAmount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: user.email,
          phone_number: user.phone,
          name: user.fullname,
        },
        customizations: {
          title: `Fund User Wallet ${user.username}`,
          description: `Funding user wallet for user: ${user.id}`,
        },
      };

    
      const fwConfig = {
        ...config,
        text: 'Fund Wallet',
        callback: async (response) => {
          setisLoading(true)
            //if (response.status === 'completed'  && response.charge_response_message === 'Approved Successful') {
                const trxData = {
                    userId: user.id,
                    email: response?.customer?.email,
                    date: response.created_at,
                    chargedAmount: response.charged_amount,
                    trxId: response.transaction_id,
                    paymentRef: response.flw_ref,
                    status: response.charge_response_message
                }
                await dispatch(fundUserWallet(trxData))

                setisLoading(false)
            
          closePaymentModal()
        },
        onClose: () => {
            navigate(`/dashboard/${user.username}`)
        },
      }


  

        return ReactDOM.createPortal(
            <div className='wrapper'>
                <div className='relative modal w-[85%] md:w-[600px] h-fit bg-primary'>
                <img src={close} alt="close" onClick={toggleFLWFunding} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />
                <div className='w-full px-[2rem] py-[2rem] md:px-[3rem] md:py-[4rem]'>
                    <h1 className='font-bold mb-3 text-xl'>Hello Payment Method</h1>
                    <div className='mb-5 border-b border-gray-200 pb-6'>
                        <h3 className='font-bold mb-2 text-lg text-gray-700'>100% Secure, Reliable & Fast Payment </h3>
                        <small className='text-gray-700 text-[12px]'>Pay through our highly secured online payment partner using your masterCard/VISA/Verve card. Bank transfer via USSD or internet  bank transfer. You can select your preferred online payment method on the payment checkout page that comes up.</small>
                    </div>
    
                    <div className=' flex flex-col'>
                        <h3 className='font-bold text-lg text-gray-700'>Fund Your Wallet </h3>
                        <small className='mt-2'><span className='font-bold text-gray-900'>Current Wallet Balance:</span> ₦{wallet.value} | <span className='font-bold text-gray-900'>Funding Amount:</span> ₦{fundingAmount.fundingAmount}</small>
    
                        <div className='flex flex-col justify-center'>
                           
                            <p className='bg-red-400 text-primary p-5 my-3 text-[12px]'>Click the button below to fund your wallet now. On completion, fund gets added to your wallet immediately</p>

                            <button className='px-6 py-2 bg-secondary text-primary hover:bg-gray-800'><FlutterWaveButton {...fwConfig}   />{isLoading && <LoaderIcon />}</button>
                        </div>
                    </div>
                </div>
                  
    
                </div>
            </div>,
            document.getElementById("backdrop")
          )
  
}

export default FundWallet