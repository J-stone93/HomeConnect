// FeeChartDetail.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import styled from 'styled-components';
import { cancelPayment, setFees } from '../features/fee/feeSlice';
import axios from 'axios';
import { selectmyInfo } from '../features/main/mainSlice';
import { addressKey } from '..';

// Chart.js에 필요한 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CalContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CalDivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CalDiv = styled.div`
  width: 30%;
  height: 7rem;
  margin: 0 auto;
  text-align: center;
  border: 2px solid black;
  border-radius: 10px;
  p {
    margin-top: 10px;
    font-size: 18px;
  }
`;

const StyledDiv2 = styled.div`
  width: 80%;
  max-height: 800px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 1rem; 
  text-align: center;
`;

const StyledDiv3 = styled.div`
  width: 80%;
  max-height: 400px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 1rem; 
  text-align: center;
`;

const TestDiv = styled.div`
  height: 10%;
  width: 80%;
  flex: 5;
  text-align: center;
  margin-top: 10px;
`;

const TestDivWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const PaymentButton = styled.button`
  position: absolute;
  top: 3rem;
  right: 0;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  border: none;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PaymentDetail = styled.div`
  margin-bottom: 10px;
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

function FeeChartDetail() {
  const fees = useSelector((state) => state.fees.fees);
  const [visibleDatasets, setVisibleDatasets] = useState(['electric', 'water', 'maintenance']);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectmyInfo);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    closeModal();
  };

  const today = new Date();
  const formattedYear = `${today.getFullYear()}`;
  const formattedDate = `${formattedYear}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

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
        if (response.status === 200) {
          dispatch(setFees(response.data));
        }
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };
    if (userInfo && userInfo.userId) {
      fetchFeeInfo();
    }
  }, [userInfo, dispatch]);

  const onClickPayment = () => {
    if (!selectedMonth) {
      alert('결제할 월을 선택해주세요.');
      return;
    }

    const monthIndex = parseInt(selectedMonth) - 1;
    const monthFees = fees[monthIndex];
    const amount = monthFees.electric + monthFees.water + monthFees.maintenance;

    const { IMP } = window;
    IMP.init('imp86124615');

    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      month: selectedMonth + '월 관리비',
      amount: amount,
      buyer_name: userInfo.name,
      buyer_tel: '전화번호',
      buyer_email: 'por0632@naver.com',
      buyer_addr: userInfo.address,
      buyer_postalcode: '12345'
    }, async function (rsp) { // 콜백
      if (rsp.success) {
        await axios.post(`${addressKey}/pay/register`, {
          merchant_uid: rsp.merchant_uid,
          imp_uid: rsp.imp_uid,
          amount: amount,
          month: rsp.month,
          buyer_name: rsp.buyer_name,
          email: rsp.buyer_email,
          card_name: rsp.card_name,
          time: formattedDate
        });
        setPaymentInfo(rsp);
        alert('결제 성공');
        openModal(); // 모달 창 열기
      } else {
        alert(rsp.error_msg);
      }
    });
  };

  const toggleDataset = (label) => {
    setVisibleDatasets((prev) => 
      prev.includes(label)
        ? prev.filter((dataset) => dataset !== label)
        : [...prev, label]
    );
  };

  const formatter = new Intl.NumberFormat('ko-KR', {currency: 'KRW'});
  
  const totalFees = fees.reduce((acc, fee) => {
    acc.electric += fee.electric;
    acc.water += fee.water;
    acc.maintenance += fee.maintenance;
    return acc;
  }, { electric: 0, water: 0, maintenance: 0 });

  const averageFees = {
    electric: (totalFees.electric / fees.length).toFixed(0),
    water: (totalFees.water / fees.length).toFixed(0),
    maintenance: (totalFees.maintenance / fees.length).toFixed(0),
  };

  const fixedFees = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const fee = fees.find(f => f.month === month);
    return fee || { month, electric: 0, water: 0, maintenance: 0 };
  });

  const datasets = [
    {
      label: '전기세',
      data: fixedFees.map(fee => fee.electric),
      backgroundColor: 'rgba(224, 14, 60, 0.6)',
      hidden: !visibleDatasets.includes('electric'),
    },
    {
      label: '수도세',
      data: fixedFees.map(fee => fee.water),
      backgroundColor: 'rgba(5, 138, 226, 0.6)',
      hidden: !visibleDatasets.includes('water'),
    },
    {
      label: '관리비',
      data: fixedFees.map(fee => fee.maintenance),
      backgroundColor: 'rgba(14, 199, 199, 0.6)',
      hidden: !visibleDatasets.includes('maintenance'),
    },
  ];

  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: datasets,
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const label = datasets[index].label;
          toggleDataset(label === '전기세' ? 'electric' : label === '수도세' ? 'water' : 'maintenance');
        },
      },
    },
  };

  return (
    <>
      <CalContainer>
        <TestDivWrapper>
          <TestDiv>
            <h2>{formattedYear}년 평균 관리비</h2>
          </TestDiv>
          <TestDiv >
            <h2>{formattedYear}년 관리비 합계</h2>
          </TestDiv>
        </TestDivWrapper>
        <CalDivWrapper>
          <CalDiv>
            <p>
              ◼ 전기세: {formatter.format(averageFees.electric)}원
              <br/>
              ◼ 수도세: {formatter.format(averageFees.water)}원
              <br/>
              ◼ 관리비: {formatter.format(averageFees.maintenance)}원
            </p>
          </CalDiv>
          <CalDiv>
            <p>
              ◼ 전기세: {formatter.format(totalFees.electric)}원
              <br/>
              ◼ 수도세: {formatter.format(totalFees.water)}원
              <br/>
              ◼ 관리비: {formatter.format(totalFees.maintenance)}원
            </p> 
          </CalDiv>
        </CalDivWrapper>
      </CalContainer>
      <StyledDiv2>
        <HeaderDiv>
          <h2>{formattedYear}년 관리비 상세내역</h2>
          <PaymentButton type='text' onClick={onClickPayment}>결제하기</PaymentButton>
          <StyledSelect 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">결제월</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{`${i + 1}월`}</option>
            ))}
          </StyledSelect>
        </HeaderDiv>
        <Bar data={data} options={options} style={{ maxHeight: '768px' }} />
      </StyledDiv2>

      {isModalOpen && paymentInfo && (
        <ModalOverlay onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Payment Details</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <PaymentDetail>
              <PaymentLabel>Payment ID:</PaymentLabel>
              <PaymentValue>{paymentInfo.imp_uid}</PaymentValue>
            </PaymentDetail>
            <PaymentDetail>
              <PaymentLabel>Buyer Name:</PaymentLabel>
              <PaymentValue>{paymentInfo.buyer_name}</PaymentValue>
            </PaymentDetail>
            <PaymentDetail>
              <PaymentLabel>Card Name:</PaymentLabel>
              <PaymentValue>{paymentInfo.card_name}</PaymentValue>
            </PaymentDetail>
            <PaymentDetail>
              <PaymentLabel>Month:</PaymentLabel>
              <PaymentValue>{paymentInfo.month}</PaymentValue>
            </PaymentDetail>
            <PaymentDetail>
              <PaymentLabel>Amount:</PaymentLabel>
              <PaymentValue>{paymentInfo.amount}</PaymentValue>
            </PaymentDetail>
            <PaymentDetail>
              <PaymentLabel>Time:</PaymentLabel>
              <PaymentValue>{paymentInfo.time}</PaymentValue>
            </PaymentDetail>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
}

export default FeeChartDetail;
