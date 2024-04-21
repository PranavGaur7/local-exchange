import React from 'react'
import styled from 'styled-components'

const Search = ({setShowSellModal,setShowTradeModal,filter,setFilter,userLatLong}) => {
    const categories = [
        "All Categories",
        "Electronics",
        "Clothing & Apparel",
        "Home & Kitchen Appliances",
        "Beauty & Personal Care",
        "Health & Wellness",
        "Sports & Outdoors",
        "Toys & Games",
        "Books & Media",
        "Automotive & Tools",
        "Furniture & Home Decor",
        "Food & Beverages",
        "Office Supplies",
        "Pet Supplies",
        "Baby & Kids",
        "Jewelry & Accessories",
        "Groceries",
        "Fitness & Exercise Equipment",
        "Arts & Crafts",
        "Gardening & Outdoor Living",
        "Travel & Luggage"
    ]
    return (
        <Container className='flex flex-col justify-evenly  bg-primary-color h-40 lg:h-20 px-3 sm:px-8 font-unbounded border-b border-secondary-color'>
            <div className='flex items-center justify-between'>

                <form className=" sm:w-2/3  lg:w-1/2  xl:w-2/3">
                    <div className="flex">
                        {/* <label for="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label> */}
                        <select name='category' id="search-dropdown" className="w-24  sm:w-auto flex-shrink-0 z-10 inline-flex items-center md:px-0 xl:py-2.5 xl:px-4 text-xs md:text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" required
                            onChange={(e)=>{
                                console.log(e.target.value);
                                setFilter({...filter,[e.target.name]:e.target.value,latitude:userLatLong.latitude,longitude:userLatLong.longitude});
                            }}
                        >
                            {
                                categories.map((element,index) => {
                                    return (
                                        <option key={index} value={element}>{element}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="relative w-full">
                            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-secondary-color focus:border-tertiary-color dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-tertiary-color" placeholder="Products, sells and Trades" required />
                            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-secondary-color rounded-e-lg border border-secondary-color hover:bg-tertiary-color focus:ring-4 focus:outline-none focus:ring-secondary-color dark:bg-sering-secondary-color dark:hover:bg-sering-secondary-color dark:focus:ring-secondary-color">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>

                <div className='text-white hidden lg:inline'>
                    <button className='bg-secondary-color w-24 h-12 rounded-md custom-btn me-5 -ms-12   btn-12' onClick={()=>setShowTradeModal(true)}>Trade</button>
                    <button className='bg-secondary-color w-24 h-12 rounded-md custom-btn   btn-12' onClick={()=> setShowSellModal(true)}>Sell</button>
                </div>
                <button className='text-white  ms-3 me-0 sm:me-4 text-4xl md:me-10'><i className='bx bx-cart-alt' ></i></button>
            </div>
            <div className='text-white inline lg:hidden ms-12'>
                <button className='bg-secondary-color w-24 h-12 rounded-md custom-btn me-5 -ms-12   btn-12' onClick={()=>setShowTradeModal(true)}>Trade</button>
                <button className='bg-secondary-color w-24 h-12 rounded-md custom-btn   btn-12' onClick={()=> setShowSellModal(true)}>Sell</button>
            </div>
        </Container>
    )
}
const Container = styled.div`
    
.custom-btn {
  
  text-shadow: 0px -1px 0px rgba(0,0,0,0.4);
    text-decoration: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  display: inline-block;
  box-shadow: inset 0px 1px 0px rgba(255,255,255,1),0px 1px 3px rgba(0,0,0,0.3);
  outline: none;
  border: 1px solid #ba6;
}
.custom-btn:active{
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
}
.btn-12{
  border-color: #3c3ca4;
  background: -webkit-gradient(linear, left top, left bottom, from(#3c3ca4), to(#7E7EFF));
}



`
export default Search