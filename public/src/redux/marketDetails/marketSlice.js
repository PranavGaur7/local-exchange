import { createSlice } from "@reduxjs/toolkit";
const initialState={
    market:[]
}
export const marketSlice = createSlice({
    name:"market",
    initialState,
    reducers:{
        setMarket:(state,action)=>{
            state.market = action.payload;
        }
    }
})

export const {setMarket} =  marketSlice.actions
export default marketSlice.reducer