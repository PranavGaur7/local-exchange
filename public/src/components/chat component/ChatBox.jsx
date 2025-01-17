import React, { useEffect, useRef, useState } from 'react'
import Chatinput from './Chatinput'
import bg from "../../assets/sec3-bg.png"
import useGetAllMessages from "../../hooks/useGetAllMessages"
import Loader from "../Loader"
import Empty from '../Empty'
import { useQuery } from '@tanstack/react-query'
const ChatBox = ({ currentUser, nextUser, socket, nextContact, setNotAvailable }) => {
    const scrollRef = useRef();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        const f = async () => {
            try {
                setLoading(true)
                const data = await useGetAllMessages({
                    from: currentUser,
                    to: nextUser
                })
                setList(data)
                setLoading(false)
            } catch (error) {
                setNotAvailable(true)
            }
        }
        if (currentUser && nextUser) {
            f();
        }
    }, [nextUser, currentUser])

    useEffect(() => {
        if (nextContact) {
            const date = new Date(nextContact.updatedAt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            setFormattedDate(`${day}-${month}-${year}`);
        }
    }, [nextContact])


    useEffect(() => {

        if (socket.current) {
            console.log("socket");
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [, socket.current])

    useEffect(() => {
        arrivalMessage && setList((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth", block: "end", inline: "nearest" });
    }, [list])
    return (
        <div className='w-full h-full flex flex-col border-s-2 border-secondary-color' >
            <div className="z-10 h-28 bg-[#1d1d1d] relative w-full justify-between px-4 py-3   flex flex-col   border-b border-secondary-color  text-white " value={nextContact && nextContact.id}>
                <span className='font-bold text-2xl truncate'>{nextContact && nextContact.name}</span>
                <div className='flex justify-between w-full z-0 items-center'>
                    <span className='font-light text-lg '>{nextContact && nextContact.productName}</span>
                    <div className='font-thin text-lg'>{formattedDate}</div>
                </div>
                <div className='block absolute right-4 border px-2 py-1 text-xl rounded-xl'>
                    {nextContact && nextContact.role}
                </div>
            </div>
            <div className='h-[calc(100vh-112px)] w-full overflow-y-auto bg-fixed bg-no-repeat bg-center bg-cover px-4 py-4' style={{ background: `url(${bg})` }}>
                <div className='relative w-full flex flex-col justify-end  ' >
                    {
                        loading && <Loader />
                    }
                    {
                        !loading && list.length > 0 && list.map((data, index) => {
                            return (<div ref={scrollRef} key={index}
                                className={`text-white px-3 py-2 text-lg font-semibold bg-secondary-color max-w-[40%] flex items-center break-all min-h-10 rounded-2xl mt-2 ${data.fromSelf ? 'ml-auto' : 'mr-auto'}`}
                            >
                                {data.message}
                            </div>)
                        })
                    }
                    {
                        !loading && list.length == 0 && <div className=' flex items-center justify-center z-0'>
                            <Empty />
                        </div>
                    }
                </div>
            </div>
            <div className='h-28 w-full align-bottom'>
                <Chatinput currentUser={currentUser} nextUser={nextUser} list={list} setList={setList} socket={socket} />
            </div>
        </div>
    )
}

export default ChatBox