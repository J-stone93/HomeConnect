import styled from "styled-components";
import { Button, Nav, Table } from "react-bootstrap";
import CommunityItem from "./CommunityItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  /* padding-top: 30px 30px 30px 30px;
  width: 90%;
  height: 100vh; */
  margin: 0 auto;
  margin: 50px;
  width: 90%;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 20px;
`;

const CommunityContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
  display: flex;
  /* border: 1px solid #ccc; */
  border-radius: 15px;
  justify-content: space-evenly;
`;

const ItemContainer = styled.div`
  height: 400px;
  flex: 1;
  border: 2px solid black;
  margin: 2px;
  padding: 10px;
  border-radius: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #000000;
  }
`;

const Constyle = styled.div`
  padding-top: 30px;
`;

const StyledNav = styled(Nav)`
  text-decoration: none;
  font-weight: bold;
  color: black;
  .color-nav {
    text-decoration: none;
    font-weight: bold;
    color: black;
  }
  `;

function Community() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('delicious');


  return (
    <Wrapper>
      <Constyle>
        <StyledNav justify variant="tabs" defaultActiveKey="link-1" className="color-nav">
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => setCurrentTab('delicious')}>맛집투어</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() => setCurrentTab('book')}>독서</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" onClick={() => setCurrentTab('health')}>운동</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-4" onClick={() => setCurrentTab('hiking')}>등산</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-4" onClick={() => setCurrentTab('hiking')}>등산</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-4" onClick={() => setCurrentTab('hiking')}>등산</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {/* <Button variant="dark" onClick={() => navigate('/menu4/communitycategory')}>모임 개설하기</Button> */}
            <Button variant="dark" onClick={() => navigate(`/menu4/communityregister`)}>모임 개설하기</Button>
          </Nav.Item>
        </StyledNav>
      </Constyle>
      <CommunityContainer>
        {{
          'delicious': <ItemContainer><CommunityItem /></ItemContainer>,
          'book': <ItemContainer>독서</ItemContainer>,
          'health': <ItemContainer>운동</ItemContainer>,
          'hiking': <ItemContainer>등산</ItemContainer>
        }[currentTab]}
        {/* <ItemContainer>
          <CommunityItem/>
        </ItemContainer> */}
        {/* <ItemContainer>
          <Button variant="dark">여행</Button>
          <CommunityItem/>
        </ItemContainer>
        <ItemContainer>
          <Button variant="dark">라이딩</Button>
          <CommunityItem/>
        </ItemContainer> */}
      </CommunityContainer>
    </Wrapper>
  );
};

export default Community;