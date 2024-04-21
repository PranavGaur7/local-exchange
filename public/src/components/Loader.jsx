import React from 'react'
import loader from "../assets/loader.gif"
import sec1 from "../assets/sec1-bg.png"
const Loader = ({bg}) => {
    return (
        <div className='h-screen w-full flex items-center justify-center bg-fixed' style={{ backgroundImage: `url(${bg})`}}>
            <img src={loader} alt="" className='h-40 ' />
        </div>)
}

export default Loader