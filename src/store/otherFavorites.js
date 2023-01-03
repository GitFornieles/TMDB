import { createAction, createReducer } from "@reduxjs/toolkit";

export const setOtherFav = createAction("setOtherFav");


const initialFav = [];

const otherFavReducer = createReducer(initialFav, {
  [setOtherFav]: (state, action) => {
    return action.payload;
  },
});

export default otherFavReducer;
