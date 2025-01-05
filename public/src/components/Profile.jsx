import React, { useEffect, useState } from 'react'
import Section1 from './profile components/Section1'
import ProfileDetail from './profile components/ProfileDetail'
import NavBar from './Navbar/NavBar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './profile components/ProfileCard';
import { AnimatePresence } from 'framer-motion';
const Profile = () => {
  const result = useSelector((store) => store.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (!result.isLoggedIn) {
      navigate('/login')
    }
  }, [result])
  const [show, setShow] = useState(false);
  return (
    <div className='overflow-x-hidden'>
      <NavBar />
      <div className='flex w-full h-screen bg-[#212121]  ' >
        <Section1 show={show} setShow={setShow}/>
        <ProfileDetail />
      </div>
      <AnimatePresence>
        <div className="xl:hidden">
          {show && <ProfileCard show={show} setShow={setShow} />}
        </div>
      </AnimatePresence>
    </div>
  )
}

export default Profile