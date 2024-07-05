import { Card, Button, Carousel } from "react-bootstrap";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { store } from "../app/store";
import FeeChart from '../components/FeeChart';
import { selectNoticeInfo } from "../features/board/boardSlice";
import { useEffect } from "react";
import axios from "axios";
import { getmyInfo } from "../features/main/mainSlice";
import { SectionsContainer, Section } from "react-fullpage";
import { useNavigate } from "react-router-dom";

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 1rem;
  align-items: center;
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("/image/apartment.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  
  `;

// const Image = styled.img`
//   width: 100%;
//   height: auto;
//   display: block;
// `;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 20px;
`;

const TextOverlay = styled.div`
  z-index: 1; /* 텍스트가 이미지 위에 표시되도록 설정 */
  transform: translateY(-100px);
  h2 {
    font-size: 2.5rem;

    @media (min-width: 576px) {
      font-size: 2%.5;
    }

    @media (min-width: 768px) {
      font-size: rem;
    }

    @media (min-width: 992px) {
      font-size: 4rem;
    }

    @media (min-width: 1200px) {
      font-size: 4.5rem;
    }
  }
  p {
    font-size: 2rem;
  }
`;

function Main() {
  const NoticeInfo = useSelector(selectNoticeInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getmyInfo(JSON.parse(localStorage.getItem('user'))));
  }, []);

  let options = {
    activeClass:          'active', // the class that is appended to the sections links
    anchors:              [ 'sectionOne', 'sectionTwo' ], // the anchors for each sections
    arrowNavigation:      true, // use arrow keys
    className:            'SectionContainer', // the class name for the section container
    delay:                1000, // the scroll animation speed
    navigation:           true, // use dots navigatio
    scrollBar:            false, // use the browser default scrollbar
    sectionClassName:     'Section', // the section class name
    sectionPaddingTop:    '0', // the section top padding
    sectionPaddingBottom: '0', // the section bottom padding
    verticalAlign:        false // align the content of each section vertical
  };

  return (
    <>
    <SectionsContainer {...options}>
      <Section>
      <ImageContainer>
      <Overlay>
        <TextOverlay>
          <h2>HOMECONNECT</h2>
          <p>아파트 관리 웹앱입니다.</p>
        </TextOverlay>
      </Overlay>
      </ImageContainer>
      </Section>

      <Section>
      {/* <Card>
        <Card.Body>
          <blockquote className="blockquote mb-0 auto text-center">
            <p>
              공지 내용입니다.
            </p>
          </blockquote>
        </Card.Body>
      </Card> */}
      <StyledCard >
        {NoticeInfo.slice(-3).map((notice)=>{ return (
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
          {/* <h1 
            onClick={() => navigate('/feedetail')}
            style={{ cursor: 'pointer'}}
          > 관리비</h1>
          <div style={{ width: '80%', margin: '0 auto', padding: '1rem', cursor: 'pointer' }}
          onClick={() => navigate('/feedetail')}
          >
            <FeeChart />
          </div> */}
        </div>
      </Section>
        </SectionsContainer>
    </>
  );
};

export default Main;