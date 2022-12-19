import { createAction, createReducer } from "@reduxjs/toolkit";

export const userLogin = createAction("LOGIN");
export const userLogout = createAction("LOGOUT");

const initialUser = {
  name: "",
  lastname: "",
  nickname: "",
  email: "",
  age: "",
};

const userReducer = createReducer(initialUser, {
  [userLogin]: (state, action) => {
    return action.payload},
  [userLogout]: (state, action) => {
    return initialUser;
  },
});

export default userReducer;
