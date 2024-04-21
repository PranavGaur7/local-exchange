import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar/NavBar'
import Search from './market components/Search'
import Decider from './market components/Decider'
import Cards from './market components/Cards'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TradeForm from './market components/TradeForm'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useGetAllMarket from "../hooks/useGetAllMarket"
import { setMarket } from '../redux/marketDetails/marketSlice'
import bg from "../assets/sec3-bg.png"
import Loader from './Loader'
import Empty from './Empty'
const Market = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const result = useSelector((store) => store.user);
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [showSellModal, setShowSellModal] = useState(false)
  const [userLatLong, setLatLong] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [isEmpty,setIsEmpty] = useState(false)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatLong({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    }, (error) => {
      console.log(error.message);
    })

  }, [])
  const [filter, setFilter] = useState({
    category: "All Categories",
    role: "None",
    user: "",
    latitude: userLatLong.latitude,
    longitude: userLatLong.longitude
  })
  const [items, setItems] = useState([])
  const query = useQuery({
    queryKey: ['items'], queryFn: async () => {
      setIsLoading(true)
      const response = await useGetAllMarket(filter);
      setItems(response.data)
      if(response.data.length>0){
        setIsEmpty(false)
      }
      else{
        setIsEmpty(true)
      }
      dispatch(setMarket(response.data))
      setIsLoading(false)
      return response
    }
  })
  useEffect(() => {
    if (result) {

      if (!result.isLoggedIn) {
        navigate('/login')
      }
      else {
        setFilter({ ...filter, user: result.userDetails._id })
      }
    }
  }, [result])
  useEffect(() => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
  }, [filter])
  return (
    <div className=' w-full min-h-screen h-full bg-center bg-no-repeat bg-cover bg-fixed font-unbounded' style={{ backgroundImage: `url(${bg})` }}>
      <NavBar />
      <Search userLatLong={userLatLong} filter={filter} setFilter={setFilter} showSellModal={showSellModal} setShowSellModal={setShowSellModal} showTradeModal={showTradeModal} setShowTradeModal={setShowTradeModal} />
      <Decider userLatLong={userLatLong} filter={filter} setFilter={setFilter} />
      {!isLoading && <Cards />}
      {isLoading && <Loader />}
      {isEmpty && <Empty/>}
      <AnimatePresence>
        {showTradeModal &&
          <TradeForm role={"Trader"} showModel={showTradeModal} setShowModal={setShowTradeModal} />
        }
      </AnimatePresence>
      <AnimatePresence>
        {showSellModal &&
          <TradeForm role={"Seller"} showModel={showSellModal} setShowModal={setShowSellModal} />
        }
      </AnimatePresence>
    </div>
  )
}

export default Market