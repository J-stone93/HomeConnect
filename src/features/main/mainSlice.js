import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myInfo : {},
};

const mainSlice = createSlice({
  name : 'main',
  initialState,
  reducers : {
    getmyInfo : (state,{payload : user}) => {
      state.myInfo = user;
    }
  } 
});

export const {getmyInfo} = mainSlice.actions;
export const selectmyInfo = state => state.main.myInfo;

export default mainSlice.reducer;

