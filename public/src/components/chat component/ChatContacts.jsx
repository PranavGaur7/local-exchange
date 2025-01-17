import React from 'react'
import logo from "../../assets/logo.png"
import Chip from '@mui/material/Chip';
const ChatContacts = ({ contactData, nextUser, setNextUser ,setNextContact}) => {
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mt-5'>
                <img src={logo} className='w-48' alt="" />
                <span className='text-3xl font-extrabold text-white'>Contacts</span>
            </div>
            <div className='my-3 w-full'>
                {
                    contactData.map((data, index) => {
                        const date = new Date(data.updatedAt);
                        const day = String(date.getDate()).padStart(2, '0'); 
                        const month = String(date.getMonth() + 1).padStart(2, '0'); 
                        const year = date.getFullYear();
                        const formattedDate = `${day}-${month}-${year}`;
                        if(nextUser==data.id) setNextContact(data)
                        return (
                            <button className={`z-10 h-20 my-4 bg-[#1d1d1d] relative w-full justify-between px-4 py-2  rounded-lg flex flex-col   border  text-white ${data.id == nextUser ? "bg-secondary-color border-white" : "border-secondary-color"}`} key={index} value={data.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNextUser(data.id)
                                    setNextContact(data)
                                    console.log(data);
                                    
                                }}
                            >
                                <span className='font-bold text-lg truncate'>{data.name}</span>
                                <div className='flex justify-between w-full z-0 items-center'>
                                    <span className='font-light text-md '>{data.productName}</span>
                                    <div className='font-thin text-xs'>{formattedDate}</div>
                                </div>
                                <div className='block absolute right-4 border px-1 py-1 rounded-lg'>
                                    {data.role}
                                </div>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChatContacts