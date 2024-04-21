import axios from "axios";
import { addToKartRoute } from "../utils/ApiRoutes";
const useAddToKart = async (kartDetails,token) => {
    try {

        const response = await axios.post(addToKartRoute, {
            kartDetails
        },{
            headers: {
                "auth-token":token
            }
        })
        return response.data.market
    } catch (error) {
        console.log(error);
    }
}

export default useAddToKart