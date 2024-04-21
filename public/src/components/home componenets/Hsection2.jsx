import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import MagHover from './MagHover'
const Hsection2 = () => {
    const CardData = {
        card1: {
            title: "Versatile Collection.",
            description: "User can choose from an extensive Versatile Collection.",
            image: "https://png.pngtree.com/png-vector/20240201/ourmid/pngtree-ui-3d-model-cartoon-style-render-illustration-png-image_11583422.png"
        },
        card2: {
            title: "Easy Exchange",
            description: "User can easily exchange items from another without complexity.",
            image: "https://img.freepik.com/premium-photo/two-long-cartoon-hands-funny-swirl-reaching-each-other-3d-render-greeting-gesture-business-handshake-teamwork-together-flexible-orange-arms-purple-background-concept-partnership_645257-102.jpg"
        },
        card3: {
            title: "Items Categorized",
            description: "Items are divided into multiple categories, with easy access",
            image: "https://cdni.iconscout.com/illustration/premium/thumb/investment-asset-allocation-8582886-6772787.png"
        },
    }

    return (
        <Container className='font-unbounded px-10 md:px-32 py-28 origin-top-right'>
            <div>
                <motion.h1 className='text-6xl flex flex-col mb-10'
                    initial={{
                        rotateX: "-70deg",
                        y: 70,
                        z: -40
                    }}
                    whileInView={{
                        rotateX: "0deg",
                        y: 0,
                        z: 0
                    }}

                    transition={{
                        duration: 0.8
                    }}
                >
                    <span className='font-light'> <span className="font-semibold"> Key</span> Features</span>
                    <span className="font-semibold"> <span> Of Barter</span> </span>
                </motion.h1>
                <div className='flex items-center'>
                    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65" className='w-2/3 fill-gray-300/40'
                        initial={{
                            y: 70,
                            opacity: 0
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.8,
                            duration: 0.8
                        }}
                    >
                        <path d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"></path>
                    </motion.svg>
                    <motion.h2 className='w-1/5 text-lg ms-8'
                        initial={{
                            rotateX: "-70deg",
                            y: 90,
                            z: -40,
                            opacity: 0
                        }}
                        whileInView={{
                            rotateX: "0deg",
                            y: 0,
                            z: 0,
                            opacity: 1
                        }}

                        transition={{
                            duration: 0.8,
                            delay: 0.8
                        }}
                    >
                        Offer a wide range of
                        services to help businesses
                        establish.
                    </motion.h2>
                </div>
            </div>
            <div className='flex items-center justify-center flex-wrap mt-5'>
                <MagHover>

                    <motion.div className="bg-[#ece8e5] h-[450px] w-full md:w-[450px] rounded-md mx-3 my-3 px-10 pt-12 overflow-hidden"                >
                        <h1 className='text-2xl font-medium w-1/3 mb-5'>{CardData.card1.title}</h1>
                        <span className='text-lg text-gray-500 font-normal'>{CardData.card1.description}</span>
                        <div className='bg-white mt-10 h-60 bottom-0 rounded-xl overflow-hidden  flex justify-center'>
                            <img src={CardData.card1.image} alt="" className='h-56' />
                        </div>
                    </motion.div>
                </MagHover>
                <MagHover>

                    <div className="bg-[#f7e3ef] h-[450px] w-full md:w-[450px] rounded-md mx-3 my-3 px-10 pt-12 overflow-hidden">
                        <h1 className='text-2xl font-medium w-1/3 mb-5'>{CardData.card2.title}</h1>
                        <span className='text-lg text-gray-500 font-normal'>{CardData.card2.description}</span>
                        <div className='bg-white mt-10 h-60 bottom-0 rounded-xl overflow-hidden  flex justify-center'>
                            <img src={CardData.card2.image} alt="" className='h-56' />
                        </div>
                    </div>
                </MagHover>
                <MagHover>

                    <div className="bg-[#efe8ff] h-[450px] w-full md:w-[450px] rounded-md mx-3 my-3 px-10 pt-12 overflow-hidden">
                        <h1 className='text-2xl font-medium w-1/3 mb-5'>{CardData.card3.title}</h1>
                        <span className='text-lg text-gray-500 font-normal'>{CardData.card3.description}</span>
                        <div className='bg-white mt-10 h-60 bottom-0 rounded-xl overflow-hidden  flex justify-center'>
                            <img src={CardData.card3.image} alt="" className='h-56' />
                        </div>
                    </div>
                </MagHover>
            </div>
        </Container >
    )
}
const Container = styled.div`
    
`
export default Hsection2