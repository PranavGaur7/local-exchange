import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";
const useProfile = async (authToken) => {
    if (!authToken) {
        return null;
    }
    try {
        const response = await axios.get(loginRoute, {
            headers: {
                "auth-token": authToken
            }
        });
        return response.data; // Assuming you want to return the data from the response
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};

export default useProfile