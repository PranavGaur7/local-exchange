import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Section1Component from './Section1Component';
import { useEffect } from 'react';
import styled from 'styled-components';
import useGetUserMarket from '../../hooks/useGetUserMarket'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Empty from '../Empty';
import Loader from '../Loader';
const Section1 = () => {
    const queryClient = useQueryClient()
    const result = useSelector((store => store.kart.item))
    const resultUser = useSelector((store => store.user.userDetails))
    const [section, setSection] = useState("kart")
    const [isEmpty, setIsEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([]);
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
        <Container className='font-unbounded w-full setScroll'>

            <div className=' w-full h-screen  overflow-y-scroll setScroll overflow-x-hidden px-20'>
                <div className="selection w-full flex items-center justify-between">
                    <input type="radio" id="kart" name="section" value="kart" hidden onChange={changeHandler} />
                    <label className='w-5/12 h-14 rounded-md mx-4 my-5 bg-primary-color flex items-center justify-center cursor-pointer' htmlFor="kart"><i className='bx bx-cart-alt text-icons-color text-xl me-2' ></i> <span className='text-white'>Kart</span></label>
                    <input type="radio" id="trader" name="section" value="Trader" hidden onChange={changeHandler} />
                    <label className='w-5/12 h-14 rounded-md mx-4 my-5 bg-primary-color flex items-center justify-center cursor-pointer' htmlFor="trader"><i className='bx bx-purchase-tag text-icons-color text-xl me-2'></i> <span className='text-white'>Trades</span></label>
                    <input type="radio" id="seller" name="section" value="Seller" hidden onChange={changeHandler} />
                    <label className='w-5/12 h-14 rounded-md mx-4 my-5 bg-primary-color flex items-center justify-center cursor-pointer' htmlFor="seller"><i className='bx bx-receipt text-icons-color text-xl me-2'  ></i> <span className='text-white'>Sells</span></label>
                </div>
                {(items.length !== 0) && <div className='flex flex-wrap  justify-between'>
                    {
                        items && items.map((item, index) => {
                            return <Section1Component key={index} item={item} fetchData={fetchData} section={section}/>
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