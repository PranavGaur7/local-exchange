import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from "../assets/logo.png"
import floatImg from "../assets/float.png"
import sec3 from "../assets/sec3-bg.png"
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useLogin from '../hooks/useLogin';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/userDetails/userSlice';
import { useCookies } from 'react-cookie';
import Loader from './Loader';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const result = useSelector((store) => store.user.isLoggedIn);
    useEffect(() => {
        setIsLoggedIn(result)
    })
    useEffect(() => {
        if (isLoggedIn) {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                navigate('/');
            }
        }
        else{
            setIsLoading(false)
        }
    }, [isLoggedIn])
    const { mutateAsync } = useMutation({
        mutationFn: useLogin
    })
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (handleValidation()) {
                const user = await mutateAsync(userData)
                if (user.status === 200) {
                    dispatch((setLogin({
                        isLoggedIn: true,
                        user: user.data.user
                    })))
                    setCookie("login", user.data.auth, {
                        maxAge: 172800,
                    })
                    toast.success("Logged In")
                    navigate('/');
                }
            }
        }
        catch (err) {
            if (err.response && err.response.status === 404) {
                toast.error("Username not found");
            } else if (err.response && err.response.status === 401) {
                toast.error("Invalid password");
            } else {
                console.log(err);
            }
        }
    }
    const handleValidation = () => {
        const { password, username } = userData;
        if (username.length < 4) {
            toast.error("Username should be atleast 4 characters")
            return false;
        }
        else if (password.length < 4) {

            toast.error("Password should be atleast 6 characters")
            return false;
        }
        return true;
    }
    return (
        <Container className="font-unbounded w-screen h-screen flex items-center justify-end bg-no-repeat bg-center bg-cover bg-local overflow-hidden">
            {!isLoading && <>
                <div className=" h-full w-1/5 lg:w-1/3  pt-5 ">
                    <img src={logo} alt="" className='h-0 lg:h-1/4 fixed  lg:left-2' />

                </div>
                <motion.div className="h-full w-4/5 lg:w-3/5 relative  float-end bg-white rounded-s-[80px] ps-10 sm:ps-24 md:ps-40 pt-24 sm:pt-36 flex flex-col pe-16 md:pe-36 "
                    initial={{
                        x: "100vw"
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                >
                    <img src={floatImg} alt="" className='absolute h-0 sm:-left-60 sm:h-1/2 md:h-3/4 md:-left-96 bottom-0  ' />
                    <motion.h1 className='text-4xl font-bold text-secondary-color mb-24'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                    >Login User</motion.h1>
                    <motion.input type="text" placeholder='Your Name' className='border-b-4 pb-1 mb-8 text-md outline-none focus:border-secondary-color transition-all ease-in-out duration-700'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                        name='username'
                        value={userData.username}
                        onChange={handleChange}
                    />
                    <motion.input type="password" placeholder='Password' className='border-b-4 pb-1 mb-8 text-md outline-none focus:border-secondary-color transition-all ease-in-out duration-700'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                        name='password'
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <motion.p className='text-sm mt-8'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                    >Already have an account. <Link to={'/signup'} className='text-secondary-color'>Register</Link></motion.p>
                    <motion.button onClick={handleSubmit} className=" group relative h-14 w-48 sm:w-60 mt-5 overflow-hidden rounded-md bg-[#3c3ca4] text-lg sm:text-xl shadow font-normal"

                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}

                    >

                        <div className="absolute inset-0 w-0 bg-white transition-all duration-[500ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-white group-hover:text-[#3c3ca4] flex items-center justify-center">
                            User Login</span>
                    </motion.button>
                </motion.div>
            </>}
            {
                isLoading && <Loader/>
            }
        </Container>
    )
}
const Container = styled.div`
  
  background-image: url(${sec3});
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
`
export default Login