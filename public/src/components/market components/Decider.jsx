import React from 'react'
import styled from 'styled-components'
import sec1 from '../../assets/sec1-bg.png'
const Decider = ({filter,setFilter,userLatLong}) => {
  return (
    <Container >
            <select name="role" className='font-unbounded outline-none bg-secondary-color  py-3 px-4 float-end mt-5 text-white border rounded-lg  text-lg me-4  ' onChange={(e)=>{setFilter({...filter,[e.target.name]:e.target.value,latitude:userLatLong.latitude,longitude:userLatLong.longitude})
          console.log(e.target.value);}}>
                <option key={0} value="None" className='text-sm bg-secondary-color'>None</option>
                <option key={1} value="Trader" className='text-sm bg-secondary-color'>Traders Only</option>
                <option key={2} value="Seller" className='text-sm bg-secondary-color'>Sellers Only</option>
            </select>
    </Container>
  )
}
const Container = styled.div`
    
`
export default Decider