import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardList: [],
  healthList: [],
  noticeList: [
    {
      id : 1,
      title: '공지사항입니다.1',
      content: '전기점검 날짜입니다.1'
    },
    {
      id : 2,
      title: '공지사항입니다.2',
      content: '전기점검 날짜입니다.2'
    },
    {
      id : 3,
      title: '공지사항입니다.3',
      content: '전기점검 날짜입니다.3'
    },
  ]
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoardList: (state, {payload : boardList}) => {
      state.boardList = boardList;
    },
    removeBoardList: (state, { payload: id }) => {
      state.boardList = state.boardList.filter(list => list.id !== id);
    },
    HealthContent: (state, action) => {
      state.healthList.push({
        id: action.payload.id,
        title: action.payload.title,
        content: action.payload.content
      });
    },
    NoticeContent: (state, action) => {
      state.noticeList.push({
        id: action.payload.id,
        title: action.payload.title,
        content: action.payload.content,
        date: action.payload.date 
      });
    },
    removeHealthList: (state, { payload: id }) => {
      const newList = state.healthList.filter(list => list.id !== id);
      state.healthList = newList;
    },
    clearBoardList : (state) => {
      state.boardList = [];
    },
  }
});

export const {
  getBoardList,
  HealthContent,
  NoticeContent,
  removeBoardList,
  clearBoardList,
} = boardSlice.actions;

export const selectBoardList = state => state.board.boardList;
export const selectHealthInfo = state => state.board.healthList;
export const selectNoticeInfo = state => state.board.noticeList;

export default boardSlice.reducer;