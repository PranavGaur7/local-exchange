import axios from "axios";
import { deleteMraketRoute } from "../utils/ApiRoutes";
const useRemovemarket =async (id)=>{
    const response = await axios.delete(`${deleteMraketRoute}${id}`)
    return response.data
}

export default useRemovemarket
