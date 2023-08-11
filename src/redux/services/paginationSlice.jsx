import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
  links: [],
};

export const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState,
  reducers: {
    addLinks:(state,{payload})=>{
        state.links=payload;
    },
  },
});

export const {addLinks} = paginationSlice.actions;
export default paginationSlice.reducer;
