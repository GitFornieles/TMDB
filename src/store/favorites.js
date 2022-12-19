import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFav = createAction("setFav");
export const addFav = createAction("addFav");
export const remFav = createAction("remFav");

const initialFav = [];

const favReducer = createReducer(initialFav, {
  [setFav]: (state, action) => {
    return action.payload;
  },
  [addFav]: (state, action) => {
    //action.payload => ID del recurso
    state.push(action.payload);
  },
  [remFav]: (state, action) => {
    //action.payload => ID del recurso
    let new_state = state.filter((elemento) => elemento.recId !== action.payload);
    return new_state;
  },
});

export default favReducer;
