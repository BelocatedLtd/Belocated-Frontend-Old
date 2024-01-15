import React from 'react'
import { Link } from 'react-router-dom'
import twitter from '../assets/social icons/twitter.png'
import facebook from '../assets/social icons/facebook.svg'

const Footer = () => {
  return (
    <div className='w-full bg-gray-800 mt-[5rem]'>
      <footer className='container w-full flex justify-center items-center mx-auto text-gray-200 py-6 px-6'>
        <div className='w-full text-center'>&copy; 2023 Belocated - All Rights Reserved</div>
      </footer>
    </div>
  )
}

export default Footer