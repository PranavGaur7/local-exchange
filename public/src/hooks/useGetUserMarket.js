import axios from "axios";
import { getUserMarketRoute } from "../utils/ApiRoutes";
const useGetUserMarket =async (data)=>{
    const response = await axios.post(getUserMarketRoute,data)
    return response
}

export default useGetUserMarket
