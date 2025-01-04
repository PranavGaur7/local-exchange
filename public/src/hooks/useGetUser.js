import axios from "axios";
import { getUserRoute } from "../utils/ApiRoutes";
const useGetUser = async (token) => {
    try {

        const response = await axios.get(getUserRoute,{
            headers: {
                "auth-token":token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default useGetUser