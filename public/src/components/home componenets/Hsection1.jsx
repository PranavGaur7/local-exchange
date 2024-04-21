import React from 'react'
import styled from 'styled-components'
import { delay, motion } from 'framer-motion'
import sec1 from "../../assets/sec1-bg.png"

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
        }}
    return (
        <section className="font-unbounded max-w-full relative main h-screen w-full text-white overflow-x-auto z-10 bg-no-repeat bg-cover bg-center bg-local flex flex-col">
            <div className="flex">

                <div className="text-7xl flex flex-col font-bold mt-32 ms-32 ">
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
                <div className="absolute flex flex-col items-center border-[0.5px] rounded-xl top-36 right-40 py-9 w-52 font-bold">
                    <motion.div className="mb-10 flex flex-col"
                    >
                        <span className="text-2xl mb-3">3200+</span>  <span className="text-base">SELLS <br /> TOTAL</span>
                    </motion.div>
                    <div className="flex flex-col py-4">
                        <span className="text-2xl mb-3">1200+</span><span className="text-base">USERS</span>
                    </div>
                </div>
            </div>
            <div className="ms-40 mt-28 ">
                <motion.button className=" group relative h-14 w-48 overflow-hidden rounded-md bg-[#3c3ca4] text-xl shadow font-normal"
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6
                    }}
                >

                    <div className="absolute inset-0 w-0 bg-white transition-all duration-[500ms] ease-out group-hover:w-full"></div>
                    <span className="relative text-white group-hover:text-[#3c3ca4] flex items-center justify-center">
                        Visit Market</span>
                </motion.button>
            </div>
            <div className="flex items-center  w-[500px] text-lg text-center absolute  bottom-5 left-40">
                <motion.span
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
                <div className='mx-12 text-[#3c3ca4]'>
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
                <motion.button className='align-middle border-[1px] h-9 w-9 rounded-full mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'

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
                    <i className='bx bxl-instagram-alt align-middle'></i>
                </motion.button>
                <motion.button className='align-middle border-[1px] h-9 w-9 rounded-full mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'
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
                    <i className='bx bxl-linkedin align-middle' ></i>
                </motion.button>
                <motion.button className='align-middle border-[1px] h-9 w-9 rounded-full mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'
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
                    <i className='bx bxl-twitter align-middle'></i>
                </motion.button>
                <motion.button className='align-middle border-[1px] h-9 w-9 rounded-full mx-2 flex items-center justify-center hover:bg-[#3c3ca4] transition-all ease-in-out duration-300 border-[#3c3ca4]'
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