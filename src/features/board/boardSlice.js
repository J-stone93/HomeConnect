import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardList: [],
  noticeList: [
    {
      id : 1,
      title: '공지사항입니다.1',
      content: '전기점검 날짜입니다.1',
      date: '2024.07.05'
    },
  ],
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