import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const signInAsync = (user) => async (dispatch) => {
  Cookies.set("auth-token", user.token, { path: "/" });
  dispatch(signIn(user));
};

export const signOutAsync = () => async (dispatch) => {
  Cookies.remove("auth-token", { path: "/" });
  dispatch(signOut());
};

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
