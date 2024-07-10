import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectmyInfo } from '../features/main/mainSlice';
import axios from 'axios';
import { setFees } from '../features/fee/feeSlice';

function FeeInputForm() {
  const [month, setMonth] = useState('');
  const [water, setWater] = useState('');
  const [electric, setElectric] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const userInfo = useSelector(selectmyInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeeInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fee/list',
        { headers: {
          Authorization: localStorage.getItem('token')
        }}
        );
        if (response.status === 200) {
          dispatch(setFees(response.data));
        }
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    }
    fetchFeeInfo();
  }, [userInfo]);

  const handleFeeSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.post('http://localhost:8080/fee/register', 
      {
        "month": month,
        "userId": userInfo.userId,
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
