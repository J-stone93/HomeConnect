import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // fees: Array(12).fill({ electric: 0, water: 0, maintenance: 0 }),
  fees: [
    { electric: 30000, water: 20000, maintenance: 15000 }, // 1월
    { electric: 32000, water: 21000, maintenance: 15500 }, // 2월
    { electric: 31000, water: 22000, maintenance: 16000 }, // 3월
    { electric: 33000, water: 23000, maintenance: 16500 }, // 4월
    { electric: 34000, water: 24000, maintenance: 17000 }, // 5월
    { electric: 35000, water: 25000, maintenance: 17500 }, // 6월
    { electric: 36000, water: 26000, maintenance: 18000 }, // 7월
    { electric: 37000, water: 27000, maintenance: 18500 }, // 8월
    { electric: 38000, water: 28000, maintenance: 19000 }, // 9월
    { electric: 39000, water: 29000, maintenance: 19500 }, // 10월
    { electric: 40000, water: 30000, maintenance: 20000 }, // 11월
    { electric: 41000, water: 31000, maintenance: 20500 }  // 12월
  ],
  payments: [],
};

const feeSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    setFee: (state, action) => {
      const { month, type, amount } = action.payload;
      state.fees[month - 1][type] = amount; // 월의 인덱스와 타입에 따라 금액 설정
    },
    // addPayment: (state, action) => {
    //   state.payments.push(action.payload); // 결제 내역 추가
    // },
    // cancelPayment: (state, action) => {
    //   const { merchant_uid } = action.payload;
    //   state.payments = state.payments.filter(payment => payment.merchant_uid !== merchant_uid);
    // },
  },
});

export const { setFee, addPayment, cancelPayment } = feeSlice.actions;
export default feeSlice.reducer;