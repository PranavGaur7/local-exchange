import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Contacts from '../chat component/Contacts'

const ProfileDetail = () => {
    const result = useSelector((store) => store.user.userDetails)
    return (
        <>
            {result && <div className={`hidden xl:block right-0 z-40 h-auto relative w-96 font-unbounded  bg-primary-color mx-0 xl:mx-5 my-0 xl:my-5 rounded-lg px-4 py-4 `}>

                <div>
                    <div className='h-28 w-full flex  mb-10'>
                        <div className='h-28 w-28 bg-center bg-cover bg-no-repeat bg-local rounded-md ' style={{ backgroundImage: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4azEguG9_sF536e2Z1He0V7vE56p6Qr5EKqGQ2U3IMlrFE9RcSEklLMeaL4FKwJ6MJG8&usqp=CAU"})` }}></div>
                        <div className='flex flex-col justify-between ms-5'>
                            <div className='text-icons-color text-2xl font-thin flex justify-end float-end'><i className='bx bx-edit-alt'></i></div>
                            <div className='flex flex-col items-start mb-2 '>
                                <span className='text-white capitalize font-light text-sm mb-2'>{result.username}</span>
                                <span className='text-white/70  font-light text-xs'>{result.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full overflow-y-scroll h-5/6'>
                    <div className='flex justify-between items-center'>
                        <p className='text-white font-light '>Recent Messages</p>
                        <Tooltip title="Recent chat with purchasers">
                            <i className='bx bx-help-circle text-2xl text-icons-color'></i>
                        </Tooltip>
                    </div>
                    <Contacts/>
                </div>
            </div>}
        </>
    )
}

export default ProfileDetail