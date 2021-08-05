import { createSlice } from "@reduxjs/toolkit";
const contactSlice=createSlice({
    name:"contact",
    initialState: [],
    reducers:{
        addContacts:(state,action)=>action.payload,
        deleteContact:(state,action)=>state.filter((data)=>data.id!==action.payload),
        deleteContacts:(state,action)=>state.filter((data)=>!action.payload.includes(data.id)),
    }

})

export default contactSlice.reducer;
export const {addContacts,deleteContact,deleteContacts}=contactSlice.actions;