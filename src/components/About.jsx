import React from 'react'
import aboutImg from '../assets/about.jpg'
import aboutIcon from '../assets/about.png'
import ActivityFeed from './ActivityFeed'

const About = () => {
  return (
    <section className='w-full h-fit md:h-screen mb-[3rem]'>
        <div className='container h-full flex flex-col justify-start gap-7 my-[3rem] mx-auto md:flex-row md:items-center'>
            <div className='flex h-full flex-col justify-center'>
                <div className='flex w-full h-full flex-col px-[2rem] py-[4rem] gap-3'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-3xl text-gray-600 font-extrabold border-l-4 px-4 border-red-400'>About Belocated </h1>
                    </div>
                    <p className='w-full text-[20px] leading-10 text-gray-600 mt-3 md:text-left'>Belocated is a people driven organization passionate about solving the one major problem of businesses and brands - Visibility. <br/> <br/> 
                    We partner with our clients by giving them a platform to be seen and with visibility comes the needed sales.<br/> <br/> 
                    Across all media platforms, Belocated  drives the necessary traffic, likes, followers, product review, comments and the clicks you need to take your business, product or brand to the next level</p>
                </div>

                {/* <div className='stats flex gap-5 mt-5'>
                    <div className='flex items-center'>
                        <img src={aboutIcon} alt="about us" className='w-[70px] h-[70px]' />
                       <div className='flex flex-col'>
                            <p className='text-2xl text-gray-700 font-extrabold'>30K</p>
                            <small className='text-gray-500'>Members</small>
                       </div>
                    </div>
                    <div className='flex items-center'>
                        <img src={aboutIcon} alt="about us" className='w-[70px] h-[70px]' />
                       <div className='flex flex-col'>
                            <p className='text-2xl text-gray-700 font-extrabold'>10K</p>
                            <small className='text-gray-500'>Advertisers</small>
                       </div>
                    </div>
                    <div className='flex items-center'>
                        <img src={aboutIcon} alt="about us" className='w-[70px] h-[70px]' />
                       <div className='flex flex-col'>
                            <p className='text-2xl text-gray-700 font-extrabold'>300K</p>
                            <small className='text-gray-500'>Tasks Completed</small>
                       </div>
                    </div>

                </div> */}
            </div>

            <div className='flex mb-[3rem] px-[2rem]'>
                <ActivityFeed />
            </div>
        </div>
    </section>
  )
}

export default About