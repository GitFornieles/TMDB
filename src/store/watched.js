import { createAction, createReducer } from "@reduxjs/toolkit";

export const setWatched = createAction("setWatched");
export const addWatched = createAction("addWatched");
export const remWatched = createAction("remFWatched");

const initialWatched = [];

const watchedReducer = createReducer(initialWatched, {
  [setWatched]: (state, action) => {
    return action.payload;
  },
  [addWatched]: (state, action) => {
    //action.payload => ID del recurso
    state.push(action.payload);
  },
  [remWatched]: (state, action) => {
    //action.payload => ID del recurso
    let new_state = state.filter((elemento) => elemento.recId !== action.payload);
    return new_state;
  },
});

export default watchedReducer;
