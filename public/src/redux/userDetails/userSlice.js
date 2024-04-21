import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLoggedIn:false,
    userDetails:null,
    currentUser:null
}
export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            const {isLoggedIn,user} = action.payload;
            state.isLoggedIn = isLoggedIn;
            state.userDetails = user;
        },
        setLogout:(state,action)=>{
            state.isLoggedIn = false;
            state.userDetails = null;
        },
        seCurrentUser:(state,action)=>{
            state.currentUser = action.payload;
        }
    }
})

export const {setLogin,setLogout,seCurrentUser} =  userSlice.actions
export default userSlice.reducer