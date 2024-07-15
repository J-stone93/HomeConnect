import styled from "styled-components";
import { Button, Dropdown, DropdownButton, Nav, Table } from "react-bootstrap";
import CommunityItem from "./CommunityItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../features/community/communitySlice";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  width: 80%;
  padding: 50px 50px 114px 50px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CommunityContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
  display: flex;
  border-radius: 15px;
  justify-content: space-evenly;
`;

const ItemContainer = styled.div`
  height: 400px;
  flex: 1;
  border: 2px solid #e0e0e0;
  margin: 2px;
  padding: 10px;
  border-radius: 10px;
  overflow-y: auto;
  background-color: #fafafa;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ccc;
  }
`;

const Constyle = styled.div`
  padding-top: 30px;
`;

const StyledNav = styled(Nav)`
  .nav-link {
    color: #333 !important;  /* 기본 링크 색상 수정 */
    font-weight: bold;
    &:hover {
      color: #555 !important;  /* 링크 호버 시 색상 수정 */
    }
    &.active {
      color: #000 !important;  /* 활성화된 링크 색상 수정 */
      border-bottom: 2px solid #000; /* 활성화된 링크 밑줄 */
    }
  }
`;

function Community() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('delicious');
  const [categoryName, setCategoryName] = useState('맛집');
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Constyle>
        <StyledNav justify variant="tabs" defaultActiveKey="link-1" className="color-nav">
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => setCategoryName('맛집')}>맛집투어</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() => setCategoryName('독서')}>독서</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" onClick={() => setCategoryName('운동')}>운동</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-4" onClick={() => setCategoryName('등산')}>등산</Nav.Link>
          </Nav.Item>

          <DropdownButton id="dropdown-basic-button" title="모임 개설하기" variant="dark">
            <Dropdown.Item
              onClick={() => {
                dispatch(selectCategory('맛집'));
                navigate(`/communityregister`);
              }}
            >
              맛집투어
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch(selectCategory('독서'));
                navigate(`/communityregister`);
              }}
            >독서
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch(selectCategory('운동'));
                navigate(`/communityregister`);
              }}
            >
              운동</Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch(selectCategory('등산'));
                navigate(`/communityregister`);
              }}
            >
              등산</Dropdown.Item>
          </DropdownButton>
        </StyledNav>
      </Constyle>
      <CommunityContainer>
        <ItemContainer>
          <CommunityItem categoryName={categoryName} />
        </ItemContainer>
      </CommunityContainer>
    </Wrapper>
  );
};

export default Community;
