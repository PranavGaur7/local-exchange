import axios from "axios";
import { addUserContactsRoute } from "../utils/ApiRoutes";
const useAddContact = async (data) => {
    try {

        const response = await axios.post(addUserContactsRoute, data)
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export default useAddContact