import axios from "axios";
import { signupRoute } from "../utils/ApiRoutes";
const useSignup = async (data)=>{
    const response = await axios.post(signupRoute,{
        username:data.username,
        email:data.email,
        password:data.password
        
    })
    return response;
}
export default useSignup