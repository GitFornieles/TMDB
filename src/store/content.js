import { createAction, createReducer } from "@reduxjs/toolkit";

export const setContent = createAction("SET_CONTENT");

const initialContent = {type:"",data:[]};

const contentReducer = createReducer(initialContent, {
  [setContent]: (state, action) => {
    return action.payload},
});

export default contentReducer;
