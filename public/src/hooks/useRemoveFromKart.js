import axios from "axios";
import { removeFromKartRoute } from "../utils/ApiRoutes";
const useRemoveFromKart =async (kartDetails,token)=>{
    try {
        
        const response = await axios.post(removeFromKartRoute,{
            kartDetails
        },{
            headers:{
                "auth-token":token
            }
        })
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

export default useRemoveFromKart