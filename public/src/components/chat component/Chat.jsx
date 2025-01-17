import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"
import { host } from "../../utils/ApiRoutes"
import Contacts from './Contacts';
import ChatBox from './ChatBox';
import ChatContacts from './ChatContacts';
import { useSelector } from 'react-redux';
import useGateuserContacts from '../../hooks/useGetuserContacts';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

const Chat = () => {
    const { userId, toId } = useParams();
    const navigate = useNavigate();
    const socket = useRef();
    const [nextUser, setNextUser] = useState();
    const [nextContact, setNextContact] = useState();
    const [show, setShow] = useState(true);
    const [pos, setPos] = useState("0");
    const [currentUser, setCurrentUser] = useState();
    const [notAvailable, setNotAvailable] = useState(false);
    const [contacts, setContacts] = useState([]);
    const result = useSelector((store) => store.user.userDetails);
    const resultLog = useSelector((store) => store.user);
    useEffect(() => {
        if (result) {
            setCurrentUser(result._id);
        }
    }, [result])
    useEffect(() => {
        if (userId && toId) {
            setCurrentUser(userId);
            setNextUser(toId)
        }
    }, [userId, toId])
    useEffect(() => {
        if (resultLog) {
            if (!resultLog.isLoggedIn) {
                navigate('/login')
            }
        }
    }, [resultLog])
    useEffect(() => {
        const f = async () => {
            const data = await useGateuserContacts({ _id: currentUser })
            setContacts(data)
        }
        if (currentUser) {
            f();
        }
    }, [currentUser])
    useEffect(()=>{
        if(screen.width>768){
            setShow(true)
        }
        else{
            setShow(false)
        }
    },[screen.width])
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit("add-user", currentUser)
        }
    }, [currentUser])
    return (
        <div className='flex bg-primary-color relative'>
            <button onClick={()=>{
                console.log(show);
                setShow(!show)
                setPos(pos=="0"?"-100vw":"0")
            }} className='md:hidden border cursor-pointer w-16 h-16 z-50 top-4 right-4 rounded-full bg-secondary-color text-white absolute flex items-center justify-center text-3xl'>
                <i class='bx bx-message-dots z-0'></i>
            </button>
            <motion.div
                key="modal"
                // initial={{
                //     x: "0"
                // }}
                animate={{
                    x: show?"0":"-100vw"
                }}
                transition={{
                    type: "tween",
                    duration: 0.5
                }}
                className={`z-10 absolute md:relative bg-primary-color md:block w-full max-w-96 md:max-w-full md:w-1/2 lg:w-1/3 h-screen px-8 overflow-y-scroll `}>
                <ChatContacts contactData={contacts} nextUser={nextUser} setNextUser={setNextUser} setNextContact={setNextContact}/>
            </motion.div>
            <div className='w-full md:w-1/2 lg:w-2/3 h-screen'>
                <ChatBox currentUser={currentUser} nextUser={nextUser} socket={socket} nextContact={nextContact} setNotAvailable={setNotAvailable}/>
            </div>
        </div>
    )
}

export default Chat