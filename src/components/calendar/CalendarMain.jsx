import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { selectNoticeInfo } from '../../features/board/boardSlice';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;  /* 변경된 부분 */
  padding: 50px;
  align-items: flex-start;

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
    color: var(--festie-gray-800, #3a3a3a);
    font-family: SUIT Variable;
    font-size: 25px;
    font-weight: 600;
    line-height: 140%;
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
      font-size: 1.2rem;
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
    background-color: #FFF8DC;
    color: black;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;


const NoticeWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
  opacity: 0;
  height: 0;
  animation-duration: 0.25s;
  animation: ${(props) => props.showDate ? css`${fadeIn} 1s forwards` : css`${fadeOut} 0s forwards`};


  .notice {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .text-gray-500 {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #666666;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  text-align: center;
  background-color: #FFF8DC;
  margin-top: 30px;
  text-decoration: none;
  border-width: 0 0 1px;
  &:focus {
    outline:none;
  }
`;

const ContentInput = styled.input`
  margin-top: 2px;
  border: none;
  &:focus {
    outline:none;
  }
`;


// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];


function CalendarMain() {
  const [value, onChange] = useState(new Date());
  const [showDate, setShowDate] = useState(false); // 날짜 정보 보이기/숨기기 토글 상태
  const [selectedDate, setSelectedDate] = useState(null);
  const NoticeList = useSelector(selectNoticeInfo);

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
    const notices = NoticeList.filter((notice) => moment(notice.date).isSame(date, 'day'));
    return notices.map((notice, index) => <div key={index}>{notice.content}</div>);
  };

  const handleDateClick = (date) => {
    onChange(date);
    setSelectedDate(date);
    setShowDate(true); // 날짜를 선택하면 날짜 정보 보이기
  };

  const toggleShowDate = () => {
    setShowDate(!showDate); // 토글 함수
  };

  const handleClickDate = (date) => {
    setSelectedDate(date);
    setShowDate(true);
  };
  console.log(NoticeList);
  return (
    <Wrapper showDate={showDate}>
      <Calendar
        onChange={handleDateClick}
        value={value}
        next2Label={null}
        prev2Label={null}
        calendarType="gregory"
        formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
        showNeighboringMonth={false}
        minDetail="year"
        tileContent={tileContent}
        tileClassName={tileClassName}
        onClickDay={handleClickDate}
      />
      <NoticeWrapper showDate={showDate}>
        {/* <h2 className="notice">공지사항</h2> */}
        {showDate && selectedDate && (
          <div className="text-gray-500">
            {NoticeList.map((notice) => (
              moment(notice.date).isSame(selectedDate, 'day') && (
                <div key={notice.id}>
                  <TitleInput type="text" value={notice.title} readOnly />
                  <ContentInput type="text" value={notice.content} readOnly />
                </div>
              )
            ))}
          </div>
        )}
      </NoticeWrapper>
    </Wrapper>
  );
}

export default CalendarMain;
