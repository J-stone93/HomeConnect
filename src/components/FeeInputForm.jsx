// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setFee } from '../features/fee/feeSlice';
// import { addData } from '../api/feeAPI';
// import axios from 'axios';

// function FeeInputForm() {
//   const [month, setMonth] = useState('');
//   const [type, setType] = useState('');
//   const [amount, setAmount] = useState('');
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (month && type && amount) {
//       dispatch(setFee({ month: parseInt(month), type, amount: parseInt(amount) }));
//       setMonth('');
//       setType('');
//       setAmount('');
//     } else {
//       alert('월, 항목 및 금액을 입력해주세요.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>월:</label>
//         <select value={month} onChange={(e) => setMonth(e.target.value)}>
//           <option value="">선택</option>
//           {Array.from({ length: 12 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>{`${i + 1}월`}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>항목:</label>
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="">선택</option>
//           <option value="electric">전기세</option>
//           <option value="water">수도세</option>
//           <option value="maintenance">관리비</option>
//         </select>
//       </div>
//       <div>
//         <label>금액:</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//       </div>
//       <button type="submit" onClick={addData}>추가</button>
//     </form>
//   );
// };

import React, { useState } from 'react';
import { addData } from '../api/feeAPI';

const FeeInputForm = () => {
  const [form, setForm] = useState({ userId: '', month: '', water: '', electric: '', maintenance: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addData(form);
      console.log('Data added:', response);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <form >
      <input name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" />
      <input name="month" value={form.month} onChange={handleChange} placeholder="Month" type="number" />
      <input name="water" value={form.water} onChange={handleChange} placeholder="Water" type="number" />
      <input name="electric" value={form.electric} onChange={handleChange} placeholder="Electric" type="number" />
      <input name="maintenance" value={form.maintenance} onChange={handleChange} placeholder="Maintenance" type="number" />
      <button type="submit" onSubmit={handleSubmit}>Submit</button>
    </form>
  );
};

export default FeeInputForm;