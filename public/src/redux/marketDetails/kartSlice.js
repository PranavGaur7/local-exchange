import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useAddToKart from "../../hooks/useAddToKart";
import useRemoveFromKart from "../../hooks/useRemoveFromKart";
import useKartData from "../../hooks/useKartData";
const initialState = {
    count: 0,
    item: []
}

export const compileKartAsync = createAsyncThunk(
    'kart/compileKart',
    async (payload, thunkAPI) => {
        try {
            const data = await useKartData(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editKartAsync = createAsyncThunk(
    'kart/editKart',
    async (payload, thunkAPI) => {
        const { mode, kartDetails, auth } = payload;
        try {
            let kartData
            if (mode === "add") {
                kartData = await useAddToKart(kartDetails, auth);
            } else {
                kartData = await useRemoveFromKart(kartDetails, auth);
            }
            return { kartData, mode };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const kartSlice = createSlice({
    name: "kart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(compileKartAsync.fulfilled, (state, action) => {
                if (action.payload) {

                    state.item = action.payload.kartDetails
                    state.count = action.payload.kartDetails.length
                }
            })
            .addCase(editKartAsync.fulfilled, (state, action) => {
                if (action.payload.mode === "add") {
                    state.count++;
                    state.item.push(action.payload.kartData)
                }
                else {
                    state.count--;
                    state.item = action.payload.kartData
                }
            })
            .addCase(compileKartAsync.rejected, (state, action) => {
                console.log("error", action.payload);
            })
            .addCase(editKartAsync.rejected, (state, action) => {
                console.log("error", action.payload);
            });
    }
})

export default kartSlice.reducer