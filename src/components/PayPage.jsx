import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectmyInfo } from "../features/main/mainSlice";
import styled from "styled-components";
import axios from "axios";
import { addressKey } from "..";

// Styled components for styling
const Wrapper = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PaymentDetail = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
`;

const PaymentLabel = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const PaymentValue = styled.span`
  color: #495057;
`;

function PayPage() {
  const location = useLocation();
  const userInfo = useSelector(selectmyInfo);
  const [payments, setPayments] = useState(location.state?.payment || null);

  useEffect(() => {
    if (!payments) {
      const fetchPayInfo = async () => {
        try {
          const response = await axios.get(`${addressKey}/pay/read`, {
            headers: {
              Authorization: localStorage.getItem('token')
            },
            params: {
              userId: userInfo.userId
            }
          });
          if (response.status === 200) {
            setPayments(response.data);
          }
        } catch (error) {
          console.error("Error fetching payment data:", error);
        }
      };
      fetchPayInfo();
    }
  }, [payments, userInfo.userId]);

  return (
    <>
      {payments && 
        <Wrapper>
          <PaymentDetail>
            <PaymentLabel>Payment ID:</PaymentLabel>
            <PaymentValue>{payments.imp_uid}</PaymentValue>
          </PaymentDetail>
          <PaymentDetail>
            <PaymentLabel>Buyer Name:</PaymentLabel>
            <PaymentValue>{payments.buyer_name}</PaymentValue>
          </PaymentDetail>
          <PaymentDetail>
            <PaymentLabel>Card Name:</PaymentLabel>
            <PaymentValue>{payments.card_name}</PaymentValue>
          </PaymentDetail>
          <PaymentDetail>
            <PaymentLabel>Month:</PaymentLabel>
            <PaymentValue>{payments.month}</PaymentValue>
          </PaymentDetail>
          <PaymentDetail>
            <PaymentLabel>Amount:</PaymentLabel>
            <PaymentValue>{payments.amount}</PaymentValue>
          </PaymentDetail>
          <PaymentDetail>
            <PaymentLabel>Time:</PaymentLabel>
            <PaymentValue>{payments.time}</PaymentValue>
          </PaymentDetail>
        </Wrapper>
      }
    </>
  );
}

export default PayPage;