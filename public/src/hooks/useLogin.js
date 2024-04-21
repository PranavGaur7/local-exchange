import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";
const useLogin =async (data)=>{
    const response = await axios.post(loginRoute,{
        username:data.username,
        password:data.password
    })
    return response
}

export default useLogin