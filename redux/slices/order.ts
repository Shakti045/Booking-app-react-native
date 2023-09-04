import { createSlice } from "@reduxjs/toolkit"

const initialState={
    bookingdetails:null
}

export const orderslice=createSlice({
    name:'order',
    initialState,
    reducers:{
        set_bookingdetails:(state,action)=>{
            state.bookingdetails=action.payload;
        }
    }
})


export const {set_bookingdetails}=orderslice.actions;
export default orderslice.reducer;
