import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";



const initialState={
    token:null
}

export const authslice=createSlice({
    name:'auth',
    initialState,
    reducers:{
       set_token:(state,action)=>{
          state.token=action.payload;
          AsyncStorage.setItem('bookinguserToken',action.payload).then(()=>{
            console.log("Token saved successfully")
          }).catch((err:any)=>{
            console.log("Error while setting token","=>",err)
          })
       }
    }
})

export const {set_token}=authslice.actions;
export default authslice.reducer;