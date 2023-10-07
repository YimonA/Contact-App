import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
  contacts: [],
  searchTerm: "",
  links:null,
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    addContacts:(state,{payload})=>{
        state.contacts=payload;
    },
    addLinks:(state,{payload})=>{
      state.links=payload;
  },
    setSearchTerm:(state,{payload})=>{
        state.searchTerm=payload;
    }
  },
});

export const {addContacts,setSearchTerm,addLinks} = contactSlice.actions;
export default contactSlice.reducer;
