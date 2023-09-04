import { createSlice } from "@reduxjs/toolkit";
const initialState={
    details:null
}

export const bookingslice=createSlice({
    name:'booking',
    initialState,
    reducers:{
        set_details:(state,action)=>{
            state.details=action.payload;
        }
    }
})

export const {set_details}=bookingslice.actions;
export default bookingslice.reducer;