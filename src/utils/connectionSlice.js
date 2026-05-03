import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnnection:(state,action)=>{
            return action.payload
        },
        removeConnection:()=>null
    }
})

export const {addConnnection,removeConnection}=connectionSlice.actions
export default connectionSlice.reducer