import axios from "axios";
import { getUserContactsRoute } from "../utils/ApiRoutes";
const useGateuserContacts =async (data)=>{
    const response = await axios.post(getUserContactsRoute,data)
    return response.data
}

export default useGateuserContacts
