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

function BasicCalendar(props) {
  const { setDate } = props;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  };

  const [value, setValue] = useState('');

  const handleDateChange = (date) => {
    setValue(formatDate(date));
    setDate(formatDate(date));
  };

  return (
    <CalendarContainer>
      <h2>공지날짜 선택하기</h2>
      <Calendar onClickDay={handleDateChange} value={value} />
    </CalendarContainer>
  );
}

export default BasicCalendar;
