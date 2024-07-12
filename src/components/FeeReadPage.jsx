import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFees } from "../features/fee/feeSlice";
import { selectmyInfo } from "../features/main/mainSlice";
import styled from "styled-components";

function FeeReadPage() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectmyInfo);
  const fees = useSelector((state) => state.fees.fees);
  const [editedFees, setEditedFees] = useState([]);

  const StyledDiv = styled.div`
    width: 80%;
    
  `

  useEffect(() => {
    const fetchFeeInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fee/list', {
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
          dispatch(setFees(response.data));
          setEditedFees(response.data); // 초기 상태 설정
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

  // const deleteFee = async (fee) => {
  //   try {
  //     const response = await axios.delete('http://localhost:8080/fee/remove', fee, {
  //       headers: {
  //         Authorization: localStorage.getItem('token')
  //       }
  //     });
  //     if (response.status === 204) {
  //       alert("성공");
  //     } else {
  //       throw new Error(`API error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     if (error.response && error.response.status === 401) {
  //       alert('Unauthorized. Please check your token or login again.');
  //     }
  //   }
  // };

  return (
    <>
    <h1 style={{textAlign:'center', padding:'30px'}}>관리비 조회 및 수정</h1>
    <StyledDiv>
      {editedFees.map((fee, index) => (
        <div key={index}>
          <label>
            no:
            <input
              type="number"
              name="no"
              value={fee.no}
              onChange={(e) => handleInputChange(index, 'no', e.target.value)}
              />
          </label>
          <label>
            월:
            <input
              type="number"
              name="month"
              value={fee.month}
              onChange={(e) => handleInputChange(index, 'month', e.target.value)}
              />
          </label>
          <label>
            수도세:
            <input
              type="number"
              name="water"
              value={fee.water}
              onChange={(e) => handleInputChange(index, 'water', e.target.value)}
              />
          </label>
          <label>
            전기:
            <input
              type="number"
              name="electric"
              value={fee.electric}
              onChange={(e) => handleInputChange(index, 'electric', e.target.value)}
              />
          </label>
          <label>
            관리비:
            <input
              type="number"
              name="maintenance"
              value={fee.maintenance}
              onChange={(e) => handleInputChange(index, 'maintenance', e.target.value)}
              />
          </label>
          <button type="button" onClick={() => modifyFee(fee)}>수정</button>
          {/* <button type="button" onClick={() => deleteFee(fee)}>삭제</button> */}
        </div>
      ))}
    </StyledDiv>
      </>
  );
}

export default FeeReadPage;