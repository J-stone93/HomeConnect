import { createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const initialState = {
  // fees: Array(12).fill({ electric: 1, water: 1, maintenance: 1}),
  // fees: [
  //   { electric: 0, water: 0, maintenance: 0 }, // 1월
  //   { electric: 0, water: 0, maintenance: 0 }, // 2월
  //   { electric: 0, water: 0, maintenance: 0 }, // 3월
  //   { electric: 0, water: 0, maintenance: 0 }, // 4월
  //   { electric: 0, water: 0, maintenance: 0 }, // 5월
  //   { electric: 0, water: 0, maintenance: 0 }, // 6월
  //   { electric: 0, water: 0, maintenance: 0 }, // 7월
  //   { electric: 0, water: 0, maintenance: 0 }, // 8월
  //   { electric: 0, water: 0, maintenance: 0 }, // 9월
  //   { electric: 0, water: 0, maintenance: 0 }, // 10월
  //   { electric: 0, water: 0, maintenance: 0 }, // 11월
  //   { electric: 5555, water: 5465, maintenance: 0 }  // 12월
  // ],
  
  fees: Array.from({ length: 12 }, () => ({
    electric: 0,
    water: 0,
    maintenance: 0,
  })),
  payments: [],
};

const feeSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    // setFee: (state, action) => {
    //   const { month, type, amount } = action.payload;
    //   state.fees[month - 1][type] = amount; // 월의 인덱스와 타입에 따라 금액 설정
    //   console.log(action);
    // },
    setFees: (state, action) => {
      state.fees = action.payload;  // 전체 요금 데이터를 상태로 설정
      // const index = action.payload[].month-1;
      // state.fees.fees[index];
      console.log(action);
      console.log(action.payload[1]);
    },
    addPayment: (state, action) => {
      state.payments.push(action.payload); // 결제 내역 추가
    },
    // cancelPayment: (state, action) => {
    //   const { merchant_uid } = action.payload;
    //   state.payments = state.payments.filter(payment => payment.merchant_uid !== merchant_uid);
    // },
  },
});

export const { setFee, setFees,addPayment, cancelPayment } = feeSlice.actions;

export const selectMyFee = (state, month) => state.fees.fees[month - 1];
// export const selectMyFee = (state, action) => {
//   const index = action.payload[].month - 1;
//   return state.fees.fees[index];
// };

export default feeSlice.reducer;