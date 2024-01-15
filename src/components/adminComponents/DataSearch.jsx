import React from 'react'

const DataSearch = ({placeholder, handleFilter}) => {
  return (
    <form className='md:flex mb-3'>
        <input type="text" placeholder={placeholder} onChange={handleFilter} className='w-[300px] px-5 py-2 border border-gray-200 rounded-2xl text-lg'/>
    </form>
  )
}

export default DataSearch