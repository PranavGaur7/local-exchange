import React from 'react'
import empty from "../assets/empty.png"
const Empty = () => {
  return (
    <div className='h-screen w-full flex  justify-center'>
        <img src={empty} alt=""  className='h-60 m-36'/>
    </div>
  )
}

export default Empty