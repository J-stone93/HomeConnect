import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectNoticeInfo } from '../../features/board/boardSlice';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 1rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.gray_1};
    }
  }

  .react-calendar__tile--now {
    background: #ff0000;
    color: #000000;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ff6666;
    color: #ffffff;
  }

  .react-calendar__navigation {
    height: 90px;
    border-radius: 20px 20px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #f0f0f0
  }

  .react-calendar__navigation__label > span {
    font-size: 20px;
    font-weight: bold;
    color: black;
  }

  .react-calendar__navigation button {
    border: none;
    background: none;
    font-size: 1.5rem;
    color: ${(props) => props.theme.gray_1};
    cursor: pointer;
  }

  .react-calendar__navigation button:disabled {
    color: ${(props) => props.theme.gray_1};
  }

  .react-calendar__month-view__weekdays {
    abbr {
      color: black;
      font-size: 2rem;
      font-weight: 500;
    }
  }

  .react-calendar__tile {
    color: black;
    background: white;
    text-align: center;
    width: 100px;
    height: 100px;
    border-radius: 15px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #e0e0e0;
    color: black;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    border-radius: 15px;
    background-color: #e0e0e0;
    color: black;
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(1) abbr {
    color: red; // 일요일 텍스트 빨간색으로 변경
  }
  .react-calendar__tile--sunday {
    color: red; /* 일요일 날짜 글씨 빨간색 */
  }
  .react-calendar__tile--marked {
    background-color: #ffeb3b;
    color: black;
  }
`;

const NoticeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  .notice {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];


function CalendarMain() {
  const [value, onChange] = useState(new Date());
  const NoticeList = useSelector(selectNoticeInfo);
  console.log(NoticeList);

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && date.getDay() === 0) {
      return 'react-calendar__tile--sunday';
    }
    if (NoticeList.some((notice) => moment(notice.date).isSame(date, 'day'))) {
      return 'react-calendar__tile--marked';
    }
    return null;
  };

  const tileContent = ({ date }) => {
    const notices = NoticeList.filter(notice => moment(notice.date).isSame(date, 'day'));
    return notices.map((notice, index) => (
      <div key={index}>{notice.content}</div>
    ));
  };

  return (
    <Wrapper>
      <NoticeWrapper>
        <div className="notice">공지사항</div>
        <Calendar
          onChange={onChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          calendarType="gregory"
          formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
          showNeighboringMonth={false}
          minDetail="year"
          tileContent={tileContent}
          tileClassName={tileClassName} 
        />
      </NoticeWrapper>
        <div className="text-gray-500 mt-4">
          {moment(value).format("YYYY년 MM월 DD일")}
        </div>
    </Wrapper>
  );
};

export default CalendarMain;
