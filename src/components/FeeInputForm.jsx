import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFee, setFees } from '../features/fee/feeSlice';
import { addData } from '../api/feeAPI';
import { selectmyInfo } from '../features/main/mainSlice';
import axios from 'axios';

function FeeInputForm() {
  const [month, setMonth] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [formData, setFormData] = useState({
    userId: "",
    month: "",
    water: "",
    electric: "",
    maintenance: ""
  });
  const dispatch = useDispatch();
  const userInfo = useSelector(selectmyInfo);

  useEffect(() => {
    const fetchFeeInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fee/read',
        // { headers: {
        //   Authorization: localStorage.getItem('token'),
        // }}
        );
      console.log(response);
        if (response.status === 200) {
          setFormData(response.data);
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    }
    fetchFeeInfo();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (month && type && amount) {
      dispatch(setFee({ month: parseInt(month), type, amount: parseInt(amount) }));
      setMonth('');
      setType('');
      setAmount('');
    } else {
      alert('월, 항목 및 금액을 입력해주세요.');
    }
  };

  const handleChange2 = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await addData(formData);
      console.log("Data successfully submitted:", response);
      setFormData({
          userId: `${userInfo.userId}`,
          month: "",
          water: "",
          electric: "",
          maintenance: ""
        }
      );
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
    <h2>프론트에 데이터 보내기</h2>
      <div>
        <label>월:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">선택</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{`${i + 1}월`}</option>
          ))}
        </select>
      </div>
      <div>
        <label>항목:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">선택</option>
          <option value="electric">전기세</option>
          <option value="water">수도세</option>
          <option value="maintenance">관리비</option>
        </select>
      </div>
      <div>
        <label>금액:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit">추가</button>
    </form>

    <br/>

    <form onSubmit={handleSubmit2}>
      <h2>백에 데이터 보내기</h2>
      {/* <div>
        <label>
        UserID:
          <input type="text" name="userId" value={formData.userId} onChange={handleChange2} required>{userInfo.userId}</input>
        </label>
      </div> */}

      <div>
        <label>
          월:
          <input type="number" name="month" value={formData.month} onChange={handleChange2} required />
        </label>
      </div>

      <div>
        <label>
          수도:
          <input type="number" name="water" value={formData.water} onChange={handleChange2} required />
        </label>
      </div>

      <div>
        <label>
          전기:
          <input type="number" name="electric" value={formData.electric} onChange={handleChange2} required />
        </label>
      </div>

      <div>
        <label>
          관리비:
          <input type="number" name="maintenance" value={formData.maintenance} onChange={handleChange2} required />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default FeeInputForm;