import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useGateuserContacts from '../../hooks/useGetuserContacts';
import { useNavigate } from 'react-router-dom';
const Contacts = () => {
    const [currentUser, setCurrentUser] = useState();
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate()
    const result = useSelector((store) => store.user.userDetails);
    useEffect(() => {
        const f = async () => {
            const data = await useGateuserContacts({ _id: currentUser })
            console.log(data);
            setContacts(data)
        }
        if (currentUser) {
            f();
        }
    }, [currentUser])
    useEffect(() => {
        if (result) {
            setCurrentUser(result._id);
        }
    }, [result])
    return (
        <div className='my-3 w-full'>
            {
                contacts.map((data, index) => {
                    const date = new Date(data.updatedAt);
                    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
                    const year = date.getFullYear();
                    const formattedDate = `${day}-${month}-${year}`;
                    return (
                        <button className=' h-20 my-2 bg-[#1d1d1d] w-full justify-between px-4 py-2  rounded-lg flex flex-col   border border-secondary-color text-white' key={index} value={data.id}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/chat/${currentUser}/${data.id}`)
                            }}
                        >
                            <span className='font-light text-md truncate'>{data.name}</span>
                            <div className='flex justify-between w-full'>
                                <span className='text-clip truncate font-thin text-xs w-2/3 flex items-start'>{data.productName}</span>
                                <div className='font-thin text-xs'>{formattedDate}</div>
                            </div>
                            <div className='block absolute right-9 border px-1 py-1 text-xs rounded-lg'>
                                {data.role}
                            </div>
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Contacts