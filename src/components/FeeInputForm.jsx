import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectmyInfo } from '../features/main/mainSlice';
import axios from 'axios';
import { setFees } from '../features/fee/feeSlice';
import { addressKey } from '..';
import { styled } from "styled-components";

const FeeInputFormWrapper = styled.div`
  width: 40%;
  height: 33rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: solid 1px black;
  border-radius: 5px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 90%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const InputField = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  margin-top: 20px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

function FeeInputForm() {
  const [no, setNo] = useState('');
  const [month, setMonth] = useState('');
  const [water, setWater] = useState('');
  const [electric, setElectric] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const userInfo = useSelector(selectmyInfo);
  const dispatch = useDispatch();

  const monthRef = useRef(null);
  const waterRef = useRef(null);
  const electricRef = useRef(null);
  const maintenanceRef = useRef(null);

  useEffect(() => {
    const fetchFeeInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/fee/list`,
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
  }, []);

  const handleFeeSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.post(`http://localhost:8080/fee/register`, 
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
      <FeeInputFormWrapper>
        <h2>관리비 입력</h2>
      <InputGroup>
        <Label>
          월
          <InputField 
            type="number" 
            name="month" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
            ref={monthRef} 
            required 
          />
        </Label>
      </InputGroup>

      <InputGroup>
        <Label>
          수도
          <InputField 
            type="number" 
            name="water" 
            value={water} 
            onChange={(e) => setWater(e.target.value)} 
            ref={waterRef} 
            required 
          />
        </Label>
      </InputGroup>

      <InputGroup>
        <Label>
          전기
          <InputField 
            type="number" 
            name="electric" 
            value={electric} 
            onChange={(e) => setElectric(e.target.value)} 
            ref={electricRef} 
            required 
          />
        </Label>
      </InputGroup>

      <InputGroup>
        <Label>
          관리비
          <InputField 
            type="number" 
            name="maintenance" 
            value={maintenance} 
            onChange={(e) => setMaintenance(e.target.value)} 
            ref={maintenanceRef} 
            required 
          />
        </Label>
      </InputGroup>

      <SubmitButton type="button" onClick={handleFeeSubmit}>Submit</SubmitButton>
    </FeeInputFormWrapper>
    </>
  );
}

export default FeeInputForm;
