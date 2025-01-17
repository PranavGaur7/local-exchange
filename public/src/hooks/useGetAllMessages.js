import axios from "axios";
import { getAllmessagesroute } from "../utils/ApiRoutes";
const useGetAllMessages = async (data) => {
    try {
        const response = await axios.post(getAllmessagesroute, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export default useGetAllMessages