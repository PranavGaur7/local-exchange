import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import logo from "../../assets/logo.png"
import List from './List'
const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [hiddenBar, setHiddenBar] = useState(false)
    const handleChange = (e) => {
        const elem1 = document.getElementById("yo1");
        const elem2 = document.getElementById("yo2");
        if (e.target.checked) {
            elem1.classList.add("translate-y-1.5", "rotate-45");
            elem2.classList.remove("w-8");
            elem2.classList.add("w-10", "-translate-y-1.5", "-rotate-45");
            setHiddenBar(true)
        }
        else {
            elem1.classList.remove("translate-y-1.5", "rotate-45");
            elem2.classList.add("w-8");
            elem2.classList.remove("w-10", "-translate-y-1.5", "-rotate-45");
            setHiddenBar(false)
        }
    }
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.pageYOffset > navbar.offsetHeight+70) {
                navbar.classList.add('sticky');
                navbar.classList.add('opacity-0');
                navbar.classList.remove('opacity-0');
            } else {
                navbar.classList.remove('sticky');

            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            <AnimatePresence>
                <div className="xl:hidden">
                    {hiddenBar && <List />}
                </div>
            </AnimatePresence>
            <motion.nav className="navbar border-b-[0.01px] border-secondary-color max-w-full bg-[#1a1a1a] h-24 w-screen flex items-center justify-between ps-10 pe-0 xl:px-14 font-unbounded sticky z-40 top-0 left-0 transition-all ease-in-out duration-50000">
                <motion.div className="logo">
                    <motion.img className="h-16" src={logo} alt="" />
                </motion.div>
                <ul className="hidden xl:text-white xl:flex xl:items-center xl:justify-between xl:text-lg">
                    <li className="lg:px-8 uppercase flex items-center justify-center text-[#7E7EFF]"><Link to={'/'} className="font-medium">Home</Link>
                        <i className='bx bx-trending-down text-2xl ms-1'></i></li>
                    <li className="lg:px-8 uppercase flex items-transition-all ease-linear duration-200 center justify-center hover:text-[#7E7EFF] [&>*:nth-child(2)]:opacity-0 [&>*:nth-child(2)]:hover:opacity-100"><Link to={'/market'} className="font-medium">Market</Link>
                        <i className='bx bx-trending-down text-2xl ms-1 transition-all ease-linear text-[#7E7EFF] '></i></li>
                    <li className="lg:px-8 uppercase flex items-transition-all ease-linear duration-200 center justify-center hover:text-[#7E7EFF] [&>*:nth-child(2)]:opacity-0 [&>*:nth-child(2)]:hover:opacity-100"><Link className="font-medium">About</Link>
                        <i className='bx bx-trending-down text-2xl ms-1 transition-all ease-linear text-[#7E7EFF] '></i></li>
                    <li className="lg:px-8 uppercase flex items-transition-all ease-linear duration-200 center justify-center hover:text-[#7E7EFF] [&>*:nth-child(2)]:opacity-0 [&>*:nth-child(2)]:hover:opacity-100"><Link to={'/profile'} className="font-medium">Profile</Link>
                        <i className='bx bx-trending-down text-2xl ms-1 transition-all ease-linear text-[#7E7EFF] '></i></li>
                </ul>
                <div className="hidden xl:block">
                    <Button isLoggedIn={isLoggedIn} />
                </div>
                <label id="menu"
                    className="mt-2 xl:hidden group flex h-20 w-20  cursor-pointer items-center justify-center">
                    <input type="checkbox" className="hidden" forhtml="menu" onChange={handleChange} />
                    <div className="space-y-2" >
                        <span className="block h-1 w-10 origin-center rounded-full bg-white transition-transform ease-in-out " id='yo1'></span>
                        <span className="block h-1 w-8 origin-center rounded-full bg-white transition-transform ease-in-out " id='yo2'></span>
                    </div>
                </label>
            </motion.nav>
        </>
    )
}

export default NavBar