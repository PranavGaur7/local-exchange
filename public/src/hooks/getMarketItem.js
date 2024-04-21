import axios from "axios";
import {  getMarketItemRoute } from "../utils/ApiRoutes";
const getMarketItem =async (data)=>{
    const response = await axios.post(getMarketItemRoute,data)
    return response
}

export default getMarketItem
