import React from 'react'
import adRoi from '../../assets/adRoi.svg'
import money from '../../assets/money.png'
import roi from '../../assets/roi.png'

const Services = () => {
  return (
    <section className='w-full h-fit'>
        <div className='container flex flex-col items-center mx-auto leading-[1.2]'>
            <h3 className='text-xl md:text-3xl text-gray-600 font-extrabold border-l-4 px-4 border-red-400 text-center'>WITH BELOCATED, EVERYONE IS A WINNER</h3>
            <h3 className='text-secondary text-[18px] mx-[1rem] w-fit md:text-[38px] mb-[1rem] text-center'>It's all about reward!</h3>
            <p className='flex text-[15px] text-center mx-[1rem] w-fit md:w-[900px] text-gray-600 leading-[1.5]'>We reward our Clients/Advertisers with good services while upholding all our core values. But we don't stop there, we are also interested in our Earners by offering opportuinities to be rewarded for tasks performed on Belocated platform. Everyone gets more than they deserve on our platform because our users are our priority.</p>

            <div className='flex flex-col items-center gap-2 mt-[2rem] md:flex-row'>
                <div className='bg-gray-100 w-[350px] h-[400px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={roi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Massive ROI On Adverts</h2>
                    <p className='px-6'>A guaranteed quick & positive return on your business publicity investment. Monitor the progress of your order from your dashboard. Transparency + Speed + Efficiency = BeLocated ROI</p>
                </div>

                <div className='bg-gray-100 w-[350px] h-[400px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={adRoi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Affordable Pricing</h2>
                    <p className='px-6'>Get reliable publicity packages at very affordable rates. You can dictate the budget and details of your campaign with just few clicks. Are you in doubt? A trial will convince you and get you hooked</p>
                </div>

                <div className='bg-gray-100 w-[350px] h-[400px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={money} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Earn Steady Income</h2>
                    <p className='px-6'>Belocated offers you rewards for every media task you perform. Regardless of your social status, you can earn a steady income on BeLocated platform as long as you have a mobile device and data</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services