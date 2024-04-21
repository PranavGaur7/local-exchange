import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setLogout } from '../../redux/userDetails/userSlice';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
const Button = () => {
    const navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const result = useSelector((store) => store.user.isLoggedIn);
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const dispatch = useDispatch();
    useEffect(()=>{
        setIsLoggedIn(result)
    })
    useEffect(()=>{
        if(isLoggedIn){
            setIsLoggedIn(true)
        }
    },[isLoggedIn])
    const handleClick=(e)=>{
        e.preventDefault();
        if(isLoggedIn){
            dispatch((setLogout()))
            removeCookie(['login'])
            toast.success("Logged Out")
        }
        else{
            navigate('/login')
        }
    }
    return (

        <button className="group relative h-14 w-48 overflow-hidden rounded-md bg-[#3c3ca4] text-xl shadow font-normal" onClick={handleClick}>
            <div className="absolute inset-0 w-0 bg-white transition-all duration-[500ms] ease-out group-hover:w-full"></div>
            <span className="relative text-white group-hover:text-[#3c3ca4] flex items-center justify-center">
                <i className='bx bx-log-in-circle me-2 my-auto' ></i>
                {isLoggedIn?"Logout":"Login"}</span>
        </button>

    )
}

export default Button