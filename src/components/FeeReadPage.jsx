import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFees } from "../features/fee/feeSlice";
import { selectmyInfo } from "../features/main/mainSlice";
import styled from 'styled-components';
import { addressKey } from '..';

const FeeReadPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  text-align: center;
  padding: 30px;
  font-size: 2em;
  color: #333;
`;

const FeeList = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FeeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const Label = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const InputField = styled.input`
  margin-left: 5px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ModifyButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function FeeReadPage() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectmyInfo);
  const fees = useSelector((state) => state.fees.fees);
  const [editedFees, setEditedFees] = useState([]);

  useEffect(() => {
    const fetchFeeInfo = async () => {
      try {
        const response = await axios.get(`${addressKey}/fee/list`, {
          headers: {
            Authorization: localStorage.getItem('token')
          },
          params: {
            'userId': userInfo.userId
          }
        });
        console.log(userInfo.userId);
        console.log(response);
        if (response.status === 200) {
          const sortedFees = response.data.sort((a, b) => a.month - b.month);
          dispatch(setFees(sortedFees));
          setEditedFees(sortedFees); // 초기 상태 설정
        }
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    }
    if (userInfo && userInfo.userId) {
      fetchFeeInfo();
    }
  }, [userInfo, dispatch]);

  const handleInputChange = (index, field, value) => {
    const newFees = [...editedFees];
    const minValue = 0;
    const maxValue = 12;

    // 입력값이 숫자가 아니거나 범위를 벗어난 경우
    if (isNaN(value) || value < minValue || value > maxValue) {
      alert(`입력값은 ${minValue+1}에서 ${maxValue} 사이의 숫자여야 합니다.`);
      return window.location.reload();
    }
    newFees[index] = {
      ...newFees[index],
      [field]: value
    };
    setEditedFees(newFees);
    console.log(editedFees);
  };

  const modifyFee = async (fee) => {
    try {
      const response = await axios.put('http://localhost:8080/fee/modify', fee, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (response.status === 204) {
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
    <FeeReadPageWrapper>
      <Header>관리비 조회 및 수정</Header>
      <FeeList>
        {editedFees.map((fee, index) => (
          <FeeItem key={index}>
            <Label>
              월
              <InputField
                type="number"
                name="month"
                min="1"
                max="12"
                value={fee.month}
                onChange={(e) => handleInputChange(index, 'month', e.target.value)}
              />
            </Label>
            <Label>
              수도세
              <InputField
                type="number"
                name="water"
                value={fee.water}
                onChange={(e) => handleInputChange(index, 'water', e.target.value)}
              />
            </Label>
            <Label>
              전기
              <InputField
                type="number"
                name="electric"
                value={fee.electric}
                onChange={(e) => handleInputChange(index, 'electric', e.target.value)}
              />
            </Label>
            <Label>
              관리비
              <InputField
                type="number"
                name="maintenance"
                value={fee.maintenance}
                onChange={(e) => handleInputChange(index, 'maintenance', e.target.value)}
              />
            </Label>
            <ButtonWrapper>
              <ModifyButton type="button" onClick={() => modifyFee(fee)}>수정</ModifyButton>
            </ButtonWrapper>
          </FeeItem>
        ))}
      </FeeList>
    </FeeReadPageWrapper>
  );
}

export default FeeReadPage;
