import React from 'react'
import aboutImg from '../../assets/about.jpg'
import aboutIcon from '../../assets/about.png'
import ActivityFeed from '../../components/ActivityFeed'
import refd from '../../assets/refd.svg'
import adRoi from '../../assets/adRoi.svg'
import hah from '../../assets/hah.png'


const About = () => {
  return (
    <div className='w-full h-fit'>
      <div className='container h-full flex flex-col justify-center gap-7 mx-auto'>
            {/* Who we are */}
            <div className='flex flex-col h-full items-center justify-center mx-auto md:flex-row'>
                <div className='flex-1 flex w-full h-full flex-col mt-[3rem] px-[2rem] py-[4rem] gap-3'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-3xl text-gray-800 font-extrabold border-l-4 px-4 border-red-400'>Who We Are</h1>
                    </div>
                    <p className='w-full text-[20px] leading-8 text-gray-600 mt-3'>Belocated is an enterprising publicity and media service provider across industries.

                    We are a revolutionizing team of people dedicated to providing solutions to your publicity and media challenges</p>
                </div>

                <div className='flex-1 w-full h-full flex justify-center mt-[3rem]'>
                    <img src={refd} alt="pic reprentation" className="w-[300px] h-[300px]"/>
                </div>
            </div>

            {/* what we do */}
            <div className='flex flex-col mt-[5rem]'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-3xl text-gray-800 font-extrabold border-l-4 px-4 border-red-400'>What We Do</h1>
                </div>

                <div className='flex flex-col items-center gap-2 mt-[2rem] md:flex-row'>
                <div className='bg-gray-100 w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={adRoi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Locate Your Business</h2>
                    <p className='px-6'>In a global village such as the one we find ourselves today, being located is as important as your identity. There are uncountable opportunities out there for you but only if you can be located. With BeLocated platform you can access countless business and earning opportunities while listing opportunities for many others.</p>
                </div>

                <div className='bg-gray-100 w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={adRoi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Increase Your Business </h2>
                    <p className='px-6'>Increase your business visibility and create awareness for your brand and services through our customized publicity plan. With Belocated, there is a package for everyone no matter how little or how much your budget is. We work with your business goal and timeline to provide affordable publicity packages that will get you, your brand or your business located</p>
                </div>

                <div className='bg-gray-100 w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={adRoi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Earn Steady Income</h2>
                    <p className='px-6'>Belocated is more than just a business but an organization that rewards you for all transactions carried out on the platform. As a client, you earn guaranteed return on your business investments, visibr results as well as on time and quality service delivery. As a user you earn for every task performed on the platform. With Belocated, everyone is a WINNER!</p>
                </div>
                </div>
            </div>

            <div className='mt-[5rem]'>
                <h2 className="text-gray-600 px-6 text-[23px] md:text-[38px] mb-[5px] font-bold text-center">Across all media platforms, BeLocated drives the necessary <span className='text-red-500'>traffic, likes, followers, product review, comments and clicks</span> you need to take your business, product or brand to the next level.</h2>
                <h3 className="text-secondary text-[18px] mx-[1rem] w-fit md:text-[38px] mb-[1rem] text-center">We are a brand that does the unusual and so we stay outside the box to give our clients the very best services.</h3>
            </div>

            {/* Call to action */}
            <div className='mt-[5rem]'>
            <div className='flex flex-col items-center gap-2 mt-[2rem] md:flex-row'>
                <div className='bg-transparent w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center shadow-xl'>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>VISION</h2>
                    <p className='px-6'>We are dedicated to providing solutions to publicity and media challenges while providing earning opportunities to all users.</p>
                </div>

                <div className='bg-transparent w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center shadow-xl'>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>MISSION</h2>
                    <p className='px-6'>BeLocated is a people driven organization passionate about solving the one major problem of businesses and brands</p>
                </div>

                <div className='bg-transparent w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center shadow-xl'>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>VISIBILITY</h2>
                    <p className='px-6'>We partner with our clients by giving them a platform to be seen and with visibility comes the needed sales.</p>
                </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="flex flex-col mt-[5rem]">
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-3xl text-gray-800 font-extrabold border-l-4 px-4 border-red-400'>What We Do</h1>
                </div>

                <div className='flex flex-col md:flex-row'>
                    <div className='flex flex-col md:flex-row'>
                        <ul className='flex flex-col gap-[2rem]'>
                            <li className='w-full'>
                                <h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>People First:</h3>
                                <p className='w-[500px]'>Every product and service offered is inspired by the diverse needs of people. Having understood the struggles of new and existing businesses or brands with getting the needed publicity for their products, BeLocated is committed to solving these problems at all cost</p>
                            </li>

                            <li className='w-full'>
                                <h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>Dependability:</h3>
                                <p className='w-[500px]'>We take pride in the process and structures we have put in place to make us a highly dependable brand. Say no to unpredictable ads and poor-quality jobs. With BeLocated, quality is guaranteed.</p>
                            </li>

                            <li className='w-full'>
                                <h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>Creativity:</h3>
                                <p className='w-[500px]'>We do not just ‘think outside the box’ we are a brand that exist outside the ‘box’ because there is no limit to our learning and birthing new ideas to serve you better.</p>
                            </li>

                            <li className='w-full'>
                                <h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>Integrity:</h3>
                                <p className='w-[500px]'>We are guided by a strict standard of honesty and probity which makes us a trusted organization.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default About