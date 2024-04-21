import { motion } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import { Toaster } from 'sonner'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import useProfile from './hooks/useProfile'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './redux/userDetails/userSlice'
import Market from './components/Market'
import MarketDetails from './components/MarketDetails'
import { compileKartAsync } from './redux/marketDetails/kartSlice'
import Profile from './components/Profile'
import Loader from './components/Loader'
function App() {
  const dispatch = useDispatch();
  const result = useSelector((store) => store.user.isLoggedIn);
  const queryClient = new QueryClient()
  const [myCookie, setMyCookie] = useState();
  const [cookies] = useCookies(['login']);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (cookies.login) {
      setMyCookie(cookies.login)
      dispatch((compileKartAsync(cookies.login)))
    }
  })
  useEffect(() => {
    setIsLoading(true)
    const doo = async () => {
      const response = await useProfile(myCookie);
      if (response) {
        if (!result) {
          dispatch((setLogin(response)))
        }
      }
      setIsLoading(false)
    }
    doo();
  }, [myCookie])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {!isLoading && <>
              <Route path='/' element={<Home isLoading={isLoading} setIsLoading={setIsLoading} />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/market' element={<Market />} />
              <Route path='/market/:itemId' element={<MarketDetails />} />
            </>}
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors closeButton />
      </QueryClientProvider>
      {
        isLoading &&
        <div className='h-screen w-screen bg-primary-color'>

          <Loader />
        </div>
      }
    </>
  )
}

export default App
