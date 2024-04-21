import React from 'react'
import styled from 'styled-components'
import sec3 from "../../assets/sec3-bg.png"
const Hsection3 = () => {
    return (
        <Container>
            <footer className='font-unbounded bg-center bg-no-repeat bg-cover bg-local h-screen w-full flex flex-col items-center justify-between pt-16'>
                <div className='px-56 flex flex-col items-center'>
                    <h1>
                        <span className='text-[110px] text-white flex flex-col items-center'> <span className='font-bold'>Do Your Purchase</span> <span><b> Today</b> With Us</span> </span>
                    </h1>
                    <button className=" group relative h-16 w-64 overflow-hidden rounded-md bg-[#3c3ca4] text-xl shadow font-normal mt-10"                    >

                        <div className="absolute inset-0 w-0 bg-white transition-all duration-[500ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-white group-hover:text-[#3c3ca4] flex items-center justify-center">
                        <i className='bx bx-basket me-3' ></i>
                            Visit Market</span>
                    </button>
                </div>
                <div className='w-full h-24 border-t-[0.5px] border-gray-700 flex items-center justify-center'>
                        <span className='text-md text-white'><span>Copyright 2024 </span> <span className='text-tertiary-color'> Barter</span> | Made By <span className='text-tertiary-color'> Pranav Gaur</span></span>
                </div>
            </footer>
        </Container>
    )
}
const Container = styled.div`
    footer{
        background-image: url(${sec3});
    }
`
export default Hsection3