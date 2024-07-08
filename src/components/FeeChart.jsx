import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

// Chart.js에 필요한 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function FeeChart() {
  const fees = useSelector((state) => state.fees.fees);

  // 월별 합계 계산
  const totalFees = fees.map(fee => fee.electric + fee.water + fee.maintenance);

  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        type: 'bar',
        label: '월별 총 관리비',
        data: totalFees,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ]
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
  };

  return (
    <div style={{ width: '90%', height: '550px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FeeChart;