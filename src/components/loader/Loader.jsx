import React from 'react'
import loaderImg from '../../assets/loader.gif'
import  ReactDOM  from 'react-dom'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'>
            <img src={loaderImg} alt='loading...' />
        </div>
    </div>,
    document.getElementById("backdrop")
  )
};

export const SpinnerImg = () => {
    return (
        <div className='loader'>
            <img src={loaderImg} alt='loading...' />
        </div>
    )
}

export default Loader