import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { useDispatch,useSelector } from 'react-redux';
import { seCurrentUser } from '../../redux/userDetails/userSlice';
import { Link } from 'react-router-dom';
import { editKartAsync } from '../../redux/marketDetails/kartSlice';
const CardComponent = ({ item,isInKart }) => {
    const dispatch = useDispatch();
    const resultUser = useSelector((store) => store.user.userDetails)
    const handleClick =(e)=>{
        e.preventDefault()
        console.log(e.target.value);
        isInKart = true
        if(resultUser){

            dispatch((editKartAsync({
                kartDetails:e.target.value,
                mode:"add",
                auth:resultUser._id
            })))
        }
    }
    return (
        
        <Container>

            <motion.div className="z-10 w-full h-[400px] lg:w-[448px] xl:w-[512px]  lg:mx-5 my-5  border-2 flex flex-col justify-between  rounded-lg shadow bg-[#1a1a1a] border-[#2c2c2c]"
                
            >
                <div className='item w-full h-56 rounded-md bg-center bg-cover bg-no-repeat  bg-local mb-4' style={{ backgroundImage: `url(${item[6][0]})` }}>

                </div>

                <div className="px-5 pb-5">
                    <Link to={ `/market/${item[0]}`} >
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate hover:underline hover:underline-offset-2" >{item[1]}</h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5 text-[#ffffff93]">
                        {
                            `${item[8][3].name},${item[8][2].name}`
                        }
                    </div>
                    <div className="flex items-center justify-between ">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${item[7]}</span>
                        {
                            isInKart?
                            <a  className="text-white bg-secondary-color hover:bg-tertiary-color focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " aria-disabled="true">Already in cart</a>
                            :<button  className="text-white bg-secondary-color hover:bg-tertiary-color focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " value={item[0]} onClick={handleClick} >Add to cart</button>
                        }
                    </div>
                </div>
            </motion.div>
        </Container>

    )
}
const Container = styled.div`
    
`
export default CardComponent