import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  profile:null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      (state.user = payload.user),(state.profile = payload.profile), (state.token = payload.token);
      Cookies.set("user", JSON.stringify(state.user));
      Cookies.set("profile", JSON.stringify(state.profile));
      Cookies.set("token", state.token);
    },
    removeUser: (state) => {
      (state.user = null),(state.profile = null), (state.token = null);
      Cookies.remove("user");
      Cookies.remove("profile");      
      Cookies.remove("token");
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
