import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectmyInfo } from '../features/main/mainSlice';
import axios from 'axios';
import { setFees } from '../features/fee/feeSlice';
import { addressKey } from '..';

function FeeInputForm() {
  const [no, setNo] = useState('');
  const [month, setMonth] = useState('');
  const [water, setWater] = useState('');
  const [electric, setElectric] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const userInfo = useSelector(selectmyInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeeInfo = async () => {
      try {
        const response = await axios.get(`${addressKey}/fee/list`,
        { headers: {
          Authorization: localStorage.getItem('token')
        },
        params: {
          'userId': userInfo.userId
        }
      }
    );
    console.log(userInfo.userId);
    console.log(response);
    if (response.status === 200) {
      dispatch(setFees(response.data));
      
    }
  } catch (error) {
    console.error("Error fetching fee data:", error);
  }
}
    if (userInfo && userInfo.userId) {
      fetchFeeInfo();
    }
  }, [userInfo]);

  const handleFeeSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.post(`${addressKey}/fee/register`, 
      {
        "userId": userInfo.userId,
        "month": month,
        "water": water,
        "electric": electric,
        "maintenance": maintenance
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        alert("성공");
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please check your token or login again.');
      }
    }
  };

  return (
    <>
      <div>
        <label>
          월:
          <input type="number" name="month" value={month} onChange={(e) => setMonth(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          수도:
          <input type="number" name="water" value={water} onChange={(e) => setWater(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          전기:
          <input type="number" name="electric" value={electric} onChange={(e) => setElectric(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          관리비:
          <input type="number" name="maintenance" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} required />
        </label>
      </div>

      <button type="button" onClick={handleFeeSubmit}>Submit</button>
    </>
  );
}

export default FeeInputForm;
