import React from 'react'

const SummaryCard = ({icon, text, number,color}) => {
  return (
    <div className='rounded flex bg-white'>
      <div className={`text-3xl  flex items-center justify-center  ${color} px-4 bg-teal-600 text-white `}>
{icon}
      </div>
<div className='pl-4 py-1'>
    <p className='text-lg  font-semibold'>
{text}
    </p>
    <p className='text-2xl font-bold'>
{number}
    </p>
</div>

    </div>
  )
}

export default SummaryCard
