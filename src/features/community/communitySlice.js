import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  communityList: []
}

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      console.log(action.payload);
      state.communityList = action.payload;
    }
  }
});

export const {
  selectCategory
} = communitySlice.actions;

export const selectCommunityList = state => state.community.communityList;

export default communitySlice.reducer;