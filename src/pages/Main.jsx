import { Card, Button, Carousel } from "react-bootstrap";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { store } from "../app/store";
import FeeChart from '../components/FeeChart';
import { selectNoticeInfo } from "../features/board/boardSlice";
import { useEffect } from "react";
import axios from "axios";
import { getmyInfo } from "../features/main/mainSlice";

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 1rem;
  align-items: center;
  text-align: center;
`;

function Main() {
  const NoticeInfo = useSelector(selectNoticeInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getmyInfo(JSON.parse(localStorage.getItem('user'))));
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <blockquote className="blockquote mb-0 auto text-center">
            <p>
              공지 내용입니다.
            </p>
          </blockquote>
        </Card.Body>
      </Card>

      <StyledCard >
        {NoticeInfo.map((notice)=>{ return (
          <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>{notice.title}</Card.Title>
              <Card.Text>
                {notice.content}
              </Card.Text>
              <Button variant="primary">자세히 보기</Button>
            </Card.Body>
          </Card>);
        })}
      </StyledCard>


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
          <h1>관리비</h1>
          <div style={{ width: '80%', margin: '0 auto', padding: '1rem' }}>
            <FeeChart />
          </div>
        </div>
    </>
  );
};

export default Main;