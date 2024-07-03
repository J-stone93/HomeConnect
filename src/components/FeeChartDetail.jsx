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
import { cancelPayment } from '../features/fee/feeSlice';
import axios from 'axios';

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

const StyledDiv = styled.div`
  width: 55%;
  margin: 0 auto ;
  margin-top: 3rem;
  padding: 1rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
`
const StyledDiv2 = styled.div`
  width: 80%;
  max-height: 800px;
  margin: 0 auto ;
  margin-top: 10px;
  padding: 1rem; 
  text-align: center;
`

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
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

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
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
`

function FeeChartDetail() {
  const fees = useSelector((state) => state.fees.fees);
  const [visibleDatasets, setVisibleDatasets] = useState(['electric', 'water', 'maintenance']);
  const [selectedMonth, setSelectedMonth] = useState('');
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.fees.payments);

  // 결제 시스템
  const Payment = (effect, deps) => {
    useEffect(() => {
      const jquery = document.createElement("script");
      jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
      const iamport = document.createElement("script");
      iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
      document.head.appendChild(jquery);
      document.head.appendChild(iamport);
      return () => {
        document.head.removeChild(jquery); 
        document.head.removeChild(iamport); 
      }
    }, []);
  };

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
      name: selectedMonth + '월 관리비',
      amount: amount,
      buyer_name: '이름',
      buyer_tel: '전화번호',
      buyer_email: 'por0632@naver.com',
      buyer_addr: '주소',
      buyer_postalcode: '12345'
    }, function (rsp) {
      if (rsp.success) {
        axios({
          url: '{}'
        })
        console.log(rsp);
      } else {
        console.log(rsp);
      }
    });
  }

  // const callback = (response) => {
  //   const {success, error_msg} = response;
  //   if (success) {
  //     const merchant_uid = response.imp_uid; // 주문번호
  //     const imp_uid = response.imp_uid; // 고유번호

  //     // 백엔드 검증
  //     pointCheck(imp_uid, merchant_uid);

  //     // db 저장
  //     pointSubmit(response.imp_uid);
  //     alert('결제 성공');
  //   } else {
  //     alert(`결제 실패 : ${error_msg}`);
  //   }
  // }

  // //백엔드 검증 함수
  // const pointCheck = async (imp_uid, merchant_uid) => {
  //   try {
  //     console.log('백엔드 검증 실행');
  //     const response = await axios.post('http://localhost:8080/verify/' + imp_uid);

  //     console.log('결제 검증 완료', response.data);
  //     //db에 저장
  //     pointSubmit(merchant_uid);
  //   } catch (error) {
  //     console.error('결제 검증 실패', error);
  //   }
  // };

  // //결제 정보 전달
  // const pointSubmit = async (merchant_uid) => {
  //   try {
  //     console.log('넘어가는 결제 번호:' + merchant_uid);
  //     const response = await axios.post('http://localhost:8080/user/myPage/point/pay', {
  //       pointCertify: merchant_uid.toString(),
  //       userEmail: 'por0632@naver.com',
  //     });

  //     // 받은 데이터
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('결제 테이블 저장 실패', error);
  //   }
  // };

  // 결제 취소
  const onCancelPayment = async (merchant_uid) => {
    const { IMP } = window;
    IMP.init('imp86124615');

    IMP.cancel({
      merchant_uid,
      reason: '사용자 요청'
    }, (rsp) => {
      if (rsp.success) {
        alert('결제 취소 성공');
        dispatch(cancelPayment({ merchant_uid }));
      } else {
        alert(`결제 취소 실패: ${rsp.error_msg}`);
      }
    });
  }

  // 관리비 레이블 변환
  const toggleDataset = (label) => {
    setVisibleDatasets((prev) => 
      prev.includes(label)
        ? prev.filter((dataset) => dataset !== label)
        : [...prev, label]
    );
  };

  // 숫자 포맷
  const formatter = new Intl.NumberFormat('ko-KR', {currency: 'KRW'});
  
   // 항목별 총합과 평균 계산
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

  const datasets = [
    {
      label: '전기세',
      data: fees.map(fee => fee.electric),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      hidden: !visibleDatasets.includes('electric'),
    },
    {
      label: '수도세',
      data: fees.map(fee => fee.water),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      hidden: !visibleDatasets.includes('water'),
    },
    {
      label: '관리비',
      data: fees.map(fee => fee.maintenance),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
    <StyledDiv2>
      <HeaderDiv>
        <h2>2024년 관리비 상세내역</h2>
            <PaymentButton type='text' onClick={onClickPayment}>결제하기</PaymentButton>
          <StyledSelect 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className='select'
            >
            <option value="">결제월</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{`${i + 1}월`}</option>
            ))}
          </StyledSelect >
      </HeaderDiv>
      <Bar data={data} options={options} />
    </StyledDiv2>


    <StyledDiv>
      <div style={{ fontSize: '1rem', textAlign: 'center', fontWeight: '900' }}>
        <p>전기세 총합: {formatter.format(totalFees.electric)}원</p> 
        <p>전기세 평균: {formatter.format(averageFees.electric)}원</p>
      </div>
      <div style={{ fontSize: '1rem', textAlign: 'center', fontWeight: '900' }}>
        <p>수도세 총합: {formatter.format(totalFees.water)}원</p>
        <p>수도세 평균: {formatter.format(averageFees.water)}원</p>
      </div>
      <div style={{ fontSize: '1rem', textAlign: 'center', fontWeight: '900' }}>
        <p>관리비 총합: {formatter.format(totalFees.maintenance)}원</p>
        <p>관리비 평균: {formatter.format(averageFees.maintenance)}원</p>
      </div>
    </StyledDiv>

    <StyledDiv2>
        <h3>결제 내역</h3>
        {payments.length === 0 ? (
          <p>결제 내역이 없습니다.</p>
        ) : (
          <ul>
            {payments.map((payment, index) => (
              <li key={index}>
                {payment.selectedMonth}월 관리비 결제 - 결제 ID: {payment.merchant_uid}
                <CancelButton onClick={() => onCancelPayment(payment.merchant_uid)}>결제 취소</CancelButton>
              </li>
            ))}
          </ul>
        )}
      </StyledDiv2>
    </>
  );
};

export default FeeChartDetail;