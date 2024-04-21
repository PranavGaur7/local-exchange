import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editKartAsync } from '../../redux/marketDetails/kartSlice';
import useRemovemarket from "../../hooks/useRemovemarket"
import { toast } from 'sonner';
const Section1Component = ({ item, fetchData, section }) => {
    const dispatch = useDispatch();
    const resultUser = useSelector((store) => store.user.userDetails)
    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.value);
        const get = async () => {

            if (resultUser) {
                if (section === "kart") {

                    dispatch((editKartAsync({
                        kartDetails: e.target.value,
                        mode: "remove",
                        auth: resultUser._id
                    })))
                }
                else {
                    console.log("deleting");
                    try {
                        
                        const deletedData = await useRemovemarket(e.target.value)
                        if (deletedData.deletedData.acknowledged) {
                            
                            fetchData()
                            console.log(deletedData);
                        }
                        else{
                            toast.error("unable to delete")
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
        get()
    }
    return (
        <div className='className="z-10  h-[350px] w-full lg:w-5/12 p-2  lg:mx-5 my-5  border-2 border-white/15 flex flex-col justify-between  rounded-lg shadow bg-[#1d1d1d] z-50 '>
            <div className='item w-full h-56 rounded-md bg-center bg-cover bg-no-repeat  bg-local mb-4' style={{ backgroundImage: `url(${item.productImages[0]})` }}>            </div>
            <div className="p-2">
                <Link to={`/market/${item._id}`} >
                    <h5 className="text-base font-normal tracking-tight text-gray-900 dark:text-white truncate hover:underline hover:underline-offset-2" >{item.product}</h5>
                </Link>
                <div className="flex items-center mt-2.5 mb-5 text-sm text-[#ffffff93]">
                    {
                        `${item.location[3].name},${item.location[2].name}`
                    }
                </div>
                <div className="flex items-center justify-between ">
                    <span className="text-2xl font-bold text-white">${item.price}</span>
                    <button className="text-white bg-secondary-color hover:bg-tertiary-color focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center " value={item._id} onClick={handleClick} ><i className='bx bx-trash text-icons-color text-lg me-2'></i>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default Section1Component