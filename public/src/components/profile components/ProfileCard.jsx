import { motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';

const ProfileCard = ({ show, setShow }) => {
    const result = useSelector((store) => store.user.userDetails)
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{
                duration: 0.4
            }}
            className='fixed font-unbounded w-screen h-screen  z-50 flex items-center justify-center top-0 left-0 bg-gray-950/85'
        >
            <button onClick={() => {
                console.log(show);
                setShow(false)
            }} className='xl:hidden z-50  right-10 top-24 absolute h-12 w-12 bg-center bg-cover bg-no-repeat bg-local rounded-full bg-white bg-opacity-85'>
                <i className='bx bxs-user-x text-2xl'></i>
            </button>
            <motion.div className='overflow-y-auto
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-11/12 sm:w-10/12 md:w-2/3   h-[700px] relative py-10 bg-white flex flex-col px-5 sm:px-10   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'
                initial={{
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                exit={{
                    opacity: 0,
                    scale: 0.5
                }}
                transition={{
                    duration: 0.5
                }}
            >
                <div className='bg-primary-color h-full w-full flex pt-4 ps-4 rounded-md'>
                    <div className='w-full flex flex-col items-center mb-10'>
                        <div className='mt-5 h-24 w-24 sm:h-36 sm:w-36 bg-center bg-cover bg-no-repeat bg-local rounded-md' style={{ backgroundImage: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4azEguG9_sF536e2Z1He0V7vE56p6Qr5EKqGQ2U3IMlrFE9RcSEklLMeaL4FKwJ6MJG8&usqp=CAU"})` }}></div>
                        <div className='flex flex-col justify-between'>
                            <div className='text-icons-color text-2xl font-thin flex justify-end float-end mt-5'><i className='bx bx-edit-alt'></i></div>
                            <div className='flex flex-col items-start mb-2'>
                                <span className='text-white capitalize font-bold text-base sm:text-xl md:text-2xl mb-3'>{result.username}</span>
                                <span className='text-white/70  font-light text-xs sm:text-lg md:text-xl'>{result.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between items-center px-2 mt-6'>
                        <p className='text-white font-light text-sm sm:text-base'>Recent Messages</p>
                        <Tooltip title="Recent chat with purchasers">
                            <i className='bx bx-help-circle text-2xl text-icons-color'></i>
                        </Tooltip>
                    </div>
                    <div className='bg-primary-color w-full min-h-48 rounded-md'>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ProfileCard