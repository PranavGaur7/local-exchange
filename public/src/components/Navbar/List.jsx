import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import Button from './Button'
import {motion } from 'framer-motion'
const List = () => {
    return (
       

            <motion.div className='font-unbounded fixed bg-[#1a1a1a]  h-screen w-[18.8rem]  flex flex-col z-50'
                key="modal"
                initial={{
                    x: "-100vw"
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    type: "tween",
                    duration: 0.5
                }}
            >
                <div className="logo mt-7">
                    <img className="h-20" src={logo} alt="" />
                </div>
                <ul className="text-white flex flex-col text-xl my-7 font-semibold">
                    <li className="px-8 uppercase flex items-center justify-between my-3  text-[#7E7EFF]"><Link to={'/'} >Home</Link>
                        <i className='bx bx-trending-down text-2xl ms-1'></i></li>
                    <li className="px-8 uppercase flex items-center justify-between my-3 items-transition-all ease-linear duration-200  hover:text-[#7E7EFF] [&>*:nth-child(2)]:opacity-0 [&>*:nth-child(2)]:hover:opacity-100"><Link to={'/market'} className="font-medium">Market</Link>
                        <i className='bx bx-trending-down text-2xl ms-1 transition-all ease-linear text-[#7E7EFF] '></i></li>
                    <li className="px-8 uppercase flex items-center justify-between my-3 items-transition-all ease-linear duration-200  hover:text-[#7E7EFF] [&>*:nth-child(2)]:opacity-0 [&>*:nth-child(2)]:hover:opacity-100"><Link className="font-medium">About</Link>
                        <i className='bx bx-trending-down text-2xl ms-1 transition-all ease-linear text-[#7E7EFF] '></i></li>
                    <li className="px-8 uppercase flex items-center justify-between my-3 items-transition-all ease-linear duration-200  hover:text-[#7E7EFF] [&>*:nth-child(2)]:opacity-0 [&>*:nth-child(2)]:hover:opacity-100"><Link to={'/profile'} className="font-medium">Profile</Link>
                        <i className='bx bx-trending-down text-2xl ms-1 transition-all ease-linear text-[#7E7EFF] '></i></li>

                </ul>
                <div className="ms-8 mt-3">
                    <Button />
                </div>
            </motion.div>
    )
}

export default List