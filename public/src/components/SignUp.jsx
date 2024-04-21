import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from "../assets/logo.png"
import floatImg from "../assets/float.png"
import sec3 from "../assets/sec3-bg.png"
import { toast } from 'sonner';
import useSignup from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/userDetails/userSlice';
import { useCookies } from 'react-cookie';
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const result = useSelector((store) => store.isLoggedIn);
  useEffect(() => {
    setIsLoggedIn(result)
  })
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])
  const { mutateAsync } = useMutation({
    mutationFn: useSignup
  })
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { password, confirmPassword, username, email } = userData;
        const user = await mutateAsync(userData)
        console.log(user);
        if (user.data.code === 11000 && user.data.keyValue.hasOwnProperty('username')) {
          toast.error("username should be unique")
        }
        else if (user.data.code === 11000 && user.data.keyValue.hasOwnProperty('email')) {
          toast.error("email should be unique")
        }
        else {
          dispatch((setLogin({
            isLoggedIn: true,
            user: user.data.user
          })))
          setCookie("login", user.data.auth, {
            maxAge: 172800,
          })
          toast.success("Signed in")
          navigate('/');
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = userData;
    if (email === "") {

      toast.error("Email is required")
      return false;
    }
    else if (password !== confirmPassword) {
      toast.error("Password and ConfirmPassword should be same")
      return false;
    }
    else if (username.length < 4) {
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
        <img src={floatImg} alt="" className='absolute h-0 sm:-left-60 sm:h-1/2 md:h-3/4 md:-left-96 bottom-0 ' />
        <motion.h1 className='text-4xl font-bold text-secondary-color mb-16'
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
        >Create Account</motion.h1>
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
        <motion.input type="email" placeholder='Your Email' className='border-b-4 pb-1 mb-8 text-md outline-none focus:border-secondary-color transition-all ease-in-out duration-700'
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
          name='email'
          value={userData.email}
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
        <motion.input type="password" placeholder='Confirm Password' className='border-b-4 pb-1 mb-6 text-md outline-none focus:border-secondary-color transition-all ease-in-out duration-700'
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
          name='confirmPassword'
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <motion.button onClick={handleSubmit} className=" group relative h-14 w-48 sm:w-60 mt-8 overflow-hidden rounded-md bg-[#3c3ca4] text-lg sm:text-xl shadow font-normal"

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
            Create Account</span>
        </motion.button>
      </motion.div>
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
export default SignUp