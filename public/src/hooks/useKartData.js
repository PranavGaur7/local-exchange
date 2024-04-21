import axios from "axios";
import { getUserKartRoute } from "../utils/ApiRoutes";
const useKartData = async (token) => {
    try {

        const response = await axios.get(getUserKartRoute,{
            headers: {
                "auth-token":token
            }
        })
        return response.data.kartData
    } catch (error) {
        console.log(error);
    }
}

export default useKartData