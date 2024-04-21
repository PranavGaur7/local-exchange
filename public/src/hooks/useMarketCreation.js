import axios from "axios";
import { createMarketRoute } from "../utils/ApiRoutes";
const useMarketCreation =async (data)=>{
    const response = await axios.post(createMarketRoute,data)
    return response
}

export default useMarketCreation