import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Section1Component from './Section1Component';
import { useEffect } from 'react';
import styled from 'styled-components';
import useGetUserMarket from '../../hooks/useGetUserMarket'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Empty from '../Empty';
import Loader from '../Loader';
const Section1 = ({show,setShow}) => {
    const queryClient = useQueryClient()
    const result = useSelector((store => store.kart.item))
    const resultUser = useSelector((store => store.user.userDetails))
    const [section, setSection] = useState("kart")
    const [isEmpty, setIsEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([]);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const fetchData = async () => {
        setIsEmpty(false)
        setItems([])
        setIsLoading(true)
        if (section === "kart") {
            setItems(result)
        }
        else {
            if (resultUser) {
                const response = await useGetUserMarket({
                    section, user: resultUser._id
                });
                if (response.status === 200) {
                    if (response.data.length !== 0) {
                        setItems(response.data)
                    }
                    else {
                        setIsEmpty(true)
                    }
                }
            }
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [result, section])


    const changeHandler = (e) => {
        e.preventDefault();
        setSection(e.target.value)
    }

    return (
        <Container className='font-unbounded w-full setScroll z-0'>
            <button onClick={()=>{
                setShow(true)
            }}  className='xl:hidden mt-4 right-5 absolute h-12 w-12 bg-center bg-cover bg-no-repeat bg-local rounded-full ' style={{ backgroundImage: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4azEguG9_sF536e2Z1He0V7vE56p6Qr5EKqGQ2U3IMlrFE9RcSEklLMeaL4FKwJ6MJG8&usqp=CAU"})` }}></button>
            <div className=' w-full h-screen  overflow-y-scroll setScroll overflow-x-hidden px-10 sm:px-20'>
                <div className="selection w-full flex items-center justify-between">
                    <input type="radio" id="kart" name="section" value="kart" hidden onChange={changeHandler} />
                    <label className={`px-2 py-3 sm:px-0 sm:py-0 sm:w-5/12 sm:h-14 rounded-md mx-1 sm:mx-4 my-5 bg-primary-color flex items-center justify-center cursor-pointer ${section == "kart" ? "outline outline-tertiary-color" : ""}`} htmlFor="kart"><i className='bx bx-cart-alt text-icons-color text-base sm:text-xl me-2' ></i> <span className='text-white text-sm sm:text-base'>Kart</span></label>
                    <input type="radio" id="trader" name="section" value="Trader" hidden onChange={changeHandler} />
                    <label className={`px-2 py-3 sm:px-0 sm:py-0 sm:w-5/12 sm:h-14 rounded-md mx-1 sm:mx-4 my-5 bg-primary-color flex items-center justify-center cursor-pointer ${section == "Trader" ? "outline outline-tertiary-color" : ""}`} htmlFor="trader"><i className='bx bx-purchase-tag text-icons-color text-base sm:text-xl me-2'></i> <span className='text-white text-sm sm:text-base'>Trades</span></label>
                    <input type="radio" id="seller" name="section" value="Seller" hidden onChange={changeHandler} />
                    <label className={`px-2 py-3 sm:px-0 sm:py-0 sm:w-5/12 sm:h-14 rounded-md mx-1 sm:mx-4 my-5 bg-primary-color flex items-center justify-center cursor-pointer ${section == "Seller" ? "outline outline-tertiary-color" : ""}`} htmlFor="seller"><i className='bx bx-receipt text-icons-color text-base sm:text-xl me-2'  ></i> <span className='text-white text-sm sm:text-base'>Sells</span></label>
                </div>
                {(items.length !== 0) && <div className='flex flex-wrap  justify-between'>
                    {
                        items && items.map((item, index) => {
                            return <Section1Component key={index} item={item} fetchData={fetchData} section={section} />
                        })
                    }
                </div>}
                {
                    isLoading && <Loader />
                }
                {
                    (items.length === 0) && !isLoading && <Empty />
                }
            </div>
        </Container>
    )
}
const Container = styled.div`
    .setScroll::-webkit-scrollbar {
            width: 6px;
        }
    .setScroll::-webkit-scrollbar-track {
         background: #2b2b2b; 
        }
    .setScroll::-webkit-scrollbar-thumb {
        width: 6px;
        border-radius: 4px;

        background: #1a1a1a; 
    }
    .setScroll::-webkit-scrollbar-thumb:hover {
         background: #555; 
    }
`
export default Section1