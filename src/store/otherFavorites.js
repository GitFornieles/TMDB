import { createAction, createReducer } from "@reduxjs/toolkit";

export const setOtherFav = createAction("setFav");


const initialFav = [];

const otherFavReducer = createReducer(initialFav, {
  [setOtherFav]: (state, action) => {
    return action.payload;
  },
});

export default otherFavReducer;
