import React, { useEffect, useState } from 'react'
import NavBar from './Navbar/NavBar'
import { delay, motion } from 'framer-motion'
import sec1 from "../assets/sec1-bg.png"
import curved from "../assets/curved.png"
import styled from 'styled-components'
import Hsection1 from './home componenets/Hsection1'
import Hsection2 from './home componenets/Hsection2'
import Hsection3 from './home componenets/Hsection3'
import Loader from "./Loader"
const Home = ({ isLoading }) => {


  return (
    <Container>
      <NavBar />
      {
        !isLoading && <>
          <Hsection1 />
          <Hsection2 />
          <Hsection3 />
        </>
      }
      {
        isLoading && <Loader bg={sec1}/>
      }
    </Container>
  )
}
const Container = styled.div`
  .main{
    background-image: url(${sec1});
  } 

`
export default Home