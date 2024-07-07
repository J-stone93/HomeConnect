import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;

  // 밑에 주소 참고해서 완성해야함
  //https://velog.io/@jh100m1/react-calendar-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%9E%A5%EC%9E%A5-7%EC%9D%BC%EA%B0%84%EC%9D%98-%EA%B3%A0%EA%B5%B0%EB%B6%84%ED%88%AC%EA%B8%B0
  // 캘린더 전체 height 안먹힘
  .react-calendar {
    width: 100%;
    border: 3px solid #000000;
    border-radius: 15px;
  }
  // 달력에 오늘 표시 부분 밑에 당일 날짜 호버 포커스 안먹힘
  .react-calendar__tile--now {
    background: #ff0000;
    color: #000000;
  } 
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    color: #ffffff;
  }
  .react-calendar__navigation {
    height: 90px;
    border-radius: 20px 20px 0 0;

  }
  // 달력 상단에 년월 표시
  .react-calendar__navigation__label > span {
    font-size:  20px;
    font-weight: bold;
    color: black;
  }
  .react-calendar__navigation button:disabled {
    border-radius: 20px 20px 0 0;
  }
  // 요일 부분 
  .react-calendar__month-view__weekdays {
    /* background: gray; */
    abbr { /*월,화,수... 글자 부분*/
      // 텍스
      color: black;
      font-size: 2rem;
      font-weight: 500;
    }
  }
  .react-calendar__tile {
    color: black;
    background: white;
    text-align: center;
  }
`;

function CalendarMain() {
  const [value, onChange] = useState(new Date());


  return (
    <Wrapper>
      <Calendar
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        tileContent
      />
      <div className="text-gray-500 mt-4">
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
    </Wrapper>
  );
};

export default CalendarMain;