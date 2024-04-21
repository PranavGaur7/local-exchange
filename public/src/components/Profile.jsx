import React, { useEffect } from 'react'
import Section1 from './profile components/Section1'
import ProfileDetail from './profile components/ProfileDetail'
import NavBar from './Navbar/NavBar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const result = useSelector((store) => store.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (!result.isLoggedIn) {
      navigate('/login')
    }
  }, [result])
  return (
    <div className='overflow-x-hidden'>
      <NavBar />
      <div className='flex w-full h-screen bg-[#212121]  ' >
        <Section1 />
        <ProfileDetail />
      </div>
    </div>
  )
}

export default Profile