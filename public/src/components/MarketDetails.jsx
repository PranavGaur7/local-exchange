import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query'
import getMarketItem from '../hooks/getMarketItem';
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import NavBar from './Navbar/NavBar';
import bg from "../assets/sec3-bg.png"

const MarketDetails = () => {
    const { itemId } = useParams();
    const result = useSelector((store) => store.kart.count);
    const navigate = useNavigate();
    const [itemDetails, setItemDetails] = useState({})
    const query = useQuery({
        queryKey: ['marketItem'], queryFn: async () => {
            const response = await getMarketItem({ itemId: itemId });
            setItemDetails(response.data)
            console.log(response.data);
            return response
        }
    })

    const [selectedIndex, setSelectedIndex] = useState();
    const currentImage = (index) => {
        console.log(index);
        setSelectedIndex(index)
    }
    return (
        <div className='bg-center bg-no-repeat bg-cover bg-fixed py-1' style={{ backgroundImage: `url(${bg})`}}>
            <NavBar />
            {itemDetails && <Container className='px-20  flex items-center justify-between font-unbounded -my-10 '>
                <div className='w-7/12   shadow-2xl h-[600px]  flex flex-col items-center justify-between rounded-lg  '>
                    <div className=' h-3/4 flex  items-center justify-center  bg-primary-color w-full rounded-t-lg shadow-sm'>
                        <img className='h-full ' src={itemDetails.productImages && (itemDetails.productImages[selectedIndex] || itemDetails.productImages[0])} alt="" />
                    </div>
                    <div className='flex w-full justify-between items-center px-5  py-3 mb-3'>
                        {
                            itemDetails.productImages && itemDetails.productImages.map((element, index) => {
                                return <img src={element} key={index} className={`lg:h-16 xl:h-24 rounded-md border-2  shadow-inner  ${index === selectedIndex ? "border-primary-color" : "border-primary-color/80"}`} alt="" onClick={() => currentImage(index)} />
                            })
                        }
                    </div>

                </div>
                <div className='w-4/12   h-[600px]   '>
                    <div className='w-full text-white bg-black flex flex-col px-6 py-6 rounded-lg shadow-2xl'>
                        <p className='text-3xl font-medium mb-6 text-tertiary-color'>₹ {itemDetails.price}</p>
                        <p className='font-light mb-2'>{itemDetails.product}</p>
                        <p className='font-extralight opacity-90 mb-6'>{itemDetails.category}</p>
                        <span className='flex items-center justify-between text-sm  opacity-90'>
                            {itemDetails.location && (
                                <p>
                                    {itemDetails.location[3].name}, {itemDetails.location[2].name}
                                    {/* {itemDetails.location[2].name}, */}
                                    {/* {itemDetails.location[3].name} */}
                                </p>
                            )}
                            <p>{
                                itemDetails.createdAt && itemDetails.createdAt.slice(0, 10)
                            }</p>
                        </span>
                    </div>
                    <div className='w-full relative text-white bg-black  rounded-lg shadow-2xl mt-4 px-6 py-6 '>
                        <p className='text-xl flex items-center mb-6'>Sellers Email: <span className='text-tertiary-color ms-3 text-lg'>{"abcde@gmail.com"}</span></p>
                        <motion.button className='block mb-6 m-auto w-full rounded-lg border-2 border-tertiary-color py-4 backdrop-blur-3xl bg-white/10 hover:bg-secondary-color '
                            whileHover={{
                                y: -2,
                                scale: 1.01
                            }}
                        >Chat With {itemDetails.role}</motion.button>
                        {
                            result>0?<motion.button className='block m-auto w-full rounded-lg border-2 border-tertiary-color py-4 backdrop-blur-3xl bg-white/10 hover:bg-secondary-color mb-6'
                            whileHover={{
                                y: -2,
                                scale: 1.01
                            }}
                        >Already in Kart</motion.button>:<motion.button className='block m-auto w-full rounded-lg border-2 border-tertiary-color py-4 backdrop-blur-3xl bg-white/10 hover:bg-secondary-color mb-6'
                            whileHover={{
                                y: -2,
                                scale: 1.01
                            }}
                        >Add to Kart</motion.button>
                        }
                        
                    </div>
                    
                    <div></div>
                </div>
            </Container>}
            {
                itemDetails && <Container1 className='px-20  flex flex-col justify-start font-unbounded mb-32'>
                    <div className='w-7/12  bg-primary-color  rounded-lg px-6 py-6 shadow-2xl'>

                        <p className='text-tertiary-color font-semibold text-2xl mb-6'>Item Details</p>
                        <span className='text-white font-light'>{itemDetails.description}</span>
                    </div>

                </Container1>
            }
        </div>
    )
}
const Container = styled.div`
    /* background-color: #1a1a1a; */
    height:100vh;
`
const Container1 = styled.div`
    /* background-color: #1a1a1a; */
    /* height:100vh; */
`
export default MarketDetails