import React, { useEffect, useState } from 'react'
import useAddMessage from "../../hooks/useAddMessage"
const Chatinput = ({ nextUser, currentUser, list, setList ,socket}) => {
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(message.trim().length==0) return;
            const data = await useAddMessage({
                from: currentUser,
                to: nextUser,
                message
            })
            
            console.log(data);
            socket.current.emit("send-msg", {
                to: nextUser,
                from: currentUser,
                message: message,
            })
            const msgs = [...list];
            let date = new Date();
            msgs.push({ fromSelf: true, message: message, time: date.toLocaleTimeString().replace(/:\d+\s/, ' ') });
            setList(msgs)
            setMessage("")
        } catch (error) {
            console.log("error: ", error.message);
        }
    }
    return (
        <form className='flex items-center justify-between w-full border-t-2 border-secondary-color h-full px-5'>
            <input onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder='Enter message' className='text-xl px-5 flex items-center outline-none border-secondary-color border-2 w-full h-16 rounded-3xl' />
            <button onClick={handleSubmit} disabled={!nextUser || !currentUser} type='submit' className='disabled:opacity-50 w-16 h-16 border-2 bg-secondary-color rounded-full mx-5'><i class='bx bxs-send text-3xl text-white'></i></button>
        </form>
    )
}

export default Chatinput