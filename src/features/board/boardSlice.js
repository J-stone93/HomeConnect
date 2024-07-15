import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardList: [],
  noticeList: [],
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoardList: (state, {payload : boardList}) => {
      state.boardList = boardList;
    },
    getNoticeList: (state, {payload : noticeList}) => {
      state.noticeList = noticeList;
    },
  }
});

export const {
  getBoardList,
  getNoticeList,
} = boardSlice.actions;

export const selectBoardList = state => state.board.boardList;
export const selectNoticeList = state => state.board.noticeList;

export default boardSlice.reducer;