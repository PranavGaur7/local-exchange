import axios from "axios";
import { getAllMarketRoute } from "../utils/ApiRoutes";
const useGetAllMarket =async (data)=>{
    const response = await axios.post(getAllMarketRoute,data)
    return response
}

export default useGetAllMarket
