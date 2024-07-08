import { Card, Button, Carousel } from "react-bootstrap";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { store } from "../app/store";
import FeeChart from '../components/FeeChart';
import { selectNoticeInfo } from "../features/board/boardSlice";
import { useEffect } from "react";
import axios from "axios";
import { getmyInfo, selectmyInfo } from "../features/main/mainSlice";
import { SectionsContainer, Section } from "react-fullpage";
import { useNavigate } from "react-router-dom";
import { selectMyFee } from "../features/fee/feeSlice";

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  align-items: center;
  text-align: center;
  margin: 10px 60px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 86%;
  height: 86%;
  /* border: 1px solid black; */
  margin: 0 auto;
  margin-top: 20px;
`

const ContentRow = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  /* border: 1px solid black; */
`;

const FeeContainer = styled.div`
  flex: 7;
  /* border: 1px solid black; */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeeContainer2 = styled.div`
  flex: 3;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  text-align: end;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
  margin-top: 300px;
`;

const FeeContentsContainer = styled.div`
p {
  margin: 0;

  @media (max-width: 923px) {
      font-size: 18px;
    }

  @media (max-width: 692px) {
      font-size: 14px;
    }

  @media (max-width: 544px) {
      font-size: 12px;
    }
}
`

const daysOfWeek = [
  "일요일입니다. 오늘은 휴식을 취하세요!",
  "월요일입니다. 새로운 한 주를 시작해보세요!",
  "화요일입니다. 활기차게 시작하세요!",
  "수요일입니다. 주 중반을 잘 보내세요!",
  "목요일입니다. 조금만 더 힘내세요!",
  "금요일입니다. 주말이 다가왔어요!",
  "토요일입니다. 즐거운 주말 보내세요!"
];

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
  const myInfo = useSelector(selectmyInfo);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const fee = useSelector(state => selectMyFee(state, currentMonth));

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

  const today2 = new Date();

  const formattedDate = `${today2.getMonth() + 1}`

  const dayText = daysOfWeek[today.getDay()];

  const totalFee = fee.electric + fee.water + fee.maintenance

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
          <Wrapper>
            <ContentRow>
              <FeeContainer>
                <FeeChart />
              </FeeContainer>

              <FeeContainer2>
                <FeeContentsContainer>
                  <p>{myInfo?.name}님 {formattedDate}월 총 관리비는 
                    <br/>
                    {totalFee}원 입니다.
                    <br/>
                    <br/>
                    <p style={{fontWeight:'200', fontSize:'16px', cursor:'pointer'}} onClick={() => navigate('/feedetail')}>
                    - 관리비 상세보기
                    </p>
                  </p>
                </FeeContentsContainer>
              </FeeContainer2>
            </ContentRow>

            <StyledCard >
        {NoticeInfo.slice(-4).map((notice)=>{ return (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="/image/002.png" width="5px" height="40px"/> 
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

            <Card style={{ marginTop: '10px' }}>
              <Card.Body>
                <blockquote className="blockquote m-0 auto text-center">
                  <p>
                    {dayText}
                  </p>
                </blockquote>
              </Card.Body>
            </Card>
          </Wrapper>
        </Section>

        </SectionsContainer>
    </>
  );
};

export default Main;