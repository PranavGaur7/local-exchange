import axios from "axios";
import { addMessageroute } from "../utils/ApiRoutes";
const useAddMessage = async (data) => {
    try {

        const response = await axios.post(addMessageroute, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default useAddMessage