import React from 'react'
import styled from 'styled-components'
import { delay, motion } from 'framer-motion'
import sec1 from "../../assets/sec1-bg.png"
import { Link } from 'react-router-dom'

const Hsection1 = () => {
    const varient = {
        initial: {
            rotateX: "-70deg",
            y: 70,
            z: -40
        },
        animate: {
            rotateX: "0deg",
            y: 0,
            z: 0
        }
    }
    return (
        <section className=" font-unbounded max-w-full relative main h-screen w-full text-white overflow-x-auto z-10 bg-no-repeat bg-cover bg-center bg-local flex flex-col">
            <div className="flex">

                <div className="text-3xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl flex flex-col font-bold mt-10 sm:mt-32 ms-4 sm:ms-10 lg:ms-28 xl:ms-32 ">
                    <motion.span className="mb-6  pt-10 bottom-2 origin-bottom "
                        variants={varient}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 1
                        }}>Trade & </motion.span>
                    <motion.span
                        variants={varient}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 1
                        }}
                    >Thrive Togethor.</motion.span>
                </div>
                <div className=" absolute hidden md:flex md:flex-col items-center border-[0.5px] rounded-xl top-20 sm:top-36 right-10 lg:right-16 xl:right-40 py-7 lg:py-9 w-40 lg:w-48 xl:w-52 font-bold">
                    <motion.div className="mb-3 sm:mb-7 lg:mb-10 flex flex-col"
                    >
                        <span className="text-lg sm:text-2xl mb-0 sm:mb-1 lg:mb-3">3200+</span>  <span className="text-sm sm:text-base">SELLS <br /> TOTAL</span>
                    </motion.div>
                    <div className="flex flex-col py-0 sm:py-2 lg:py-4">
                        <span className="text-lg sm:text-2xl ms-0 sm:mb-1 lg:mb-3">1200+</span><span className="text-sm sm:text-base">USERS</span>
                    </div>
                </div>
            </div>
            <div className=" ms-4 sm:ms-10 lg:ms-28 xl:ms-32 mt-14 sm:mt-28 ">
                <motion.button className=" group relative h-14 w-48 overflow-hidden rounded-md bg-[#3c3ca4] text-xl shadow font-normal"
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6
                    }}
                >

                    <div className="absolute inset-0 w-0 bg-white transition-all duration-[500ms] ease-out group-hover:w-full"></div>
                    <Link to={'/market'}><span className="relative text-white group-hover:text-[#3c3ca4] flex items-center justify-center">
                        Visit Market</span></Link>
                </motion.button>
            </div>
            <div className="flex flex-col sm:flex-row  w-auto text-lg text-center absolute  bottom-5 left-0 sm:left-10 lg:left-28 xl:left-32 ">
                <motion.span className='hidden sm:block'
                    initial={{
                        x: "-100vw"
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        deplay: 1
                    }}
                >Contact Us</motion.span>
                <div className='mb-5 sm:mb-0 mx-2 sm:mx-12 text-[#3c3ca4] rotate-90 sm:rotate-0 w-16 sm:w-auto text-xl sm:text-lg'>
                    <motion.i className='bx bxs-chevrons-right align-middle'
                        initial={{
                            x: "-100vw"
                        }}
                        animate={{
                            x: 0
                        }}
                        transition={{
                            deplay: 0.5
                        }}
                    ></motion.i>

                    <motion.i className='bx bxs-chevrons-right align-middle'
                        initial={{
                            x: "-100vw"
                        }}
                        animate={{
                            x: 0
                        }}
                        transition={{
                            deplay: 0.4
                        }}
                    ></motion.i>
                </div>
                <motion.button className='my-5 sm:my-0 align-middle  border-[1px]   rounded-full h-11 w-11 sm:h-9 sm:w-9 text-xl sm:text-base mx-4 sm:mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'

                    initial={{
                        x: "-100vw"
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        deplay: 0.3
                    }}
                >
                    <a href="https://www.instagram.com/raghavgau7?igsh=MWJ0b2UxYjZzYTdvZw==" target="_blank"><i className='bx bxl-instagram-alt align-middle'></i></a>
                </motion.button>
                <motion.button className='my-5 sm:my-0 align-middle  border-[1px]   rounded-full h-11 w-11 sm:h-9 sm:w-9 text-xl sm:text-base mx-4 sm:mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'
                    initial={{
                        x: "-100vw"
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        deplay: 0.2
                    }}
                >
                    <a href="https://www.linkedin.com/in/pranav-gaur-168522252" target='_blank'><i className='bx bxl-linkedin align-middle' ></i></a>
                </motion.button>
                <motion.button className='my-5 sm:my-0 align-middle  border-[1px]   rounded-full h-11 w-11 sm:h-9 sm:w-9 text-xl sm:text-base mx-4 sm:mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'
                    initial={{
                        x: "-100vw"
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        deplay: 0.1
                    }}
                >
                    <a href="https://x.com/PranavGaur04" target='_blank'><i className='bx bxl-twitter align-middle'></i></a>
                </motion.button>
                <motion.button className='my-5 sm:my-0 align-middle  border-[1px]   rounded-full h-11 w-11 sm:h-9 sm:w-9 text-xl sm:text-base mx-4 sm:mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'
                    initial={{
                        x: "-100vw"
                    }}
                    animate={{
                        x: 0
                    }}
                >
                    <i className='bx bxl-facebook align-middle' ></i>
                </motion.button>
            </div>
        </section>
    )
}
const Container = styled.div`
  .main{
    background-image: url(${sec1});
  } 

`
export default Hsection1