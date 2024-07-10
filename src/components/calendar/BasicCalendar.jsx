import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 50%;
  max-width: 410px;
  margin-top: 50px;
  margin-left: 50px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

function BasicCalendar() {
  const [value, onChange] = useState(new Date());

  const handleDateChange = (date) => {
    onChange(date);
    console.log('Selected date:', date);  // 클릭한 날짜 데이터 추출
  };


  return (
    <CalendarContainer>
      <h2>공지날짜 선택하기</h2>
      <Calendar onChange={handleDateChange} value={value} />
    </CalendarContainer>
  );
}

export default BasicCalendar;